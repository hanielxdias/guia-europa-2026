import { useEffect, useMemo, useState } from "react";
import { navItems } from "./data/navigation";
import { AppLayout } from "./layouts/AppLayout";
import { HomePage } from "./pages/HomePage";
import { HotelsPage } from "./pages/HotelsPage";
import { RoutesPage } from "./pages/RoutesPage";
import { TipsPage } from "./pages/TipsPage";
import { TransportPage } from "./pages/TransportPage";
import type { PageId } from "./types/navigation";

const pageIds = navItems.map((item) => item.id);

function readPageFromHash(): PageId {
  const hash = window.location.hash.replace("#", "") as PageId;
  return pageIds.includes(hash) ? hash : "home";
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(() => readPageFromHash());
  const [routeCity, setRouteCity] = useState<string | undefined>();

  useEffect(() => {
    const handleHashChange = () => setActivePage(readPageFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (page: PageId) => {
    setRouteCity(undefined);
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openRoutes = (city: string) => {
    setRouteCity(city);
    setActivePage("routes");
    window.location.hash = "routes";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const page = useMemo(() => {
    switch (activePage) {
      case "routes":
        return <RoutesPage initialCity={routeCity} />;
      case "transport":
        return <TransportPage />;
      case "hotels":
        return <HotelsPage />;
      case "tips":
        return <TipsPage />;
      case "home":
      default:
        return <HomePage onNavigate={navigate} onOpenRoutes={openRoutes} />;
    }
  }, [activePage, routeCity]);

  return (
    <AppLayout activePage={activePage} onNavigate={navigate}>
      {page}
    </AppLayout>
  );
}
