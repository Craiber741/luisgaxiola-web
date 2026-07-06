"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { trackCustom, trackEvent } from "../components/MetaPixel";
import { captureUtms, logFunnelEvent, type UtmParams } from "../../lib/leads";
import { getFbCookies, sendCapiEvent, type CapiUserData } from "../../lib/capi";

function genId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `e_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

type TrackOpts = {
  step?: number;
  metadata?: Record<string, unknown>;
  /** Si true, además del Pixel envía el evento por CAPI (server-side) con el mismo event_id. */
  capi?: boolean;
  userData?: CapiUserData;
};

type TrackingCtx = {
  sessionId: string;
  utms: UtmParams;
  /** Evento personalizado del funnel: Pixel (trackCustom) + Supabase (funnel_events) [+ CAPI opcional]. */
  track: (eventName: string, opts?: TrackOpts) => void;
  /** Evento estándar de Meta (ej. Lead) + registro en Supabase [+ CAPI opcional]. */
  trackStandard: (
    eventName: string,
    data?: Record<string, unknown>,
    opts?: { capi?: boolean; userData?: CapiUserData }
  ) => void;
};

const Ctx = createContext<TrackingCtx | null>(null);

export function LandingTrackingProvider({ children }: { children: ReactNode }) {
  const sessionIdRef = useRef<string>("");
  if (!sessionIdRef.current) {
    sessionIdRef.current =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }

  const utmsRef = useRef<UtmParams | null>(null);
  if (utmsRef.current === null) {
    utmsRef.current = typeof window !== "undefined" ? captureUtms() : {};
  }

  const value = useMemo<TrackingCtx>(() => {
    const sessionId = sessionIdRef.current;
    return {
      sessionId,
      utms: utmsRef.current ?? {},
      track: (eventName, opts) => {
        const eventId = genId();
        trackCustom(eventName, { session_id: sessionId, ...(opts?.metadata ?? {}) }, eventId);
        void logFunnelEvent(sessionId, eventName, opts?.step, opts?.metadata ?? {});
        if (opts?.capi) {
          const fb = getFbCookies(utmsRef.current?.fbclid);
          void sendCapiEvent({
            eventName,
            eventId,
            userData: { ...fb, ...(opts.userData ?? {}) },
            customData: opts.metadata ?? {},
          });
        }
      },
      trackStandard: (eventName, data, opts) => {
        const eventId = genId();
        trackEvent(eventName, data, eventId);
        void logFunnelEvent(sessionId, eventName, undefined, data ?? {});
        if (opts?.capi) {
          const fb = getFbCookies(utmsRef.current?.fbclid);
          void sendCapiEvent({
            eventName,
            eventId,
            userData: { ...fb, ...(opts.userData ?? {}) },
            customData: data ?? {},
          });
        }
      },
    };
  }, []);

  // page_view al montar (además del PageView estándar que dispara el Pixel global).
  useEffect(() => {
    value.track("page_view");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLandingTracking(): TrackingCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // Fallback no-op para no romper si un componente se usa fuera del provider.
    return {
      sessionId: "",
      utms: {},
      track: () => {},
      trackStandard: () => {},
    };
  }
  return ctx;
}

/**
 * Envuelve una sección y dispara `eventName` una sola vez cuando entra al viewport.
 * Compatible con lazy loading de imágenes (no depende de que carguen).
 */
export function TrackOnView({
  eventName,
  children,
  className,
  id,
}: {
  eventName: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const { track } = useLandingTracking();
  const ref = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || firedRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            track(eventName);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eventName, track]);

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}

/** Botón CTA que dispara `quiz_started` (con source) y hace scroll suave al quiz. */
export function QuizCTA({
  source,
  label,
  className = "lg-cta",
}: {
  source: "hero" | "pricing" | "sticky";
  label: string;
  className?: string;
}) {
  const { track } = useLandingTracking();
  function go() {
    track("quiz_started", { metadata: { source } });
    const el = document.getElementById("quiz");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <button type="button" onClick={go} className={className}>
      {label}
    </button>
  );
}
