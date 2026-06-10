import type { LucideIcon } from "lucide-react";
import type { PageId } from "../types/navigation";

interface EssentialShortcutCardProps {
  icon: LucideIcon;
  label: string;
  description: string;
  page: PageId;
  onNavigate: (page: PageId) => void;
}

export function EssentialShortcutCard({
  icon: Icon,
  label,
  description,
  page,
  onNavigate,
}: EssentialShortcutCardProps) {
  return (
    <button
      className="group rounded-[1.5rem] border border-gold/20 bg-paper p-5 text-left shadow-soft transition hover:-translate-y-1 hover:shadow-editorial"
      onClick={() => onNavigate(page)}
      type="button"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-[#F6F1E7] text-navy">
        <Icon size={20} />
      </div>
      <h3 className="font-display text-2xl font-semibold text-ink">{label}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-muted">
        {description}
      </p>
      <div className="mt-5 h-px w-16 bg-gold/45 transition group-hover:w-24" />
    </button>
  );
}
