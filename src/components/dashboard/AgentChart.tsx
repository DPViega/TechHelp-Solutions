import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Ticket } from "@/data/mockData";
import { getAgentInsight } from "@/data/insights";

const COLORS = ["#0066FF", "#1A75FF", "#3385FF", "#4D94FF", "#66A3FF", "#80B3FF", "#99C2FF", "#B3D1FF", "#CCE0FF", "#E6F0FF"];

export default function AgentChart({ tickets }: { tickets: Ticket[] }) {
  const map = new Map<string, { total: number; closed: number; tma: number }>();
  tickets.forEach(t => {
    const a = map.get(t.agent) || { total: 0, closed: 0, tma: 0 };
    a.total++;
    if (t.status === "Fechado") a.closed++;
    a.tma += t.tma;
    map.set(t.agent, a);
  });

  const data = [...map.entries()]
    .map(([name, v]) => ({ name, total: v.total, closed: v.closed, avgTma: Math.round(v.tma / v.total) }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  return (
    <div className="card-gradient rounded-xl border border-border p-5 glow-blue">
      <h3 className="text-foreground font-semibold mb-1">📊 Tickets por Técnico</h3>
      <p className="text-xs text-muted-foreground mb-4">Top 10 técnicos por volume</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20 }}>
          <XAxis type="number" stroke="hsl(228,15%,65%)" fontSize={11} />
          <YAxis type="category" dataKey="name" stroke="hsl(228,15%,65%)" fontSize={11} width={75} />
          <Tooltip
            contentStyle={{ background: "hsl(232,27%,20%)", border: "1px solid hsl(232,20%,25%)", borderRadius: 8, color: "#fff", fontSize: 12 }}
            formatter={(v: number, _: string, p: any) => [`${v} tickets | TMA: ${p.payload.avgTma}min`, "Total"]}
          />
          <Bar dataKey="total" radius={[0, 6, 6, 0]}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground mt-3 border-t border-border pt-3">💡 {getAgentInsight(tickets)}</p>
    </div>
  );
}
