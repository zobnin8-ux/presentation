"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
};

export function ArchitectureSlideModal({ open, onClose, src, alt }: Props) {
  useEffect(() => {
    if (!open) return;
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

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/92 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-label={alt}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="fixed inset-2 z-[60] flex flex-col sm:inset-4 md:inset-8"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 rounded-full bg-slate-900/90 p-2.5 text-white shadow-xl ring-2 ring-amber-500 transition hover:bg-amber-600"
              aria-label="Закрыть"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="relative min-h-0 flex-1 overflow-hidden rounded-xl ring-4 ring-amber-500/70 shadow-2xl"
              aria-label="Закрыть слайд"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="cursor-pointer object-contain"
                sizes="100vw"
                priority
              />
            </button>
            <p className="mt-2 shrink-0 text-center text-xs text-slate-500">
              Клик по слайду · фону · крестику или Esc — закрыть
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
