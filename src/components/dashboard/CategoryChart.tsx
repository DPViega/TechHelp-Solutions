import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Ticket } from "@/data/mockData";
import { getCategoryInsight } from "@/data/insights";

const COLORS = ["#0066FF", "#7C3AED", "#00FF88", "#FF4757", "#FFB800", "#06B6D4", "#F472B6", "#A78BFA", "#34D399", "#FB923C"];

export default function CategoryChart({ tickets }: { tickets: Ticket[] }) {
  const map = new Map<string, number>();
  tickets.forEach(t => map.set(t.reason, (map.get(t.reason) || 0) + 1));
  const data = [...map.entries()].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  return (
    <div className="card-gradient rounded-xl border border-border p-5 glow-purple">
      <h3 className="text-foreground font-semibold mb-1">🍩 Categorias de Tickets</h3>
      <p className="text-xs text-muted-foreground mb-4">Distribuição por tipo de problema</p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={110} paddingAngle={3} dataKey="value" stroke="none">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip
            contentStyle={{ background: "hsl(232,27%,20%)", border: "1px solid hsl(232,20%,25%)", borderRadius: 8, color: "#fff", fontSize: 12 }}
            formatter={(v: number) => [`${v} tickets`, "Quantidade"]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-2 mt-2">
        {data.slice(0, 5).map((d, i) => (
          <span key={d.name} className="text-[10px] text-muted-foreground flex items-center gap-1">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: COLORS[i] }} />
            {d.name}
          </span>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3 border-t border-border pt-3">💡 {getCategoryInsight(tickets)}</p>
    </div>
  );
}
