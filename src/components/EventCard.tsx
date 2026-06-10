import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock3, MapPinned } from "lucide-react";
import { useState } from "react";
import type { TripDay } from "../types/trip";
import { formatDateWithWeekday } from "../utils/dates";
import { eventTypeLabels } from "../utils/filters";
import { cn } from "../utils/cn";
import { MapButton } from "./MapButton";
import { StatusBadge } from "./StatusBadge";

interface EventCardProps {
  day: TripDay;
  compact?: boolean;
}

export function EventCard({ day, compact = false }: EventCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { date, weekday } = formatDateWithWeekday(day.date);

  return (
    <motion.article
      className="rounded-[1.5rem] bg-white p-5 shadow-soft ring-1 ring-slate-100"
      layout
      transition={{ duration: 0.25 }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-coral">
            {weekday} • {date}
          </p>
          <h3 className="mt-2 text-xl font-black leading-tight text-text">
            {day.title}
          </h3>
          <p className="mt-1 text-sm font-bold text-muted">{day.city}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={day.status} />
          <span className="rounded-full bg-mist px-3 py-1 text-xs font-black text-navy">
            {eventTypeLabels[day.eventType]}
          </span>
        </div>
      </div>

      {day.description ? (
        <p className="mt-4 text-sm leading-6 text-muted">{day.description}</p>
      ) : null}

      <div className="mt-4 grid gap-2">
        {day.ticketTimes?.map((ticket) => (
          <div
            className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 text-sm"
            key={`${ticket.label}-${ticket.time}`}
          >
            <Clock3 className="text-coral" size={18} />
            <span className="font-bold text-text">{ticket.label}:</span>
            <span className="font-black text-navy">{ticket.time}</span>
          </div>
        ))}
      </div>

      {!compact ? (
        <button
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 text-sm font-black text-text transition hover:bg-slate-200"
          onClick={() => setExpanded((value) => !value)}
          type="button"
        >
          {expanded ? "Recolher detalhes" : "Ver detalhes"}
          <ChevronDown
            className={cn("transition", expanded && "rotate-180")}
            size={18}
          />
        </button>
      ) : null}

      <AnimatePresence initial={false}>
        {(expanded || compact) && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="mt-5 space-y-4">
              {day.activities.length ? (
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
                    Atividades
                  </p>
                  <ul className="grid gap-2">
                    {day.activities.map((activity) => (
                      <li
                        className="rounded-2xl bg-mist px-4 py-3 text-sm font-semibold leading-6 text-text"
                        key={activity}
                      >
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {day.importantInfo?.length ? (
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
                    Informações essenciais
                  </p>
                  <ul className="grid gap-2">
                    {day.importantInfo.map((info) => (
                      <li
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-6 text-muted"
                        key={info}
                      >
                        {info}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {day.numberedRoute?.length ? (
                <div>
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-muted">
                    Sequência sugerida
                  </p>
                  <ol className="relative grid gap-3">
                    {day.numberedRoute.map((item, index) => (
                      <li className="flex gap-3" key={item}>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-black text-white">
                          {index + 1}
                        </span>
                        <span className="pt-1 text-sm font-bold leading-6 text-text">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {day.mapQueries?.length ? (
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
                    <MapPinned size={15} />
                    Mapas úteis
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {day.mapQueries.map((query) => (
                      <MapButton key={query} query={query} label={query} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
