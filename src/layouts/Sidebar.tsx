import {
  BedDouble,
  Home,
  Lightbulb,
  Plane,
  Route,
} from "lucide-react";
import { navItems } from "../data/navigation";
import type { PageId } from "../types/navigation";
import { cn } from "../utils/cn";

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const icons = {
  home: Home,
  routes: Route,
  transport: Plane,
  hotels: BedDouble,
  tips: Lightbulb,
};

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-[#E8DDC9] bg-paper/88 px-4 py-6 shadow-soft backdrop-blur-xl lg:block">
      <div className="mb-8 rounded-[1.25rem] border border-gold/25 bg-[#FFF9EE] p-5 text-ink shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
          Família Cotrim
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight">
          Guia de Viagem
        </h1>
        <p className="mt-2 text-sm font-medium text-muted">
          Europa 2026
        </p>
      </div>

      <nav className="grid gap-2">
        {navItems.map((item) => {
          const Icon = icons[item.id];
          const isActive = activePage === item.id;

          return (
            <button
              className={cn(
                "flex min-h-12 items-center gap-3 rounded-2xl px-4 text-left text-sm font-semibold transition",
                isActive
                  ? "bg-leaf text-paper shadow-soft"
                  : "text-muted hover:bg-[#EFE5D3] hover:text-text",
              )}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              <Icon size={19} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
