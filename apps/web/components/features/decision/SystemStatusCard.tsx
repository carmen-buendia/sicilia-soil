import {
  type DecisionOutput,
  type DecisionContext,
  type DecisionEvidence,
  getLocale,
} from "@sicilia-soil/core";
import {
  DECISION_STATE_THEME,
  SOURCE_META,
  VOTE_DOT_COLOR,
  weightTextColor,
  DEFAULT_SOURCE_META,
} from "@/config/decision.styles";
import { WhyPanel } from "./WhyPanel";
import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Button, DataCard } from "@sicilia-soil/ui";

interface SystemStatusCardProps {
  output: DecisionOutput;
  context: DecisionContext;
  evidence?: DecisionEvidence;
}

export function SystemStatusCard({
  output,
  context,
  evidence,
}: SystemStatusCardProps) {
  const [whyOpen, setWhyOpen] = useState(false);
  const stateStyle = DECISION_STATE_THEME[output.state];
  const locale = getLocale("es");

  const StateIcon =
    output.state === "green"
      ? CheckCircle2
      : output.state === "yellow"
        ? AlertCircle
        : output.state === "red"
          ? XCircle
          : HelpCircle;

  const confidencePct = Math.round(output.confidence * 100);
  const moreRulesCount = output.firedRules.length - 4;

  const getIconColor = () => {
    switch (output.state) {
      case "green":
        return "text-chloro";
      case "yellow":
        return "text-solar";
      case "red":
        return "text-red-500";
      default:
        return "text-ink/40";
    }
  };

  return (
    <DataCard className="p-0 flex flex-col bg-card">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10 bg-paper/50">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-ink/60 font-bold">
          <span>{locale.systemStatus.header}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-ink/20" />
          <span>{context.scopeName}</span>
        </div>
        <span
          className={`text-[10px] px-2 py-1 border font-mono font-bold uppercase tracking-widest ${stateStyle.badge}`}
        >
          {stateStyle.label}
        </span>
      </div>

      {/* HERO */}
      <div className="px-6 py-6">
        <div className="flex items-start gap-5">
          <div className="shrink-0 mt-1">
            <StateIcon
              className={`w-12 h-12 ${getIconColor()}`}
              strokeWidth={1.5}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-serif font-bold text-ink leading-tight mb-2">
              {locale.systemStatus.phase[output.state]}
            </h2>
            <p className="font-mono text-sm uppercase tracking-widest font-bold text-ink/60 mb-4">
              {locale.systemStatus.action[output.state]}
            </p>
            <p className="text-base text-ink/80 leading-relaxed font-sans mb-5">
              {locale.systemStatus.explanationIntro[output.state]}
            </p>

            {output.firedRules.length > 0 && (
              <ul className="text-sm text-ink/70 space-y-1.5 font-mono mb-5 bg-paper/50 p-4 border border-ink/10">
                {output.firedRules
                  .slice()
                  .sort((ruleA, ruleB) => ruleB.weight - ruleA.weight)
                  .slice(0, 3)
                  .map((firedRule) => (
                    <li
                      key={firedRule.ruleId}
                      className="flex items-center gap-3"
                    >
                      <span className="w-2 h-2 bg-solar rounded-full" />
                      {firedRule.ruleId}
                    </li>
                  ))}
              </ul>
            )}

            {evidence?.weather && (
              <div className="mb-5 flex items-center gap-4 font-mono text-xs uppercase tracking-wider text-ink/70 flex-wrap border border-ink/10 p-3.5 bg-paper/40">
                <span>
                  🌡️ {evidence.weather.tempMaxC}° / {evidence.weather.tempMinC}°
                </span>
                <span className="w-px h-3 bg-ink/20" />
                <span>💧 Lluvia 72h: {evidence.weather.rainNext72hMm} mm</span>
              </div>
            )}

            {output.impact && (
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-2 bg-chloro/10 border border-chloro/20">
                <Sparkles className="w-4 h-4 text-chloro" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-chloro">
                  {output.impact}
                </span>
              </div>
            )}

            {output.suggestedAction && (
              <div className="flex items-start gap-3 px-4 py-3 bg-solar/10 border border-solar/20">
                <ArrowRight className="w-4 h-4 text-solar mt-0.5 shrink-0" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink leading-relaxed">
                  {output.suggestedAction}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONFIDENCE + CONFLICT */}
      <div className="px-6 pb-6 space-y-4">
        <div>
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest font-bold mb-2">
            <span className="text-ink/60">
              {locale.systemStatus.confidence}
            </span>
            <span className="text-ink">{confidencePct}%</span>
          </div>
          <div className="w-full h-2 bg-ink/10 border border-ink/20 overflow-hidden">
            <div
              className={`h-full ${stateStyle.dot} transition-all duration-700 ease-out`}
              style={{ width: `${confidencePct}%` }}
            />
          </div>
        </div>

        {output.conflicts.length > 0 && (
          <div className="flex items-start gap-3 px-4 py-3 bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div className="font-mono text-[10px] uppercase tracking-wider text-amber-900 leading-relaxed">
              <span className="font-bold">
                {locale.systemStatus.sourcesInConflict}:
              </span>{" "}
              {output.conflicts[0].description}
            </div>
          </div>
        )}
      </div>

      {/* RULE BADGES */}
      <div className="px-6 pb-5 flex flex-wrap gap-2">
        {output.firedRules.slice(0, 4).map((firedRule) => (
          <div
            key={firedRule.ruleId}
            className="inline-flex items-center gap-2 px-2.5 py-1 bg-paper border border-ink/20 text-[10px] font-mono"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${VOTE_DOT_COLOR[firedRule.vote]}`}
            />
            <span className="text-ink/80">{firedRule.ruleId}</span>
            <span className={`font-bold ${weightTextColor(firedRule.weight)}`}>
              ×{firedRule.weight.toFixed(1)}
            </span>
          </div>
        ))}
        {output.firedRules.length > 4 && (
          <div className="inline-flex items-center px-2.5 py-1 bg-paper border border-ink/20 text-[10px] font-mono text-ink/60">
            {locale.systemStatus.moreRules.replace(
              "{count}",
              String(moreRulesCount),
            )}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="border-t border-ink/10 bg-paper/30 px-6 py-4 flex flex-wrap items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-2 flex-wrap">
          {output.sourcesUsed.map((source) => {
            const sourceMeta = SOURCE_META[source] ?? DEFAULT_SOURCE_META;
            const SourceIcon = sourceMeta.Icon;
            return (
              <span
                key={source}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-card border border-ink/10 font-mono text-[10px] uppercase tracking-wider text-ink/60"
                title={sourceMeta.label}
              >
                <SourceIcon className="w-3.5 h-3.5 text-ink/40" />
                {sourceMeta.label}
              </span>
            );
          })}
        </div>

        <Button
          type="button"
          variant="bare"
          onClick={() => setWhyOpen((isOpen) => !isOpen)}
          className="!rounded-none inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest font-bold text-solar hover:text-ink hover:bg-paper transition-colors"
        >
          {locale.systemStatus.why}
          {whyOpen ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>

      {whyOpen && (
        <div className="border-t border-ink/10 bg-paper/10">
          <WhyPanel output={output} />
        </div>
      )}

      {/* AUTO-LEARNING FOOTER */}
      <div className="px-6 py-3 bg-ink/5 flex items-center gap-2">
        <Brain className="w-3.5 h-3.5 text-chloro" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60">
          {locale.systemStatus.autoLearning}
        </span>
      </div>
    </DataCard>
  );
}
