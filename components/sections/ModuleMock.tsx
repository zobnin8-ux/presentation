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
      intake: { max: 4, ms: 700 },
      timer: { max: 13, ms: 200 },
      estimate: { max: 3, ms: 800 },
      pipeline: { max: 4, ms: 600 },
      report: { max: 2, ms: 700 },
      knowledge: { max: 2, ms: 700 },
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
      {type === "intake" && (
        <div className="w-full space-y-2 text-left text-[10px]">
          <p className="font-bold text-slate-700">Intake · структурированный пакет</p>
          {[
            "Metso C125 · Texas Plant #4",
            "Фото ×3 · чертёж посадки",
            "Размеры · голос 0:42",
            "→ передача в AI Estimator",
          ].map((row, i) => (
            <motion.div
              key={row}
              animate={{ opacity: step >= i ? 1 : 0.25 }}
              className={`rounded px-2 py-1 ring-1 ${
                i === 3 ? "bg-blue-50 font-semibold text-blue-700 ring-blue-200" : "bg-white text-slate-600 ring-slate-200"
              }`}
            >
              {step >= i ? row : "…"}
            </motion.div>
          ))}
        </div>
      )}

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

      {type === "estimate" && (
        <div className="w-full space-y-1.5 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 pb-1">
            <p className="text-[10px] font-bold text-slate-800">AI Estimator · Metso C125</p>
            <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[8px] font-bold text-white">
              LIVE
            </span>
          </div>
          {[
            { label: "Похожие кейсы", val: "3 из архива · расточка посадки", i: 0 },
            { label: "Технология", val: "Мобильная расточка · 2 смены", i: 1 },
            { label: "Риски", val: "Средний · доступ к узлу OK", i: 2 },
            { label: "Pre-estimate", val: "95% · → CRM + база", i: 3 },
          ].map((row) => (
            <motion.div
              key={row.label}
              animate={{ opacity: step >= row.i ? 1 : 0.3 }}
              className={`rounded px-2 py-1 text-[9px] ${
                row.i === 3
                  ? "bg-emerald-50 font-semibold text-emerald-800 ring-1 ring-emerald-200"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              <span className="font-semibold">{row.label}: </span>
              {step >= row.i ? row.val : "…"}
            </motion.div>
          ))}
        </div>
      )}

      {type === "knowledge" && (
        <div className="w-full text-left text-[10px]">
          <p className="mb-2 font-bold text-violet-700">Объект: Texas Plant #4</p>
          {["2024 · расточка вала", "2025 · flange facing", "2026 · emergency C125"].map(
            (row, i) => (
              <motion.div
                key={row}
                animate={{ opacity: step >= i ? 1 : 0.3 }}
                className="mb-1 rounded bg-violet-50 px-2 py-1 text-violet-800 ring-1 ring-violet-200"
              >
                {row}
              </motion.div>
            )
          )}
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
