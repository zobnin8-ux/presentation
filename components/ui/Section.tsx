"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** @deprecated use Panel */
export function SectionWrapper({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("mx-auto max-w-5xl", className)}>{children}</div>;
}

export function PanelHeader({
  num,
  title,
  subtitle,
  dark,
}: {
  num: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <FadeUp className="mb-10">
      <p
        className={clsx(
          "font-display text-7xl font-bold leading-none tracking-tight",
          dark ? "text-white/15" : "text-amber-700/25"
        )}
      >
        {num}
      </p>
      <h2
        className={clsx(
          "mt-2 font-display text-3xl font-bold tracking-tight lg:text-4xl",
          dark ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            "mt-4 max-w-3xl text-base leading-relaxed lg:text-lg",
            dark ? "text-slate-300" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </FadeUp>
  );
}

/** @deprecated use PanelHeader */
export function SectionHeader({
  label,
  title,
  subtitle,
  dark,
}: {
  label: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  const num = label.split("·")[0]?.trim() ?? "";
  return <PanelHeader num={num} title={title} subtitle={subtitle} dark={dark} />;
}
