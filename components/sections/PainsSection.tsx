"use client";

import {
  PhoneOff,
  Zap,
  UserX,
  Search,
  Mail,
  CalendarClock,
  FileX,
  RotateCcw,
} from "lucide-react";
import { pains, sectionHeaders } from "@/lib/content";
import { Callout, FadeUp, Panel, PanelHeader } from "@/components/ui/Section";

const icons = [PhoneOff, Zap, UserX, Search, Mail, CalendarClock, FileX, RotateCcw];

export function PainsSection() {
  return (
    <Panel>
      <PanelHeader
        num="03"
        title={sectionHeaders.pains.title}
        subtitle={sectionHeaders.pains.subtitle}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {pains.map((pain, i) => {
          const Icon = icons[i] ?? PhoneOff;
          return (
            <FadeUp key={pain.title} delay={i * 0.05}>
              <div className="card-solid flex h-full gap-4 border-l-4 border-l-red-500 bg-red-50/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Модуль {pain.module}
                  </p>
                  <h3 className="font-display text-base font-semibold text-slate-900">{pain.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{pain.text}</p>
                  {pain.punchline && (
                    <p className="mt-2 text-sm font-semibold text-red-700">{pain.punchline}</p>
                  )}
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>

      <FadeUp className="mt-10">
        <Callout variant="punchline">{sectionHeaders.pains.punchline}</Callout>
      </FadeUp>
    </Panel>
  );
}
