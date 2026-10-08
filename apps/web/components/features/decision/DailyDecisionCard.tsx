import type {
  DecisionOutput,
  DecisionContext,
  DecisionEvidence,
} from "@sicilia-soil/core";
import {
  STATE_STYLES,
  SOURCE_META,
  VOTE_DOT_COLOR,
  weightTextColor,
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

interface DailyDecisionCardProps {
  output: DecisionOutput;
  context: DecisionContext;
  evidence?: DecisionEvidence;
}

export function DailyDecisionCard({
  output,
  context,
  evidence,
}: DailyDecisionCardProps) {
  const [whyOpen, setWhyOpen] = useState(false);
  const s = STATE_STYLES[output.state];

  const StateIcon =
    output.state === "green"
      ? CheckCircle2
      : output.state === "yellow"
        ? AlertCircle
        : output.state === "red"
          ? XCircle
          : HelpCircle;

  const confidencePct = Math.round(output.confidence * 100);

  return (
    <div
      className={`rounded-2xl border ${s.border} ${s.bg} shadow-sm hover:shadow-md transition-all overflow-hidden`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs text-charcoalGray/70">
          <span className="font-semibold tracking-wide uppercase">
            Decisión de hoy
          </span>
          <span className="w-1 h-1 rounded-full bg-charcoalGray/30" />
          <span>{context.scopeName}</span>
        </div>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wider ${s.badge}`}
        >
          {s.label}
        </span>
      </div>

      {/* HERO */}
      <div className="px-5 pb-4">
        <div className="flex items-start gap-4">
          <div className="shrink-0 mt-1">
            <StateIcon
              className={`w-12 h-12 ${
                output.state === "green"
                  ? "text-emerald-500"
                  : output.state === "yellow"
                    ? "text-amber-500"
                    : output.state === "red"
                      ? "text-red-500"
                      : "text-gray-400"
              }`}
              strokeWidth={1.8}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className={`text-2xl font-bold ${s.text} leading-tight mb-2`}>
              {output.headline}
            </h2>

            <p
              className={`text-sm ${s.text} opacity-80 whitespace-pre-line leading-relaxed`}
            >
              {output.explanation}
            </p>
            {evidence?.weather && (
              <div className="mt-2 flex items-center gap-3 text-xs text-charcoalGray/60 flex-wrap">
                <span>
                  🌡️ {evidence.weather.tempMaxC}° / {evidence.weather.tempMinC}°
                </span>
                <span className="w-1 h-1 rounded-full bg-charcoalGray/30" />
                <span>💧 Lluvia 72h: {evidence.weather.rainNext72hMm} mm</span>
              </div>
            )}

            {output.impact && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm border border-emerald-200 rounded-lg">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-800">
                  {output.impact}
                </span>
              </div>
            )}
            {output.suggestedAction && (
              <div className="mt-3 flex items-start gap-2 px-3 py-2 bg-white/60 backdrop-blur-sm border border-amber-200 rounded-lg">
                <ArrowRight className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <span className="text-xs font-medium text-amber-900">
                  {output.suggestedAction}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONFIDENCE + CONFLICT */}
      <div className="px-5 pb-4 space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-charcoalGray/60 font-medium">
              Confianza del sistema
            </span>
            <span className="font-bold text-charcoalGray">
              {confidencePct}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-charcoalGray/8 rounded-full overflow-hidden">
            <div
              className={`h-full ${s.dot} transition-all duration-700 ease-out`}
              style={{ width: `${confidencePct}%` }}
            />
          </div>
        </div>

        {output.conflicts.length > 0 && (
          <div className="flex items-start gap-2 px-3 py-2 bg-amber-50/80 border border-amber-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div className="text-xs text-amber-900">
              <span className="font-semibold">Fuentes en desacuerdo:</span>{" "}
              {output.conflicts[0].description}
            </div>
          </div>
        )}
      </div>

      {/* RULE BADGES */}
      <div className="px-5 pb-3 flex flex-wrap gap-1.5">
        {output.firedRules.slice(0, 4).map((r) => (
          <div
            key={r.ruleId}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/70 border border-oliveGreen/10 rounded-full text-[10px]"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${VOTE_DOT_COLOR[r.vote]}`}
            />
            <code className="font-mono text-charcoalGray/70">{r.ruleId}</code>
            <span className={`font-bold ${weightTextColor(r.weight)}`}>
              ×{r.weight.toFixed(1)}
            </span>
          </div>
        ))}
        {output.firedRules.length > 4 && (
          <div className="inline-flex items-center px-2 py-0.5 bg-white/70 border border-oliveGreen/10 rounded-full text-[10px] text-charcoalGray/60">
            +{output.firedRules.length - 4} más
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="border-t border-oliveGreen/10 bg-white/40 backdrop-blur-sm px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {output.sourcesUsed.map((src) => {
            const meta = SOURCE_META[src];
            const Icon = meta.Icon;
            return (
              <span
                key={src}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-oliveGreen/5 rounded text-[10px] text-charcoalGray/70"
                title={meta.label}
              >
                <Icon className="w-3 h-3" />
                {meta.label}
              </span>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setWhyOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-oliveGreen hover:text-oliveGreen/80 hover:bg-oliveGreen/5 rounded-md transition-colors"
        >
          ¿Por qué?
          {whyOpen ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {whyOpen && <WhyPanel output={output} />}

      {/* AUTO-LEARNING FOOTER */}
      <div className="px-5 py-2 bg-oliveGreen/5 border-t border-oliveGreen/10 flex items-center gap-2">
        <Brain className="w-3.5 h-3.5 text-oliveGreen" />
        <span className="text-[10px] text-oliveGreen/80 italic">
          Este sistema aprende de cada decisión automáticamente. No necesitas
          pulsar nada.
        </span>
      </div>
    </div>
  );
}
