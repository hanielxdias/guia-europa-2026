import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  BookOpenText,
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPinned,
  Plane,
  Route,
  TicketCheck,
  TrainFront,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { vouchers } from "../data";
import type { TripDay } from "../types/trip";
import { cn } from "../utils/cn";
import { formatDateWithWeekday } from "../utils/dates";
import { eventTypeLabels } from "../utils/filters";
import { MapButton } from "./MapButton";
import { StatusBadge } from "./StatusBadge";

interface RouteDayCardProps {
  day: TripDay;
}

const icons = {
  voo: Plane,
  trem: TrainFront,
  hospedagem: CalendarDays,
  passeio: Route,
  "dia livre": CalendarDays,
  documento: CalendarDays,
  "period-suggestion": CalendarDays,
};

function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong className="font-semibold text-ink" key={`${part}-${index}`}>
              {part.slice(2, -2)}
            </strong>
          );
        }

        return part;
      })}
    </>
  );
}

export function RouteDayCard({ day }: RouteDayCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { date, weekday } = formatDateWithWeekday(day.date);
  const Icon = icons[day.eventType];
  const dateLabel = day.period ? day.period : `${weekday} • ${date}`;
  const visibleActivities = day.numberedRoute
    ? day.numberedRoute.slice(0, 4)
    : day.activities.slice(0, 4);
  const routeQuery = day.mapQueries?.length ? day.mapQueries.join(" ") : null;
  const dayVouchers = vouchers.filter((voucher) =>
    day.voucherIds?.includes(voucher.id),
  );

  return (
    <motion.article
      className="rounded-[1.75rem] border border-gold/20 bg-paper p-5 shadow-soft"
      layout
      transition={{ duration: 0.25 }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-[#F6F1E7] text-navy">
            <Icon size={21} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">
              {dateLabel}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink">
              {day.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-muted">
              {day.city} • {eventTypeLabels[day.eventType]}
            </p>
          </div>
        </div>
        <StatusBadge status={day.status} />
      </div>

      {day.description ? (
        <p className="mt-5 text-sm leading-7 text-muted">{day.description}</p>
      ) : null}

      {day.ticketTimes?.length ? (
        <div className="mt-5 grid gap-2">
          {day.ticketTimes.map((ticket) => (
            <div
              className="flex items-center gap-3 rounded-[1.1rem] border border-[#E8DDC9] bg-[#FFF9EE] p-3 text-sm"
              key={`${ticket.label}-${ticket.time}`}
            >
              <Clock3 className="shrink-0 text-coral" size={17} />
              <span className="font-medium text-text">{ticket.label}:</span>
              <span className="font-semibold text-ink">{ticket.time}</span>
            </div>
          ))}
        </div>
      ) : null}

      {dayVouchers.length ? (
        <section className="mt-5 rounded-[1.25rem] border border-gold/25 bg-[#FFF9EE] p-4">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-coral">
            <TicketCheck size={15} />
            Ingressos e vouchers
          </p>
          <div className="grid gap-3">
            {dayVouchers.map((voucher) => (
              <div
                className="grid gap-3 rounded-[1.05rem] bg-paper p-3 ring-1 ring-gold/15 sm:grid-cols-[1fr_auto] sm:items-center"
                key={voucher.id}
              >
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {voucher.title}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted">
                    {voucher.time
                      ? `Horário: ${voucher.time}`
                      : "Horário a confirmar"}
                    {voucher.type ? ` • ${voucher.type}` : ""}
                  </p>
                  {voucher.meetingPoint ? (
                    <p className="mt-1 text-xs font-medium text-muted">
                      Retirada/encontro: {voucher.meetingPoint}
                    </p>
                  ) : null}
                  {voucher.reservation ? (
                    <p className="mt-1 text-xs font-medium text-muted">
                      Reserva: {voucher.reservation}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <StatusBadge status={voucher.status} />
                  <MapButton query={voucher.mapQuery} label="Mapa" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {visibleActivities.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {visibleActivities.map((activity, index) => (
            <span
              className="rounded-full bg-[#F6F1E7] px-3 py-1.5 text-xs font-medium text-navy"
              key={`${activity}-${index}`}
            >
              {activity}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {routeQuery ? (
          <MapButton query={routeQuery} label="Abrir rota no Google Maps" />
        ) : null}
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-leaf px-5 text-sm font-semibold text-paper transition hover:bg-ink"
          onClick={() => setExpanded((value) => !value)}
          type="button"
        >
          {expanded
            ? "Recolher detalhes"
            : day.practicalSummary
              ? day.summaryTitle ?? "Como será o dia"
              : "Ver detalhes"}
          <ChevronDown
            className={cn("transition", expanded && "rotate-180")}
            size={17}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="mt-6 grid gap-5">
              {day.practicalSummary ? (
                <section className="rounded-[1.35rem] border border-gold/20 bg-[#FFF9EE] p-4 sm:p-5">
                  <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-coral">
                    <BookOpenText size={15} />
                    {day.summaryTitle ?? "Resumo do passeio"}
                  </p>
                  <div className="grid gap-3 text-sm font-medium leading-7 text-muted">
                    {day.practicalSummary.split("\n\n").map((paragraph) => (
                      <p key={paragraph}>
                        <RichText text={paragraph} />
                      </p>
                    ))}
                  </div>

                  {day.routeNotes?.length ? (
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                        Roteiro sugerido
                      </p>
                      <ul className="grid gap-2">
                        {day.routeNotes.map((note) => (
                          <li
                            className="rounded-[1rem] bg-paper px-4 py-2.5 text-sm font-medium leading-6 text-text ring-1 ring-gold/15"
                            key={note}
                          >
                            <RichText text={note} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {day.foodSuggestions?.length ? (
                    <div className="mt-4 rounded-[1.1rem] bg-paper p-4 ring-1 ring-gold/15">
                      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                        <Utensils size={14} />
                        Alimentação
                      </p>
                      <ul className="grid gap-2 text-sm font-medium leading-6 text-muted">
                        {day.foodSuggestions.map((suggestion) => (
                          <li key={suggestion}>
                            <RichText text={suggestion} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {day.importantNotes?.length ? (
                    <div className="mt-4 rounded-[1.1rem] border border-gold/25 bg-paper p-4">
                      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                        <AlertCircle size={14} />
                        Atenção
                      </p>
                      <ul className="grid gap-2 text-sm font-medium leading-6 text-muted">
                        {day.importantNotes.map((note) => (
                          <li key={note}>
                            <RichText text={note} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </section>
              ) : null}

              {day.activities.length ? (
                <section>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Programação
                  </p>
                  <div className="grid gap-2">
                    {day.activities.map((activity) => (
                      <div
                        className="rounded-[1.1rem] bg-[#F6F1E7] px-4 py-3 text-sm font-medium leading-6 text-text"
                        key={activity}
                      >
                        {activity}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {day.importantInfo?.length ? (
                <section>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Informações essenciais
                  </p>
                  <div className="grid gap-2">
                    {day.importantInfo.map((info) => (
                      <div
                        className="rounded-[1.1rem] border border-[#E8DDC9] bg-paper px-4 py-3 text-sm font-medium leading-6 text-muted"
                        key={info}
                      >
                        {info}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {day.numberedRoute?.length ? (
                <section>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Sequência do roteiro
                  </p>
                  <ol className="grid gap-3">
                    {day.numberedRoute.map((item, index) => (
                      <li className="flex gap-3" key={item}>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-leaf text-xs font-semibold text-paper">
                          {index + 1}
                        </span>
                        <span className="pt-1 text-sm font-medium leading-6 text-text">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {day.suggestions?.length ? (
                <section>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {day.eventType === "period-suggestion"
                      ? "Sugestões de passeios em Basel"
                      : "Sugestões"}
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {day.suggestions.map((suggestion) => (
                      <div
                        className="rounded-[1.25rem] border border-[#E8DDC9] bg-[#FFF9EE] p-4"
                        key={suggestion.id}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-display text-lg font-semibold text-ink">
                            {suggestion.name}
                          </h4>
                          <div className="flex flex-wrap justify-end gap-2">
                            <StatusBadge status={suggestion.status} />
                            {suggestion.confirmLabel ? (
                              <span className="inline-flex w-fit items-center rounded-full bg-[#EFE5D3] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-navy ring-1 ring-gold/20">
                                {suggestion.confirmLabel}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <p className="mt-2 text-sm font-medium leading-6 text-muted">
                          {suggestion.description}
                        </p>
                        <div className="mt-4">
                          <MapButton query={suggestion.mapQuery} label="Ver no mapa" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {day.customMapLinks?.length ? (
                <section>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Passeios sugeridos com Tia Dani
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {day.customMapLinks.map((item) => (
                      <div
                        className="rounded-[1.25rem] border border-[#E8DDC9] bg-[#FFF9EE] p-4"
                        key={item.url}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-display text-lg font-semibold text-ink">
                            {item.title}
                          </h4>
                          <StatusBadge status={item.status} />
                        </div>
                        <p className="mt-2 text-sm font-medium leading-6 text-muted">
                          {item.description}
                        </p>
                        <div className="mt-4">
                          <MapButton
                            query={item.title}
                            label="Ver no mapa"
                            url={item.url}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {day.mapQueries?.length ? (
                <section>
                  <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    <MapPinned size={15} />
                    Mapas contextuais
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {day.mapQueries.map((query) => (
                      <MapButton key={query} query={query} label={query} />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
