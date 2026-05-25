"use client";

import { sectionHeaders } from "@/lib/content";
import { CtaSection } from "@/components/sections/CtaSection";
import { DiscussAuthorBar } from "@/components/sections/DiscussAuthorBar";
import { Callout, FadeUp, Panel, PanelHeader } from "@/components/ui/Section";

export function DiscussPanel() {
  return (
    <div className="space-y-10">
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
      <CtaSection embedded />
      <DiscussAuthorBar />
      <FadeUp>
        <Callout variant="punchline">{sectionHeaders.discuss.punchline}</Callout>
      </FadeUp>
    </div>
  );
}
