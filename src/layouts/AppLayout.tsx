import type { ReactNode } from "react";
import type { PageId } from "../types/navigation";
import { MobileBottomNav } from "./MobileBottomNav";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  children: ReactNode;
}

export function AppLayout({
  activePage,
  onNavigate,
  children,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-mist text-text">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="min-h-screen px-4 pb-32 pt-5 sm:px-6 lg:ml-72 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
      <MobileBottomNav activePage={activePage} onNavigate={onNavigate} />
    </div>
  );
}
