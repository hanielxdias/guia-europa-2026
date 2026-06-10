import { motion } from "framer-motion";
import { BedDouble, Plane, Route } from "lucide-react";
import { EditorialCityCard } from "../components/EditorialCityCard";
import { EssentialShortcutCard } from "../components/EssentialShortcutCard";
import { PremiumHero } from "../components/PremiumHero";
import { TripSummaryCard } from "../components/TripSummaryCard";
import { cities } from "../data";
import type { PageId } from "../types/navigation";

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenRoutes: (city: string) => void;
}

const essentialShortcuts: Array<{
  page: PageId;
  label: string;
  description: string;
  icon: typeof Route;
}> = [
  {
    page: "routes",
    label: "Roteiros",
    description: "Dias da viagem organizados por cidade, com horários e mapas.",
    icon: Route,
  },
  {
    page: "transport",
    label: "Voos & Trens",
    description: "Deslocamentos, assentos, bagagens e códigos de reserva.",
    icon: Plane,
  },
  {
    page: "hotels",
    label: "Hospedagens",
    description: "Bases da família, check-ins, reservas e mapas contextuais.",
    icon: BedDouble,
  },
];

export function HomePage({ onNavigate, onOpenRoutes }: HomePageProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-8"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.28 }}
    >
      <PremiumHero />

      <TripSummaryCard />

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coral">
              Cidades
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-ink">
              Etapas do roteiro
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-gold/35 md:block" />
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cities.map((city) => (
            <EditorialCityCard
              city={city}
              key={city.id}
              onOpenRoutes={onOpenRoutes}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coral">
            Acesso essencial
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-ink">
            O que consultar durante a viagem
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {essentialShortcuts.map((shortcut) => (
            <EssentialShortcutCard
              description={shortcut.description}
              icon={shortcut.icon}
              key={shortcut.page}
              label={shortcut.label}
              onNavigate={onNavigate}
              page={shortcut.page}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
}
