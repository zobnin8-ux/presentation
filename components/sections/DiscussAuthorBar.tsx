"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/content";
import { FadeUp } from "@/components/ui/Section";
import { Mail, Send, Globe } from "lucide-react";

export function DiscussAuthorBar() {
  const { author } = siteConfig;

  return (
    <FadeUp>
      <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-amber-600 to-slate-800 p-1">
          <Image
            src={author.photo}
            alt={author.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-[10px] object-cover object-center"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900">
            {author.name} · {author.role}
          </p>
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            <a
              href={`mailto:${author.email}`}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-amber-700"
            >
              <Mail className="h-4 w-4" />
              {author.email}
            </a>
            <a
              href={author.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-amber-700"
            >
              <Send className="h-4 w-4" />
              {author.telegramLabel}
            </a>
            <a
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-amber-700"
            >
              <Globe className="h-4 w-4" />
              {author.websiteLabel}
            </a>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
