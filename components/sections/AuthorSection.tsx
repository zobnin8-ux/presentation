"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { siteConfig } from "@/lib/content";
import { FadeUp } from "@/components/ui/Section";

function CountUp({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || typeof target !== "number") return;
    let start = 0;
    const step = target / 30;
    const t = setInterval(() => {
      start += step;
      if (start >= target) {
        setVal(target);
        clearInterval(t);
      } else setVal(Math.floor(start));
    }, 40);
    return () => clearInterval(t);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-amber-700">
      {typeof target === "number" ? val : target}
      {suffix}
    </span>
  );
}

export function AuthorSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <div className={embedded ? "" : "bg-gradient-to-b from-white to-slate-50"}>
      <FadeUp>
        <div className="grid items-center gap-10 md:grid-cols-[180px_1fr]">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-slate-800 p-1 shadow-lg">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-4xl">
              👤
            </div>
          </div>
          <div className="space-y-4 text-slate-600">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Автор предложения
            </p>
            <p>
              Я изучил ваш основной сайт — 1grc.ru: выездной ремонт, мобильные станки с ЧПУ,
              широкая промышленность, сотни реальных проектов. Это не типовой маркетинговый
              проект — система под конкретную модель: приехать на объект и вернуть оборудование в
              работу.
            </p>
            <p>
              Для выхода в США я собрал 10 модулей сервисной инфраструктуры — от приёма заявки до
              отчёта и памяти компании. Каждый модуль решает конкретную проблему на американском
              рынке.
            </p>
            <p>
              На встрече разберём, что запускаем первым, кто отвечает за каждый блок, и что должно
              работать через 30 и 90 дней.
            </p>
            <p className="font-semibold text-slate-900">
              {siteConfig.author.name} · {siteConfig.author.role}
            </p>
          </div>
        </div>
      </FadeUp>

      <FadeUp className="mt-10">
        <div className="flex justify-center gap-12 text-center">
          <div>
            <CountUp target={10} />
            <p className="mt-1 text-sm text-slate-500">модулей</p>
          </div>
          <div>
            <CountUp target={3} />
            <p className="mt-1 text-sm text-slate-500">этапа</p>
          </div>
          <div>
            <CountUp target="24/7" />
            <p className="mt-1 text-sm text-slate-500">intake</p>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
