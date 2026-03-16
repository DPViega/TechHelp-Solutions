const agents = [
  "João Silva", "Maria Santos", "Pedro Oliveira", "Ana Costa", "Carlos Souza",
  "Juliana Lima", "Roberto Almeida", "Fernanda Rocha", "Lucas Pereira", "Beatriz Ferreira",
  "Marcos Ribeiro", "Camila Martins", "Thiago Gomes", "Patricia Dias", "Rafael Nascimento"
];

const departments = ["TI", "Financeiro", "RH", "Comercial", "Operações", "Marketing", "Jurídico"];

const reasons = [
  "Falha de Software", "Hardware Defeituoso", "Acesso Negado", "Erro de Rede",
  "Instalação de Software", "Reset de Senha", "Configuração de E-mail",
  "Problema de Impressora", "VPN Não Conecta", "Sistema Lento"
];

const resolutions = [
  "Reinstalação", "Substituição de Peça", "Reset de Permissões", "Reconfiguração",
  "Atualização de Driver", "Troca de Equipamento", "Ajuste de Configuração",
  "Limpeza de Cache", "Reinicialização do Serviço", "Pendente"
];

const statuses = ["Aberto", "Em Andamento", "Fechado", "Pendente"];
const priorities = ["Baixa", "Média", "Alta", "Urgente"];
const satisfactions = ["Ruim", "Regular", "Bom", "Ótimo"];

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export interface Ticket {
  id: string;
  openDate: string;
  closeDate: string | null;
  status: string;
  priority: string;
  reason: string;
  resolution: string;
  requester: string;
  agent: string;
  department: string;
  tma: number;
  frt: number;
  satisfaction: string;
}

export function generateTickets(count = 220): Ticket[] {
  const tickets: Ticket[] = [];
  const startDate = new Date(2024, 0, 1);
  const endDate = new Date(2024, 11, 31);
  const requesters = Array.from({ length: 80 }, (_, i) => `Usuário ${i + 1}`);

  for (let i = 0; i < count; i++) {
    const openDate = randomDate(startDate, endDate);
    const status = randomItem(statuses);
    const isClosed = status === "Fechado";
    const closeDate = isClosed
      ? new Date(openDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000)
      : null;

    tickets.push({
      id: `TK-${String(i + 1).padStart(4, "0")}`,
      openDate: openDate.toISOString().split("T")[0],
      closeDate: closeDate ? closeDate.toISOString().split("T")[0] : null,
      status,
      priority: randomItem(priorities),
      reason: randomItem(reasons),
      resolution: isClosed ? randomItem(resolutions.filter(r => r !== "Pendente")) : "Pendente",
      requester: randomItem(requesters),
      agent: randomItem(agents),
      department: randomItem(departments),
      tma: Math.floor(Math.random() * 180) + 5,
      frt: Math.floor(Math.random() * 60) + 1,
      satisfaction: isClosed ? randomItem(satisfactions) : "—",
    });
  }

  return tickets;
}

export function parseUploadedData(data: any[]): Ticket[] {
  return data.map((row, i) => ({
    id: row["Ticket ID"] || row["id"] || `TK-${String(i + 1).padStart(4, "0")}`,
    openDate: String(row["Open Date"] || row["openDate"] || ""),
    closeDate: row["Close Date"] || row["closeDate"] || null,
    status: row["Status"] || row["status"] || "Aberto",
    priority: row["Priority"] || row["priority"] || "Média",
    reason: row["Reason"] || row["reason"] || "Outros",
    resolution: row["Resolution"] || row["resolution"] || "Pendente",
    requester: row["Requester"] || row["requester"] || "Desconhecido",
    agent: row["Assigned Agent"] || row["agent"] || "Não Atribuído",
    department: row["Department"] || row["department"] || "Geral",
    tma: Number(row["TMA (minutes)"] || row["tma"]) || 0,
    frt: Number(row["FRT (minutes)"] || row["frt"]) || 0,
    satisfaction: row["Customer Satisfaction"] || row["satisfaction"] || "—",
  }));
}
