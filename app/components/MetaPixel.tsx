"use client";
import Script from "next/script";

// Pixel de Meta de Luis Gaxiola.
const PIXEL_ID = "1332956858393579";

export function MetaPixel() {
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${PIXEL_ID}');
        fbq('track','PageView');
      `}
    </Script>
  );
}

export const META_PIXEL_ID = PIXEL_ID;

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

// Eventos ESTÁNDAR de Meta (PageView, Lead, Purchase, etc.)
// eventId permite deduplicar contra el mismo evento enviado por CAPI (server-side).
export function trackEvent(event: string, data?: Record<string, unknown>, eventId?: string) {
  if (typeof window !== "undefined" && window.fbq) {
    if (eventId) window.fbq("track", event, data, { eventID: eventId });
    else window.fbq("track", event, data);
  }
}

// Eventos PERSONALIZADOS del funnel (scroll_*, quiz_step_*, whatsapp_redirect, HotLead, etc.)
export function trackCustom(event: string, data?: Record<string, unknown>, eventId?: string) {
  if (typeof window !== "undefined" && window.fbq) {
    if (eventId) window.fbq("trackCustom", event, data, { eventID: eventId });
    else window.fbq("trackCustom", event, data);
  }
}
