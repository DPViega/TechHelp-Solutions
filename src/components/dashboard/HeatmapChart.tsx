import { Ticket } from "@/data/mockData";
import { getSatisfactionInsight } from "@/data/insights";

const SAT_LEVELS = ["Ótimo", "Bom", "Regular", "Ruim"];
const SAT_COLORS: Record<string, string> = {
  Ótimo: "bg-accent/80",
  Bom: "bg-accent/40",
  Regular: "bg-[hsl(40,100%,50%)]/50",
  Ruim: "bg-destructive/50",
};

export default function HeatmapChart({ tickets }: { tickets: Ticket[] }) {
  const rated = tickets.filter(t => t.satisfaction !== "—");
  const depts = [...new Set(rated.map(t => t.department))].sort();

  const matrix = depts.map(dept => {
    const deptTickets = rated.filter(t => t.department === dept);
    const total = deptTickets.length;
    const counts: Record<string, number> = {};
    SAT_LEVELS.forEach(s => {
      counts[s] = deptTickets.filter(t => t.satisfaction === s).length;
    });
    return { dept, total, counts };
  });

  return (
    <div className="card-gradient rounded-xl border border-border p-5">
      <h3 className="text-foreground font-semibold mb-1">🗺️ Satisfação por Departamento</h3>
      <p className="text-xs text-muted-foreground mb-4">Heatmap de níveis de satisfação</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-muted-foreground text-xs font-medium">Depto</th>
              {SAT_LEVELS.map(s => (
                <th key={s} className="text-center py-2 px-3 text-muted-foreground text-xs font-medium">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map(row => (
              <tr key={row.dept} className="border-b border-border/50">
                <td className="py-2 px-3 text-xs text-foreground font-medium">{row.dept}</td>
                {SAT_LEVELS.map(s => {
                  const pct = row.total > 0 ? ((row.counts[s] / row.total) * 100).toFixed(0) : "0";
                  return (
                    <td key={s} className="py-2 px-3 text-center">
                      <div className={`mx-auto w-14 h-8 rounded flex items-center justify-center text-[10px] font-mono font-bold ${SAT_COLORS[s]}`}>
                        {pct}%
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 mt-3">
        {SAT_LEVELS.map(s => (
          <span key={s} className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className={`w-3 h-3 rounded ${SAT_COLORS[s]}`} />
            {s}
          </span>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-3 border-t border-border pt-3">💡 {getSatisfactionInsight(tickets)}</p>
    </div>
  );
}
