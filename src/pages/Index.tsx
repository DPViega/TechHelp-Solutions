import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { generateTickets, Ticket } from "@/data/mockData";
import KpiCards from "@/components/dashboard/KpiCards";
import AgentChart from "@/components/dashboard/AgentChart";
import CategoryChart from "@/components/dashboard/CategoryChart";
import TimelineChart from "@/components/dashboard/TimelineChart";
import CriticalTable from "@/components/dashboard/CriticalTable";
import HeatmapChart from "@/components/dashboard/HeatmapChart";
import FileUpload from "@/components/dashboard/FileUpload";
import ExportButton from "@/components/dashboard/ExportButton";
import { Filter } from "lucide-react";

const Index = () => {
  const [tickets, setTickets] = useState<Ticket[]>(() => generateTickets(220));
  const [deptFilter, setDeptFilter] = useState("Todos");

  const departments = useMemo(() => ["Todos", ...new Set(tickets.map(t => t.department))], [tickets]);

  const filtered = useMemo(
    () => deptFilter === "Todos" ? tickets : tickets.filter(t => t.department === deptFilter),
    [tickets, deptFilter]
  );

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
      >
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo TechHelp Solutions" className="h-14 w-auto object-contain rounded-md" />
          <div className="ml-2 border-l-2 border-primary/30 pl-4 py-1">
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent tracking-tight">
              Painel Analítico
            </h1>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
              Gestão de Tickets
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="bg-muted/30 border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {departments.map(d => <option key={d} value={d} className="bg-background text-foreground">{d}</option>)}
            </select>
          </div>
          <FileUpload onUpload={setTickets} />
          <ExportButton tickets={filtered} onGenerate={setTickets} />
        </div>
      </motion.header>

      {/* KPIs */}
      <section className="mb-6">
        <KpiCards tickets={filtered} />
      </section>

      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <AgentChart tickets={filtered} />
        <CategoryChart tickets={filtered} />
      </section>

      {/* Timeline */}
      <section className="mb-6">
        <TimelineChart tickets={filtered} />
      </section>

      {/* Table */}
      <section className="mb-6">
        <CriticalTable tickets={filtered} />
      </section>

      {/* Heatmap */}
      <section className="mb-8">
        <HeatmapChart tickets={filtered} />
      </section>

      <footer className="text-center text-xs text-muted-foreground pb-4">
        TechHelp Solutions © 2024 — Dashboard de Suporte Técnico
      </footer>
    </div>
  );
};

export default Index;
