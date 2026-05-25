"use client";

import { motion } from "framer-motion";
import {
  infrastructure,
  estimatorHub,
  serviceLifecycle,
  legacyVsSystem,
} from "@/lib/content";
import { FadeUp, SectionHeader, SectionWrapper } from "@/components/ui/Section";
import { Brain, ArrowRight, X, Check } from "lucide-react";
import clsx from "clsx";

const RADIUS = 130;

function HubDiagram() {
  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-md"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 320">
        {estimatorHub.nodes.map((node) => {
          const rad = ((node.angle - 90) * Math.PI) / 180;
          const x = 160 + RADIUS * Math.cos(rad);
          const y = 160 + RADIUS * Math.sin(rad);
          return (
            <motion.line
              key={node.id}
              x1="160"
              y1="160"
              x2={x}
              y2={y}
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: node.angle / 360 }}
            />
          );
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ boxShadow: ["0 0 0 0 rgba(59,130,246,0.4)", "0 0 0 12px rgba(59,130,246,0)", "0 0 0 0 rgba(59,130,246,0)"] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl border-2 border-blue-400 bg-gradient-to-br from-blue-600 to-indigo-700 text-center shadow-xl shadow-blue-600/30"
        >
          <Brain className="mb-1 h-7 w-7 text-white" />
          <p className="text-xs font-bold leading-tight text-white">{estimatorHub.center.label}</p>
          <p className="mt-0.5 text-[9px] text-blue-100">{estimatorHub.center.sub}</p>
        </motion.div>
      </div>

      {estimatorHub.nodes.map((node, i) => {
        const rad = ((node.angle - 90) * Math.PI) / 180;
        const left = 50 + (RADIUS / 160) * 50 * Math.cos(rad);
        const top = 50 + (RADIUS / 160) * 50 * Math.sin(rad);
        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="absolute z-10 w-24 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-200 bg-white p-2 text-center shadow-md ring-1 ring-slate-100"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <p className="text-[10px] font-bold text-slate-800">{node.label}</p>
            <p className="mt-0.5 text-[8px] leading-tight text-slate-500">{node.desc}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function InfrastructureSection() {
  return (
    <SectionWrapper id="infrastructure" className="border-b border-slate-200 bg-white">
      <SectionHeader
        label="04 · Сервисная инфраструктура"
        title="AI Estimator — мозг расчёта. Вокруг него — нервная система компании"
        subtitle={infrastructure.headline}
      />

      <FadeUp>
        <div className="card-solid mb-12 border-l-4 border-l-blue-600 bg-gradient-to-r from-blue-50 to-white p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
              <Brain className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                {infrastructure.estimatorTagline}
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-700">
                {infrastructure.estimatorDesc}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {infrastructure.estimatorCapabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FadeUp>

      <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
        <FadeUp>
          <h3 className="font-display text-xl font-bold text-slate-900">
            Estimator внутри инфраструктуры — не отдельное окно
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Центральный модуль связан с потоком заявок, CRM, историей объекта, полевыми данными,
            отчётностью и сервисной базой. Клиентский кабинет и архив ремонтов — часть одной
            системы.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <HubDiagram />
        </FadeUp>
      </div>

      <FadeUp>
        <h3 className="mb-8 text-center font-display text-xl font-bold text-slate-900">
          Полный lifecycle — от обращения до повторного заказа
        </h3>
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-slate-200 md:left-1/2 md:block md:-translate-x-px" />
          <div className="space-y-4">
            {serviceLifecycle.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04 }}
                className={clsx(
                  "relative md:grid md:grid-cols-2 md:gap-8",
                  i % 2 === 0 ? "md:text-right" : "md:text-left"
                )}
              >
                <div className={clsx("md:col-span-1", i % 2 === 1 && "md:order-2")}>
                  <div
                    className={clsx(
                      "card-solid inline-block w-full max-w-md p-4 text-left",
                      item.highlight && "border-2 border-blue-500 bg-blue-50/80 shadow-md"
                    )}
                  >
                    <span
                      className={clsx(
                        "text-xs font-bold uppercase tracking-wider",
                        item.highlight ? "text-blue-600" : "text-slate-400"
                      )}
                    >
                      Шаг {item.step}
                    </span>
                    <p className="mt-1 font-display font-semibold text-slate-900">{item.label}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
                <div
                  className={clsx(
                    "absolute left-4 top-5 hidden h-3 w-3 rounded-full ring-4 ring-white md:left-1/2 md:block md:-translate-x-1.5",
                    item.highlight ? "bg-blue-600" : "bg-slate-300"
                  )}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </FadeUp>

      <FadeUp className="mt-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-red-200 bg-red-50/60 p-6">
            <div className="mb-4 flex items-center gap-2">
              <X className="h-5 w-5 text-red-600" />
              <h3 className="font-display font-bold text-slate-900">{legacyVsSystem.legacy.title}</h3>
            </div>
            <ul className="space-y-2">
              {legacyVsSystem.legacy.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/60 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Check className="h-5 w-5 text-emerald-600" />
              <h3 className="font-display font-bold text-slate-900">{legacyVsSystem.unified.title}</h3>
            </div>
            <ul className="space-y-2">
              {legacyVsSystem.unified.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-base font-medium text-slate-700">
          <ArrowRight className="h-5 w-5 text-blue-600" />
          Компания работает как единая сервисная промышленная система — не набор разрозненных
          инструментов
        </p>
      </FadeUp>
    </SectionWrapper>
  );
}
