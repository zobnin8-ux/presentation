"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navSections } from "@/lib/content";
import clsx from "clsx";

export function Navigation() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const progress =
    ((navSections.findIndex((s) => s.id === active) + 1) / navSections.length) * 100;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-lg"
        >
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <button
              onClick={() => scrollTo("hero")}
              className="font-display text-sm font-bold text-slate-900"
            >
              GRC <span className="text-blue-600">→</span> US System
            </button>
            <div className="hidden gap-1 md:flex">
              {navSections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={clsx(
                    "rounded-full px-2 py-1 text-xs font-medium transition-colors",
                    active === id
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
