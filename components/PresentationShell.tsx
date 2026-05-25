"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import {
  presentationSections,
  shellIntro,
  siteConfig,
  type PresentationSectionId,
} from "@/lib/content";
import { WhoSection } from "@/components/sections/WhoSection";
import { WhereSection } from "@/components/sections/WhereSection";
import { PainsSection } from "@/components/sections/PainsSection";
import { SystemPanel } from "@/components/panels/SystemPanel";
import { PlanPanel } from "@/components/panels/PlanPanel";
import { DiscussPanel } from "@/components/panels/DiscussPanel";

const panels: Record<PresentationSectionId, React.ReactNode> = {
  who: <WhoSection />,
  market: <WhereSection />,
  pains: <PainsSection />,
  system: <SystemPanel />,
  plan: <PlanPanel />,
  discuss: <DiscussPanel />,
};

function sectionFromHash(): PresentationSectionId {
  if (typeof window === "undefined") return "who";
  const hash = window.location.hash.replace("#", "") as PresentationSectionId;
  return presentationSections.some((s) => s.id === hash) ? hash : "who";
}

export function PresentationShell() {
  const [active, setActive] = useState<PresentationSectionId>("who");

  useEffect(() => {
    setActive(sectionFromHash());
    const onHash = () => setActive(sectionFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goTo = useCallback((id: PresentationSectionId) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  return (
    <div className="presentation-shell flex h-screen overflow-hidden bg-slate-100">
      <aside className="presentation-sidebar flex w-[300px] shrink-0 flex-col bg-white shadow-[4px_0_24px_rgba(15,23,42,0.06)]">
        <header className="border-b border-slate-100 px-8 pb-6 pt-10">
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">
            GRC <span className="text-amber-700">→</span> US
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-600">{shellIntro.tagline}</p>
          <p className="mt-1 text-xs text-slate-400">{shellIntro.note}</p>
        </header>

        <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
          {presentationSections.map((section) => {
            const isActive = active === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => goTo(section.id)}
                className={clsx(
                  "group flex items-center gap-5 rounded-r-xl border-l-4 py-5 pl-5 pr-4 text-left transition-all duration-200",
                  isActive
                    ? "border-amber-600 bg-amber-50/90 shadow-sm"
                    : "border-transparent hover:border-amber-300/60 hover:bg-slate-50"
                )}
              >
                <span
                  className={clsx(
                    "font-display text-5xl font-bold tabular-nums leading-none transition-colors",
                    isActive ? "text-amber-700" : "text-slate-200 group-hover:text-slate-300"
                  )}
                >
                  {section.num}
                </span>
                <span
                  className={clsx(
                    "text-lg font-semibold leading-tight transition-colors",
                    isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"
                  )}
                >
                  {section.label}
                </span>
              </button>
            );
          })}
        </nav>

        <footer className="border-t border-slate-100 px-8 py-5">
          <p className="text-[11px] leading-relaxed text-slate-400">{siteConfig.footer}</p>
        </footer>
      </aside>

      <div
        className="presentation-divider w-[3px] shrink-0 bg-gradient-to-b from-amber-700 via-amber-500/70 to-amber-200/30"
        aria-hidden
      />

      <main className="presentation-main relative min-w-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="presentation-scroll h-full overflow-y-auto overflow-x-hidden px-10 py-10 lg:px-14 lg:py-12"
          >
            {panels[active]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
