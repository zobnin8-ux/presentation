"use client";

import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { hero } from "@/lib/content";
import { FadeUp } from "@/components/ui/Section";

export function HeroSection() {
  const scrollToSystem = () => {
    document.getElementById("system")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20"
    >
      <motion.div
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-blue-200/30 blur-[120px]"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-indigo-200/20 blur-[100px]"
        animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <FadeUp>
            <span className="mb-6 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
              {hero.badge}
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-[3.25rem]">
              {hero.title}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">{hero.subtitle}</p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <ul className="mt-8 space-y-3">
              {hero.bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  className="flex items-start gap-3 text-sm text-slate-600 md:text-base"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  {b}
                </motion.li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.5}>
            <button
              onClick={scrollToSystem}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 hover:shadow-blue-600/40"
            >
              {hero.cta}
              <ChevronDown className="h-4 w-4" />
            </button>
            <p className="mt-3 text-xs text-slate-400">~6 минут · одна страница</p>
          </FadeUp>
        </motion.div>

        <div className="relative flex items-center justify-center">
          <MigrationMap />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}

function MigrationMap() {
  return (
    <div className="relative w-full max-w-md">
      <svg viewBox="0 0 400 280" className="w-full">
        <motion.path
          d="M 80 140 Q 200 60 320 140"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <motion.path
          d="M 80 140 Q 200 60 320 140"
          fill="none"
          stroke="#2563EB"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        />

        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <circle cx="80" cy="140" r="24" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
          <text x="80" y="145" textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">
            RU
          </text>
          <text x="80" y="175" textAnchor="middle" className="fill-slate-500 text-[9px]">
            2005 · опыт
          </text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
        >
          <circle cx="320" cy="140" r="28" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" className="glow-blue" />
          <motion.circle
            cx="320"
            cy="140"
            r="28"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1"
            opacity="0.4"
            animate={{ r: [28, 38, 28], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <text x="320" y="145" textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">
            US
          </text>
          <text x="320" y="175" textAnchor="middle" className="fill-slate-500 text-[9px]">
            Field repair
          </text>
        </motion.g>

        {[
          { delay: 1.2, cx: 160, cy: 95, label: "⚙️" },
          { delay: 1.5, cx: 200, cy: 78, label: "👷" },
          { delay: 1.8, cx: 240, cy: 95, label: "📋" },
        ].map((item) => (
          <motion.text
            key={item.delay}
            x={item.cx}
            y={item.cy}
            textAnchor="middle"
            fontSize="18"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay, type: "spring" }}
          >
            {item.label}
          </motion.text>
        ))}
      </svg>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {["Металлургия", "ГОК", "Прессы", "Краны", "Лес", "Трубы"].map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 + i * 0.08 }}
            className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <MapPin className="h-3.5 w-3.5" />
        Mobile CNC · On-site repair
      </div>
    </motion.div>
  );
}
