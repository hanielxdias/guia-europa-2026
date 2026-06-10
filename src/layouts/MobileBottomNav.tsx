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

interface MobileBottomNavProps {
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

export function MobileBottomNav({
  activePage,
  onNavigate,
}: MobileBottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E8DDC9] bg-paper/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.55rem)] pt-2 shadow-[0_-14px_40px_rgba(6,26,47,0.10)] backdrop-blur lg:hidden">
      <div className="flex gap-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = icons[item.id];
          const isActive = activePage === item.id;

          return (
            <button
              className={cn(
                "flex min-w-20 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-[0.68rem] font-semibold transition",
                isActive
                  ? "bg-leaf text-paper"
                  : "bg-[#EFE5D3] text-muted hover:text-text",
              )}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              <Icon size={18} />
              <span className="leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
