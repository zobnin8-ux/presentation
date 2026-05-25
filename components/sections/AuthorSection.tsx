"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { siteConfig } from "@/lib/content";
import { FadeUp } from "@/components/ui/Section";
import { Mail, Send, Globe } from "lucide-react";

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

function AuthorContacts() {
  const { author } = siteConfig;
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <a
        href={`mailto:${author.email}`}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-800"
      >
        <Mail className="h-4 w-4 text-amber-700" />
        {author.email}
      </a>
      <a
        href={author.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-800"
      >
        <Send className="h-4 w-4 text-amber-700" />
        {author.telegramLabel}
      </a>
      <a
        href={author.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-800"
      >
        <Globe className="h-4 w-4 text-amber-700" />
        {author.websiteLabel}
      </a>
    </div>
  );
}

export function AuthorSection({ embedded = false }: { embedded?: boolean }) {
  const { author } = siteConfig;

  return (
    <div className={embedded ? "" : "bg-gradient-to-b from-white to-slate-50"}>
      <FadeUp>
        <div className="grid items-start gap-10 md:grid-cols-[200px_1fr]">
          <div className="mx-auto shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 to-slate-800 p-1 shadow-lg">
            <Image
              src={author.photo}
              alt={author.name}
              width={200}
              height={240}
              className="h-[240px] w-[200px] rounded-[14px] object-cover object-top"
              priority
            />
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
              {author.name} · {author.role}
            </p>
            <AuthorContacts />
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
