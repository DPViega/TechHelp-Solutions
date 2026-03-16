import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Ticket } from "@/data/mockData";
import { getCriticalInsight } from "@/data/insights";

const STATUS_COLORS: Record<string, string> = {
  Aberto: "bg-destructive/20 text-destructive",
  "Em Andamento": "bg-[hsl(40,100%,50%)]/20 text-[hsl(40,100%,50%)]",
  Fechado: "bg-accent/20 text-accent",
  Pendente: "bg-secondary/20 text-secondary",
};

const PRIORITY_COLORS: Record<string, string> = {
  Urgente: "text-destructive font-bold",
  Alta: "text-[hsl(40,100%,50%)]",
  Média: "text-primary",
  Baixa: "text-muted-foreground",
};

const PAGE_SIZE = 8;

export default function CriticalTable({ tickets }: { tickets: Ticket[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [priorityFilter, setPriorityFilter] = useState("Todos");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    return tickets.filter(t => {
      if (statusFilter !== "Todos" && t.status !== statusFilter) return false;
      if (priorityFilter !== "Todos" && t.priority !== priorityFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return t.id.toLowerCase().includes(s) || t.agent.toLowerCase().includes(s) || t.reason.toLowerCase().includes(s) || t.department.toLowerCase().includes(s);
      }
      return true;
    });
  }, [tickets, search, statusFilter, priorityFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="card-gradient rounded-xl border border-border p-5">
      <h3 className="text-foreground font-semibold mb-1">🔍 Tabela de Tickets</h3>
      <p className="text-xs text-muted-foreground mb-4">Filtre por status, prioridade e busca em tempo real</p>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            placeholder="Buscar ticket, agente, motivo..."
            className="w-full bg-muted/30 border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(0); }}
          className="bg-muted/30 border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="Todos" className="bg-background text-foreground">Status: Todos</option>
          <option value="Aberto" className="bg-background text-foreground">Aberto</option>
          <option value="Em Andamento" className="bg-background text-foreground">Em Andamento</option>
          <option value="Fechado" className="bg-background text-foreground">Fechado</option>
          <option value="Pendente" className="bg-background text-foreground">Pendente</option>
        </select>
        <select
          value={priorityFilter}
          onChange={e => { setPriorityFilter(e.target.value); setPage(0); }}
          className="bg-muted/30 border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="Todos" className="bg-background text-foreground">Prioridade: Todos</option>
          <option value="Urgente" className="bg-background text-foreground">Urgente</option>
          <option value="Alta" className="bg-background text-foreground">Alta</option>
          <option value="Média" className="bg-background text-foreground">Média</option>
          <option value="Baixa" className="bg-background text-foreground">Baixa</option>
        </select>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["ID", "Status", "Prioridade", "Motivo", "Técnico", "Depto", "TMA", "Data"].map(h => (
                <th key={h} className="text-left py-2 px-3 text-muted-foreground font-medium text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map(t => (
              <tr key={t.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-2 px-3 font-mono text-xs text-primary">{t.id}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${STATUS_COLORS[t.status] || ""}`}>{t.status}</span>
                </td>
                <td className={`py-2 px-3 text-xs ${PRIORITY_COLORS[t.priority] || ""}`}>{t.priority}</td>
                <td className="py-2 px-3 text-xs text-foreground">{t.reason}</td>
                <td className="py-2 px-3 text-xs text-foreground">{t.agent}</td>
                <td className="py-2 px-3 text-xs text-muted-foreground">{t.department}</td>
                <td className="py-2 px-3 text-xs font-mono text-foreground">{t.tma}min</td>
                <td className="py-2 px-3 text-xs text-muted-foreground">{t.openDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-muted-foreground">{filtered.length} resultados</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="p-1 rounded hover:bg-muted/30 disabled:opacity-30 text-foreground"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-xs text-muted-foreground">{page + 1} / {totalPages || 1}</span>
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-1 rounded hover:bg-muted/30 disabled:opacity-30 text-foreground"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3 border-t border-border pt-3">💡 {getCriticalInsight(tickets)}</p>
    </div>
  );
}
