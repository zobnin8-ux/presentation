"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navSections } from "@/lib/content";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const progress =
    ((navSections.findIndex((s) => s.id === active) + 1) / navSections.length) * 100;

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b-2 border-slate-200 bg-white/95 shadow-md backdrop-blur-md">
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-blue-600"
          style={{ width: `${progress}%` }}
        />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <button
            onClick={() => scrollTo("hero")}
            className="shrink-0 font-display text-sm font-bold text-slate-900 md:text-base"
          >
            GRC <span className="text-blue-600">→</span> US
          </button>

          <motion.div className="hidden flex-1 justify-center gap-1 lg:flex">
            {navSections.slice(1).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={clsx(
                  "rounded-lg px-3 py-1.5 text-sm font-semibold transition-all",
                  active === id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {label}
              </button>
            ))}
          </motion.div>

          <motion.div className="hidden gap-1 md:flex lg:hidden">
            {navSections.slice(1, 6).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={clsx(
                  "rounded-lg px-2 py-1 text-xs font-semibold",
                  active === id ? "bg-blue-600 text-white" : "text-slate-600"
                )}
              >
                {label}
              </button>
            ))}
          </motion.div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-slate-700 lg:hidden"
            aria-label="Меню"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              {navSections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={clsx(
                    "rounded-lg px-3 py-2.5 text-left text-sm font-semibold",
                    active === id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <div className="h-[52px] md:h-[56px]" aria-hidden />
    </>
  );
}
