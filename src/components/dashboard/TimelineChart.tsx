import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Ticket } from "@/data/mockData";
import { getTimelineInsight } from "@/data/insights";

const MONTH_NAMES = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

export default function TimelineChart({ tickets }: { tickets: Ticket[] }) {
  const openMap = new Map<string, number>();
  const closedMap = new Map<string, number>();
  tickets.forEach(t => {
    const m = t.openDate.substring(0, 7);
    openMap.set(m, (openMap.get(m) || 0) + 1);
    if (t.closeDate) {
      const cm = t.closeDate.substring(0, 7);
      closedMap.set(cm, (closedMap.get(cm) || 0) + 1);
    }
  });

  const months = [...new Set([...openMap.keys(), ...closedMap.keys()])].sort();
  const data = months.map(m => {
    const idx = parseInt(m.split("-")[1]) - 1;
    return { month: MONTH_NAMES[idx], abertos: openMap.get(m) || 0, fechados: closedMap.get(m) || 0 };
  });

  return (
    <div className="card-gradient rounded-xl border border-border p-5 glow-blue">
      <h3 className="text-foreground font-semibold mb-1">📈 Tendência no Tempo</h3>
      <p className="text-xs text-muted-foreground mb-4">Tickets abertos vs. fechados por mês</p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ left: 0, right: 10 }}>
          <defs>
            <linearGradient id="gOpen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0066FF" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#0066FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gClosed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FF88" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#00FF88" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="hsl(228,15%,65%)" fontSize={11} />
          <YAxis stroke="hsl(228,15%,65%)" fontSize={11} />
          <Tooltip contentStyle={{ background: "hsl(232,27%,20%)", border: "1px solid hsl(232,20%,25%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
          <Area type="monotone" dataKey="abertos" stroke="#0066FF" fill="url(#gOpen)" strokeWidth={2} />
          <Area type="monotone" dataKey="fechados" stroke="#00FF88" fill="url(#gClosed)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground mt-3 border-t border-border pt-3">💡 {getTimelineInsight(tickets)}</p>
    </div>
  );
}
