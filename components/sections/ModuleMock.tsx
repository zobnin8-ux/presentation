"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const chatMessages = [
  { from: "client", text: "Нужен ремонт вала пресса" },
  { from: "ai", text: "Какая модель? Есть фото?" },
  { from: "client", text: "Erfurt PK 8000. Фото прикрепил." },
  { from: "ai", text: "Карточка создана ✓" },
];

export function ModuleMock({ type }: { type: string }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 }
    );
    const el = document.getElementById(`mock-${type}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [type]);

  useEffect(() => {
    if (!visible) return;
    const configs: Record<string, { max: number; ms: number }> = {
      chat: { max: 3, ms: 800 },
      timer: { max: 13, ms: 200 },
      pipeline: { max: 4, ms: 600 },
      report: { max: 2, ms: 700 },
    };
    const cfg = configs[type];
    if (!cfg) return;
    const t = setInterval(() => setStep((s) => (s < cfg.max ? s + 1 : s)), cfg.ms);
    return () => clearInterval(t);
  }, [visible, type]);

  const stages = ["Inquiry", "Scope", "Quote", "PO", "Mobilized"];

  return (
    <motion.div
      id={`mock-${type}`}
      className="flex h-44 items-center justify-center rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"
    >
      {type === "chat" && (
        <div className="w-full space-y-2">
          {chatMessages.slice(0, step + 1).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-lg px-3 py-1.5 text-xs ${
                m.from === "client"
                  ? "ml-0 mr-8 bg-white text-slate-700"
                  : "ml-8 mr-0 bg-blue-600 text-white"
              }`}
            >
              {m.text}
            </motion.div>
          ))}
        </div>
      )}

      {type === "timer" && (
        <motion.div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="font-display text-4xl font-bold text-amber-500"
          >
            0:{String(Math.max(8, 60 - step * 4)).padStart(2, "0")}
          </motion.div>
          <p className="mt-2 text-xs text-slate-500">SMS отправлен диспетчеру</p>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mx-auto mt-2 h-3 w-3 rounded-full bg-amber-400"
          />
        </motion.div>
      )}

      {type === "pipeline" && (
        <div className="flex w-full gap-1">
          {stages.map((s, i) => (
            <div
              key={s}
              className={`flex-1 rounded py-2 text-center text-[9px] font-medium transition-all ${
                i <= step ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      )}

      {type === "translate" && (
        <div className="flex w-full items-center gap-3">
          <motion.div className="flex-1 rounded-lg bg-white p-2 text-[10px] text-slate-600 ring-1 ring-slate-200">
            RU: Мобильная расточка дробилки...
          </motion.div>
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            →
          </motion.span>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex-1 rounded-lg bg-emerald-50 p-2 text-[10px] text-emerald-800 ring-1 ring-emerald-200"
          >
            EN: On-site jaw crusher line boring...
          </motion.div>
        </div>
      )}

      {type === "outreach" && (
        <div className="relative h-full w-full min-h-[80px]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ x: [0, 40 + i * 20], y: [0, -15 + i * 10], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
              className="absolute left-4 top-8 text-lg"
            >
              ✉️
            </motion.div>
          ))}
          <div className="absolute right-4 top-4 text-2xl">🏭</div>
        </div>
      )}

      {type === "radar" && (
        <div className="text-center">
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 rounded ${i === 18 ? "bg-amber-400 ring-2 ring-amber-300" : "bg-slate-200"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-[10px] font-medium text-amber-600">Outage через 4 мес → outreach</p>
        </div>
      )}

      {type === "compliance" && (
        <div className="flex items-end gap-1">
          {["COI", "OSHA", "Safety"].map((doc, i) => (
            <motion.div
              key={doc}
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
              className="rounded bg-white px-2 py-3 text-[9px] font-medium shadow ring-1 ring-slate-200"
              style={{ height: 60 + i * 10 }}
            >
              📄 {doc}
            </motion.div>
          ))}
        </div>
      )}

      {type === "report" && (
        <div className="flex items-center gap-2 text-xs">
          {["✓ Done", "📄 Report", "🔁 Repeat"].map((s, i) => (
            <motion.div
              key={s}
              animate={{ opacity: step >= i ? 1 : 0.3, scale: step >= i ? 1 : 0.95 }}
              className={`rounded-full px-3 py-1 ${
                i === 2 && step >= 2 ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
              }`}
            >
              {s}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
