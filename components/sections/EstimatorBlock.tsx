"use client";

import { infrastructure, legacyVsSystem } from "@/lib/content";
import { FadeUp } from "@/components/ui/Section";
import { Check, X } from "lucide-react";

/** Compact Estimator + legacy vs system — inside «Система», not a separate hero. */
export function EstimatorBlock() {
  return (
    <FadeUp>
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Уже есть в компании
        </p>
        <h3 className="mt-2 font-display text-xl font-bold text-slate-900">
          AI Estimator — модуль расчёта, встроенный в поток
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          {infrastructure.estimatorDesc}
        </p>
        <p className="mt-4 text-sm font-medium text-emerald-800">
          {infrastructure.estimatorResult}
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {infrastructure.estimatorCapabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2 text-sm text-slate-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {cap}
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
              <X className="h-4 w-4 text-red-500" />
              {legacyVsSystem.legacy.title}
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {legacyVsSystem.legacy.items.slice(0, 3).map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
              <Check className="h-4 w-4 text-emerald-600" />
              {legacyVsSystem.unified.title}
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {legacyVsSystem.unified.items.slice(0, 3).map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
