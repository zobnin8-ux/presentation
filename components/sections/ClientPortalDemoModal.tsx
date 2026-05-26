"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { clientPortalDemo } from "@/lib/content";
import {
  ClipboardList,
  FileText,
  LayoutDashboard,
  MessageSquareText,
  Upload,
  X,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Screen = "dashboard" | "request" | "documents";

function Pill({ label, tone }: { label: string; tone: "amber" | "slate" | "violet" | "emerald" }) {
  const classes =
    tone === "amber"
      ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/40"
      : tone === "violet"
        ? "bg-violet-500/15 text-violet-200 ring-1 ring-violet-500/40"
        : tone === "emerald"
          ? "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/40"
          : "bg-slate-500/15 text-slate-200 ring-1 ring-slate-500/40";

  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold", classes)}>
      {label}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const isEmergency = type.toLowerCase().includes("emerg");
  return <Pill label={type} tone={isEmergency ? "amber" : "slate"} />;
}

export function ClientPortalDemoModal({ open, onClose }: Props) {
  const [screen, setScreen] = useState<Screen>("dashboard");

  const selectedRequest = useMemo(
    () => clientPortalDemo.requests.find((r) => r.id === clientPortalDemo.requestDetail.id) ?? clientPortalDemo.requests[1],
    []
  );

  useEffect(() => {
    if (!open) {
      setScreen("dashboard");
      return;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const HeaderIcon = screen === "dashboard" ? LayoutDashboard : screen === "request" ? ClipboardList : FileText;
  const headerTitle =
    screen === "dashboard" ? "Dashboard" : screen === "request" ? "Request page" : "Documents / Upload";
  const headerHint =
    screen === "dashboard"
      ? "Активные заявки, статус и следующий шаг"
      : screen === "request"
        ? "Scope + next step (без цены в v1)"
        : "PDF/COI + загрузка файлов к заявке";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-slate-950/90 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-label="Demo: Client Portal"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            className="fixed inset-2 z-[70] mx-auto flex max-h-[calc(100vh-1rem)] w-[min(1100px,calc(100vw-1rem))] flex-col overflow-hidden rounded-2xl border-4 border-slate-700 bg-slate-900 shadow-2xl sm:inset-4"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-700 px-5 py-4">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  Demo · Client Portal (v1)
                </p>
                <h2 className="mt-1 truncate font-display text-lg font-bold text-white">
                  {clientPortalDemo.company} · {clientPortalDemo.facility}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {headerTitle} — {headerHint}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 px-5 py-3">
              <div className="flex items-center gap-2">
                <HeaderIcon className="h-4 w-4 text-amber-400" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Single point of contact</p>
                <Pill label="Scope + next step (no price)" tone="violet" />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {([
                  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                  { id: "request", label: "Request", icon: ClipboardList },
                  { id: "documents", label: "Docs/Upload", icon: FileText },
                ] as const).map((t) => {
                  const Icon = t.icon;
                  const active = screen === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setScreen(t.id)}
                      className={clsx(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition",
                        active
                          ? "border-amber-500 bg-amber-500/15 text-amber-200"
                          : "border-slate-600 bg-slate-900/40 text-slate-200 hover:border-slate-500 hover:bg-slate-800"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-950/40 to-slate-900 px-5 py-5">
              <AnimatePresence mode="wait">
                {screen === "dashboard" && (
                  <motion.div
                    key="dash"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-5"
                  >
                    <div className="grid gap-3 md:grid-cols-12">
                      <div className="md:col-span-9">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          {[
                            { label: "Active Requests", value: "2", tone: "slate" as const },
                            { label: "Pending Estimate", value: "1", tone: "violet" as const },
                            { label: "Scheduled Visit", value: "1", tone: "emerald" as const },
                            { label: "Documents", value: "6", tone: "slate" as const },
                          ].map((k) => (
                            <div
                              key={k.label}
                              className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 shadow-sm"
                            >
                              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{k.label}</p>
                              <p className="mt-2 font-display text-3xl font-bold text-white">{k.value}</p>
                              <div className="mt-2">
                                <Pill
                                  label={k.tone === "violet" ? "Awaiting approval" : k.tone === "emerald" ? "Scheduled" : "Live"}
                                  tone={k.tone}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-3">
                        <div className="h-full rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                            Your GRC manager
                          </p>
                          <p className="mt-2 font-semibold text-white">{clientPortalDemo.manager.name}</p>
                          <p className="mt-1 text-xs text-slate-300">{clientPortalDemo.manager.phone}</p>
                          <p className="text-xs text-slate-300">{clientPortalDemo.manager.email}</p>

                          <button
                            type="button"
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-slate-900"
                          >
                            <MessageSquareText className="h-4 w-4" />
                            Request callback
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Active requests</p>
                          <p className="mt-1 text-sm text-slate-300">Кликните заявку — откроется request page</p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-slate-900"
                        >
                          <Upload className="h-4 w-4" />
                          Create New Request
                        </button>
                      </div>

                      <div className="mt-4 overflow-x-auto">
                        <table className="min-w-[720px] w-full text-left text-sm">
                          <thead className="text-xs uppercase tracking-widest text-slate-500">
                            <tr>
                              <th className="py-2 pr-4">ID</th>
                              <th className="py-2 pr-4">Type</th>
                              <th className="py-2 pr-4">Status</th>
                              <th className="py-2 pr-4">Next step</th>
                              <th className="py-2 pr-2">Updated</th>
                            </tr>
                          </thead>
                          <tbody className="text-slate-200">
                            {clientPortalDemo.requests.map((r) => (
                              <tr
                                key={r.id}
                                className={clsx(
                                  "border-t border-slate-800/80 transition hover:bg-slate-800/60",
                                  r.id === selectedRequest.id && "bg-slate-800/40"
                                )}
                                onClick={() => setScreen("request")}
                                role="button"
                              >
                                <td className="py-3 pr-4 font-semibold text-white">{r.id}</td>
                                <td className="py-3 pr-4">
                                  <TypeBadge type={r.type} />
                                </td>
                                <td className="py-3 pr-4">
                                  <Pill label={r.status} tone={r.status.includes("Prepared") ? "violet" : "slate"} />
                                </td>
                                <td className="py-3 pr-4 text-slate-300">{r.nextStep}</td>
                                <td className="py-3 pr-2 text-slate-500">{r.updated}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {screen === "request" && (
                  <motion.div
                    key="req"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-5"
                  >
                    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Request</p>
                          <h3 className="mt-1 font-display text-xl font-bold text-white">
                            {clientPortalDemo.requestDetail.id} · {clientPortalDemo.requestDetail.title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-400">{clientPortalDemo.requestDetail.facility}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <TypeBadge type="Planned" />
                            <Pill label={clientPortalDemo.requestDetail.activeStatus} tone="violet" />
                            <Pill label={`Priority: ${clientPortalDemo.requestDetail.priority}`} tone="slate" />
                          </div>
                        </div>
                        <div className="text-xs text-slate-400">
                          <p>Created: {clientPortalDemo.requestDetail.created}</p>
                          <p>Last update: {clientPortalDemo.requestDetail.lastUpdate}</p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 md:grid-cols-12">
                        <div className="md:col-span-7">
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Status</p>
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            {clientPortalDemo.requestDetail.statuses.map((s) => {
                              const active = s === clientPortalDemo.requestDetail.activeStatus;
                              return (
                                <span
                                  key={s}
                                  className={clsx(
                                    "rounded-full border px-2.5 py-1 text-xs font-bold",
                                    active
                                      ? "border-amber-500/60 bg-amber-500/15 text-amber-200"
                                      : "border-slate-700 bg-slate-950/40 text-slate-400"
                                  )}
                                >
                                  {s}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <div className="md:col-span-5">
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Actions</p>
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {[
                              { label: "Add comment", tone: "slate" as const },
                              { label: "Upload files", tone: "slate" as const },
                              { label: "Request callback", tone: "slate" as const },
                              { label: "Confirm details", tone: "amber" as const },
                              { label: "Approve", tone: "amber" as const },
                            ].map((a) => (
                              <button
                                key={a.label}
                                type="button"
                                className={clsx(
                                  "rounded-lg px-3 py-2 text-xs font-bold transition",
                                  a.tone === "amber"
                                    ? "bg-amber-500 text-slate-900 hover:bg-amber-400"
                                    : "border border-slate-700 bg-slate-950/40 text-slate-200 hover:bg-slate-800"
                                )}
                              >
                                {a.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-12">
                      <div className="lg:col-span-7 space-y-4">
                        <div className="rounded-2xl border border-violet-500/40 bg-violet-950/40 p-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-violet-200">
                            Preliminary scope (from AI Estimator)
                          </p>
                          <p className="mt-2 text-sm text-violet-100">{clientPortalDemo.requestDetail.aiSummary}</p>
                          <ul className="mt-3 space-y-1 text-sm text-violet-100/90">
                            {clientPortalDemo.requestDetail.scopeBullets.map((b) => (
                              <li key={b} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300" />
                                {b}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-3 text-sm font-semibold text-amber-200">
                            Next step: {clientPortalDemo.requestDetail.nextStep}
                          </p>
                          <p className="mt-2 text-xs text-violet-200/80">{clientPortalDemo.requestDetail.disclaimer}</p>
                        </div>

                        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Communication log</p>
                          <div className="mt-3 space-y-2">
                            {clientPortalDemo.requestDetail.comms.map((c) => (
                              <div
                                key={c.at + c.text}
                                className="rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2 text-sm text-slate-200"
                              >
                                <p className="text-xs font-bold text-slate-500">{c.at}</p>
                                <p className="mt-0.5">{c.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-4">
                        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Documents</p>
                          <div className="mt-3 space-y-2">
                            {clientPortalDemo.requestDetail.documents.map((d) => (
                              <div
                                key={d.name}
                                className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-white">{d.name}</p>
                                  <p className="text-xs text-slate-500">{d.category}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setScreen("documents")}
                                  className="rounded-full border border-slate-700 px-3 py-1 text-xs font-bold text-slate-200 hover:bg-slate-800"
                                >
                                  Open
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-amber-500/35 bg-amber-500/10 p-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-amber-200">Repeat</p>
                          <p className="mt-2 text-sm text-slate-200">
                            Completed request? Create Similar Request in two clicks.
                          </p>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-slate-900"
                          >
                            Create Similar Request
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {screen === "documents" && (
                  <motion.div
                    key="docs"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-5"
                  >
                    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            Documents · {clientPortalDemo.requestDetail.id}
                          </p>
                          <p className="mt-1 text-sm text-slate-300">
                            PDF/COI в одном месте + upload связан с заявкой
                          </p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-slate-900"
                        >
                          <Upload className="h-4 w-4" />
                          Upload files
                        </button>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {clientPortalDemo.documents.tabs.map((t, idx) => (
                          <span
                            key={t}
                            className={clsx(
                              "rounded-full border px-3 py-1 text-xs font-bold",
                              idx === 0
                                ? "border-amber-500/60 bg-amber-500/15 text-amber-200"
                                : "border-slate-700 bg-slate-950/40 text-slate-400"
                            )}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 space-y-2">
                        {clientPortalDemo.documents.files.map((f) => (
                          <div
                            key={f.name}
                            className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-white">{f.name}</p>
                              <p className="text-xs text-slate-500">{f.date}</p>
                            </div>
                            <button
                              type="button"
                              className="rounded-full border border-slate-700 px-3 py-1 text-xs font-bold text-slate-200 hover:bg-slate-800"
                            >
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/30 p-6 text-center">
                      <p className="text-sm font-semibold text-slate-200">Drop files here</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Photos · Video · PDF · Plans — automatically linked to request
                      </p>
                      <p className="mt-3 text-xs text-slate-400">
                        After upload: team notified → AI summary refreshed → statuses updated
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-800 px-5 py-3 text-xs text-slate-500">
              <p>Demo UI · без логина/БД · без цен в интерфейсе</p>
              <p>Клик по фону · × · Esc — закрыть</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

