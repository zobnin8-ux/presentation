"use client";

import { AuthorSection } from "@/components/sections/AuthorSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Panel, PanelHeader } from "@/components/ui/Section";

export function DiscussPanel() {
  return (
    <div className="space-y-12">
      <Panel>
        <PanelHeader
          num="06"
          title="Давайте обсудим"
          subtitle="Кто предлагает систему, и какие решения нужно принять на встрече."
        />
      </Panel>
      <AuthorSection embedded />
      <CtaSection embedded />
    </div>
  );
}
