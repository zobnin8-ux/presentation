"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { systemNodes } from "@/lib/content";
import { SectionHeader } from "@/components/ui/Section";
import clsx from "clsx";

export function SystemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeStep = useTransform(scrollYProgress, [0, 1], [0, 9]);
  const pulseWidth = useTransform(scrollYProgress, [0, 0.85], ["0%", "100%"]);
  const footerOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const parallelOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  return (
    <section id="system" ref={containerRef} className="relative h-[280vh]">
      <motion.div className="sticky top-0 flex h-screen items-center overflow-hidden bg-gradient-to-b from-indigo-50/80 to-white px-6 py-16">
        <div className="mx-auto w-full max-w-4xl">
          <SectionHeader
            label="04 · Архитектура"
            title="Единая система: от заявки до повторного заказа"
            subtitle="8 модулей. Одна логика. Построено под выездной ремонт в США."
          />

          <div className="relative mt-6 max-h-[58vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur md:p-6">
            <motion.div
              className="absolute left-0 top-0 h-1 rounded-t-2xl bg-blue-600"
              style={{ width: pulseWidth }}
            />

            <div className="flex flex-wrap justify-center gap-2">
              {systemNodes.inputs.map((input) => (
                <span
                  key={input}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {input}
                </span>
              ))}
            </div>

            <VerticalLine progress={scrollYProgress} start={0.05} end={0.12} />
            <AnimatedNode progress={scrollYProgress} at={0.12}>
              <NodeCard title="① AI-Intake" subtitle="EN + ES · чат + голос" highlight />
            </AnimatedNode>

            <VerticalLine progress={scrollYProgress} start={0.15} end={0.22} />
            <p className="my-2 text-center text-xs font-medium text-slate-400">Срочность?</p>

            <div className="grid grid-cols-2 gap-3">
              <AnimatedNode progress={scrollYProgress} at={0.25}>
                <NodeCard title="② Emergency" subtitle="SMS 60 сек" emergency />
              </AnimatedNode>
              <AnimatedNode progress={scrollYProgress} at={0.28}>
                <NodeCard title="③ CRM US" subtitle="Pipeline · QuickBooks" highlight />
              </AnimatedNode>
            </div>

            <VerticalLine progress={scrollYProgress} start={0.32} end={0.38} />
            <AnimatedNode progress={scrollYProgress} at={0.38}>
              <NodeCard title="Scope → Quote → PO" muted />
            </AnimatedNode>

            <VerticalLine progress={scrollYProgress} start={0.42} end={0.48} />
            <AnimatedNode progress={scrollYProgress} at={0.48}>
              <NodeCard title="⑦ Compliance Pack" subtitle="COI · OSHA" highlight />
            </AnimatedNode>

            <VerticalLine progress={scrollYProgress} start={0.52} end={0.58} />
            <AnimatedNode progress={scrollYProgress} at={0.58}>
              <NodeCard title="Field Work" subtitle="Выезд + станок" field />
            </AnimatedNode>

            <VerticalLine progress={scrollYProgress} start={0.62} end={0.68} />
            <AnimatedNode progress={scrollYProgress} at={0.68}>
              <NodeCard title="⑧ After-Action Report" subtitle="PDF за 48 ч" highlight />
            </AnimatedNode>

            <motion.div className="mt-6 border-t border-slate-100 pt-4" style={{ opacity: parallelOpacity }}>
              <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Постоянно в фоне
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {systemNodes.parallel.map((node) => (
                  <div
                    key={node.id}
                    className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-1.5 text-center"
                  >
                    <p className="text-[11px] font-semibold text-purple-800">{node.label}</p>
                    <p className="text-[9px] text-purple-600">{node.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.p className="mt-4 text-center text-sm text-slate-500" style={{ opacity: footerOpacity }}>
            Модули ①②③ — фундамент · ④⑤ — приток · ⑥⑦⑧ — масштаб и повтор
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

function VerticalLine({
  progress,
  start,
  end,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const height = useTransform(progress, [start, end], ["0%", "100%"]);
  return (
    <div className="relative mx-auto my-1 h-4 w-0.5 overflow-hidden bg-slate-200">
      <motion.div className="absolute bottom-0 w-full bg-blue-500" style={{ height }} />
    </div>
  );
}

function AnimatedNode({
  progress,
  at,
  children,
}: {
  progress: MotionValue<number>;
  at: number;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [at - 0.05, at], [0.3, 1]);
  const scale = useTransform(progress, [at, at + 0.08], [1, 1.03]);

  return (
    <motion.div style={{ opacity, scale }} className="my-1">
      {children}
    </motion.div>
  );
}

function NodeCard({
  title,
  subtitle,
  highlight,
  emergency,
  field,
  muted,
}: {
  title: string;
  subtitle?: string;
  highlight?: boolean;
  emergency?: boolean;
  field?: boolean;
  muted?: boolean;
}) {
  return (
    <motion.div
      className={clsx(
        "rounded-xl border-2 px-3 py-2.5 text-center",
        highlight && "border-blue-500 bg-blue-50",
        emergency && "border-amber-400 bg-amber-50",
        field && "border-emerald-500 bg-emerald-50",
        muted && "border-slate-200 bg-slate-50",
        !highlight && !emergency && !field && !muted && "border-slate-200 bg-white"
      )}
      whileHover={{ scale: 1.02 }}
    >
      <p className="text-xs font-semibold text-slate-900 md:text-sm">{title}</p>
      {subtitle && <p className="mt-0.5 text-[10px] text-slate-500 md:text-xs">{subtitle}</p>}
    </motion.div>
  );
}
