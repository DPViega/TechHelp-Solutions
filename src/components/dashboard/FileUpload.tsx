import { useRef } from "react";
import { Upload } from "lucide-react";
import * as XLSX from "xlsx";
import { parseUploadedData, Ticket } from "@/data/mockData";

interface Props {
  onUpload: (tickets: Ticket[]) => void;
}

export default function FileUpload({ onUpload }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const wb = XLSX.read(data, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(ws);
      onUpload(parseUploadedData(json));
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input ref={ref} type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} className="hidden" />
      <button
        onClick={() => ref.current?.click()}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors"
      >
        <Upload className="w-4 h-4" />
        Importar Planilha
      </button>
    </>
  );
}
