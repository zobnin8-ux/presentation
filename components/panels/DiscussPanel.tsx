"use client";

import { sectionHeaders } from "@/lib/content";
import { AuthorSection } from "@/components/sections/AuthorSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Callout, FadeUp, Panel, PanelHeader } from "@/components/ui/Section";

export function DiscussPanel() {
  return (
    <div className="space-y-12">
      <Panel>
        <PanelHeader
          num="06"
          title={sectionHeaders.discuss.title}
          subtitle={sectionHeaders.discuss.subtitle}
        />
        <FadeUp className="mt-6">
          <Callout variant="warning">{sectionHeaders.discuss.risk}</Callout>
        </FadeUp>
      </Panel>
      <AuthorSection embedded />
      <CtaSection embedded />
    </div>
  );
}
