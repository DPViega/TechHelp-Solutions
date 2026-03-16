import { motion } from "framer-motion";
import { Target, Clock, UserCheck, TrendingUp } from "lucide-react";
import { Ticket } from "@/data/mockData";
import { getKpiInsights } from "@/data/insights";

export default function KpiCards({ tickets }: { tickets: Ticket[] }) {
  const kpi = getKpiInsights(tickets);

  const cards = [
    {
      icon: Target,
      label: "Total de Chamados",
      value: kpi.total,
      insight: kpi.ticketInsight,
      color: "text-primary",
      glow: "glow-blue",
      sub: `${kpi.rate}% resolvidos`,
    },
    {
      icon: Clock,
      label: "TMA",
      value: `${kpi.avgTma} min`,
      insight: kpi.tmaInsight,
      color: "text-secondary",
      glow: "glow-purple",
      sub: "Tempo Médio de Atendimento",
    },
    {
      icon: UserCheck,
      label: "Top Agente",
      value: kpi.topAgent.name,
      insight: kpi.agentInsight,
      color: "text-accent",
      glow: "glow-green",
      sub: `${kpi.topAgent.total} tickets resolvidos`,
    },
    {
      icon: TrendingUp,
      label: "Taxa de Resolução",
      value: `${kpi.rate}%`,
      insight: `${kpi.closed} de ${kpi.total} tickets finalizados`,
      color: "text-primary",
      glow: "glow-blue",
      sub: `${kpi.open} ainda abertos`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`card-gradient rounded-xl border border-border p-5 ${c.glow} hover:scale-[1.02] transition-transform`}
        >
          <div className="flex items-center gap-3 mb-3">
            <c.icon className={`w-5 h-5 ${c.color}`} />
            <span className="text-muted-foreground text-sm font-medium">{c.label}</span>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1 font-mono">{c.value}</div>
          <div className="text-xs text-muted-foreground mb-3">{c.sub}</div>
          <div className="text-xs text-muted-foreground border-t border-border pt-3 leading-relaxed">
            💡 {c.insight}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
