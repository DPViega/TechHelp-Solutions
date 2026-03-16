import * as XLSX from "xlsx";
import { Download, Shuffle, FileSpreadsheet } from "lucide-react";
import { Ticket, generateTickets } from "@/data/mockData";

export default function ExportButton({ tickets, onGenerate }: { tickets: Ticket[]; onGenerate: (t: Ticket[]) => void }) {

  const formatForExport = (data: Ticket[]) =>
    data.map(t => ({
      "Ticket ID": t.id,
      "Open Date": t.openDate,
      "Close Date": t.closeDate || "",
      "Status": t.status,
      "Priority": t.priority,
      "Reason": t.reason,
      "Resolution": t.resolution,
      "Requester": t.requester,
      "Assigned Agent": t.agent,
      "Department": t.department,
      "TMA (minutes)": t.tma,
      "FRT (minutes)": t.frt,
      "Customer Satisfaction": t.satisfaction,
    }));

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(formatForExport(tickets));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tickets");
    XLSX.writeFile(wb, "techhelp_tickets.xlsx");
  };

  const handleGenerate = () => {
    const newTickets = generateTickets(220);
    // Export immediately
    const ws = XLSX.utils.json_to_sheet(formatForExport(newTickets));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tickets");
    XLSX.writeFile(wb, "techhelp_planilha_gerada.xlsx");
    // Also update dashboard
    onGenerate(newTickets);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleGenerate}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium transition-colors"
      >
        <FileSpreadsheet className="w-4 h-4" />
        Gerar Planilha
      </button>
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 text-foreground text-sm font-medium transition-colors"
      >
        <Download className="w-4 h-4" />
        Exportar
      </button>
    </div>
  );
}
