import { Ticket } from "./mockData";

export function getKpiInsights(tickets: Ticket[]) {
  const total = tickets.length;
  const open = tickets.filter(t => t.status === "Aberto" || t.status === "Em Andamento").length;
  const closed = tickets.filter(t => t.status === "Fechado").length;
  const rate = total > 0 ? ((closed / total) * 100).toFixed(1) : "0";
  const avgTma = total > 0 ? (tickets.reduce((s, t) => s + t.tma, 0) / total).toFixed(0) : "0";

  const agentMap = new Map<string, { total: number; sat: number; satCount: number }>();
  tickets.forEach(t => {
    const a = agentMap.get(t.agent) || { total: 0, sat: 0, satCount: 0 };
    a.total++;
    if (t.satisfaction === "Bom" || t.satisfaction === "Ótimo") { a.sat++; a.satCount++; }
    else if (t.satisfaction !== "—") { a.satCount++; }
    agentMap.set(t.agent, a);
  });

  let topAgent = { name: "—", total: 0, satRate: 0 };
  agentMap.forEach((v, k) => {
    if (v.total > topAgent.total) {
      topAgent = { name: k, total: v.total, satRate: v.satCount > 0 ? (v.sat / v.satCount) * 100 : 0 };
    }
  });

  return {
    total, open, closed, rate, avgTma, topAgent,
    ticketInsight: `${open} tickets abertos vs. ${closed} fechados — Taxa de resolução: ${rate}%`,
    tmaInsight: `Tempo médio de atendimento: ${avgTma} minutos`,
    agentInsight: `${topAgent.name} resolveu ${topAgent.total} tickets com ${topAgent.satRate.toFixed(0)}% de satisfação`,
  };
}

export function getAgentInsight(tickets: Ticket[]) {
  const map = new Map<string, number>();
  tickets.forEach(t => map.set(t.agent, (map.get(t.agent) || 0) + 1));
  const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return "Sem dados de agentes.";
  const [name, count] = sorted[0];
  const pct = ((count / tickets.length) * 100).toFixed(1);
  return `${name} é o técnico mais produtivo com ${count} tickets resolvidos (${pct}% do total)`;
}

export function getCategoryInsight(tickets: Ticket[]) {
  const map = new Map<string, number>();
  tickets.forEach(t => map.set(t.reason, (map.get(t.reason) || 0) + 1));
  const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return "Sem dados de categorias.";
  const [name, count] = sorted[0];
  const pct = ((count / tickets.length) * 100).toFixed(1);
  return `"${name}" representa ${pct}% dos tickets — considere treinamento preventivo`;
}

export function getTimelineInsight(tickets: Ticket[]) {
  const monthMap = new Map<string, number>();
  tickets.forEach(t => {
    const m = t.openDate.substring(0, 7);
    monthMap.set(m, (monthMap.get(m) || 0) + 1);
  });
  const sorted = [...monthMap.entries()].sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return "Sem dados de tendência.";
  const [month, count] = sorted[0];
  const monthNames = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const mIdx = parseInt(month.split("-")[1]) - 1;
  return `Pico de ${count} tickets em ${monthNames[mIdx]} — verifique eventos correlacionados`;
}

export function getCriticalInsight(tickets: Ticket[]) {
  const urgent = tickets.filter(t => t.priority === "Urgente" && t.status !== "Fechado");
  return `${urgent.length} tickets urgentes pendentes de resolução`;
}

export function getSatisfactionInsight(tickets: Ticket[]) {
  const deptMap = new Map<string, { good: number; total: number }>();
  tickets.filter(t => t.satisfaction !== "—").forEach(t => {
    const d = deptMap.get(t.department) || { good: 0, total: 0 };
    d.total++;
    if (t.satisfaction === "Bom" || t.satisfaction === "Ótimo") d.good++;
    deptMap.set(t.department, d);
  });
  let best = { dept: "—", rate: 0 };
  deptMap.forEach((v, k) => {
    const r = v.total > 0 ? (v.good / v.total) * 100 : 0;
    if (r > best.rate) best = { dept: k, rate: r };
  });
  return `${best.dept} tem ${best.rate.toFixed(0)}% de satisfação positiva — melhor desempenho`;
}
