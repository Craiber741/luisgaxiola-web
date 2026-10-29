"use client";
import { usePathname } from "next/navigation";
import { SiteHeader, SiteFooter } from "./site";

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  // /admin es el panel interno de leads: va sin header ni footer.
  if (usePathname().startsWith("/admin")) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
