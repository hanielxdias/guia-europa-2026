import { ArrowRight, CalendarClock, CheckCircle2 } from "lucide-react";
import type { TripDay } from "../types/trip";
import { formatDateWithWeekday } from "../utils/dates";
import { MapButton } from "./MapButton";
import { StatusBadge } from "./StatusBadge";

interface NextEventCardProps {
  day: TripDay | null;
  onOpenRoutes: () => void;
}

export function NextEventCard({ day, onOpenRoutes }: NextEventCardProps) {
  if (!day) {
    return (
      <section className="rounded-[1.75rem] border border-gold/20 bg-paper p-6 shadow-soft">
        <div className="flex items-center gap-3 text-leaf">
          <CheckCircle2 size={24} />
          <p className="text-sm font-semibold uppercase tracking-[0.18em]">
            Viagem finalizada
          </p>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-text">
          Todas as etapas foram concluídas
        </h2>
      </section>
    );
  }

  const { date, weekday } = formatDateWithWeekday(day.date);

  return (
    <section className="rounded-[1.75rem] border border-gold/20 bg-paper p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-navy">
          <CalendarClock size={24} />
          <p className="text-sm font-semibold uppercase tracking-[0.18em]">
            Próximo evento
          </p>
        </div>
        <StatusBadge status={day.status} />
      </div>
      <h2 className="mt-4 font-display text-3xl font-semibold text-ink">
        {day.title}
      </h2>
      <p className="mt-2 text-sm font-bold text-muted">
        {weekday}, {date} • {day.city}
      </p>
      {day.description ? (
        <p className="mt-4 text-sm leading-6 text-muted">{day.description}</p>
      ) : null}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-leaf px-5 text-sm font-semibold text-paper transition hover:bg-ink focus:outline-none focus:ring-4 focus:ring-gold/25"
          onClick={onOpenRoutes}
          type="button"
        >
          Ver roteiro
          <ArrowRight size={17} />
        </button>
        {day.mapQueries?.[0] ? (
          <MapButton query={day.mapQueries[0]} label="Abrir local" />
        ) : null}
      </div>
    </section>
  );
}
