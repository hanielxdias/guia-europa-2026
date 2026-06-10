import type { Status } from "../types/trip";
import { cn } from "../utils/cn";

interface StatusBadgeProps {
  status: Status;
}

const styles: Record<Status, string> = {
  Confirmado: "bg-leaf/10 text-leaf ring-leaf/20",
  "A confirmar": "bg-gold/15 text-[#846437] ring-gold/30",
  Sugestão: "bg-navy/10 text-navy ring-navy/15",
  "Dia livre": "bg-coral/10 text-coral ring-coral/20",
  "A definir": "bg-[#EFE5D3] text-muted ring-gold/20",
  "A definir com Tia Dani": "bg-[#EFE5D3] text-navy ring-gold/20",
  "A combinar com Tia Dani": "bg-[#EFE5D3] text-navy ring-gold/20",
  "Detalhes a preencher": "bg-[#EFE5D3] text-muted ring-gold/20",
  "Aguardando arquivo": "bg-gold/15 text-[#846437] ring-gold/30",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] ring-1",
        styles[status],
      )}
    >
      {status}
    </span>
  );
}
