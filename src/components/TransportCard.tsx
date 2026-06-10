import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  Clock,
  FileText,
  Plane,
  TrainFront,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import type { Transport } from "../types/trip";
import { formatDate } from "../utils/dates";
import { cn } from "../utils/cn";
import { MapButton } from "./MapButton";
import { StatusBadge } from "./StatusBadge";

interface TransportCardProps {
  transport: Transport;
}

export function TransportCard({ transport }: TransportCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = transport.type === "voo" ? Plane : TrainFront;

  return (
    <motion.article
      className="rounded-[1.75rem] border border-gold/20 bg-paper p-5 shadow-soft"
      layout
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-[#F6F1E7] text-navy">
            <Icon size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">
              {transport.company}
            </p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
              {transport.title}
            </h3>
            <p className="mt-1 text-sm font-bold text-muted">
              {formatDate(transport.date)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={transport.status} />
          <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
            {transport.type === "voo" ? "Voo" : "Trem"}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-[1.2rem] border border-[#E8DDC9] bg-[#FFF9EE] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Origem
          </p>
          <p className="mt-2 text-sm font-semibold text-text">{transport.origin}</p>
        </div>
        <div className="rounded-[1.2rem] border border-[#E8DDC9] bg-[#FFF9EE] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Destino
          </p>
          <p className="mt-2 text-sm font-semibold text-text">
            {transport.destination}
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {transport.departureTime ? (
          <div className="flex items-center gap-3 rounded-[1.1rem] bg-[#F6F1E7] p-3 text-sm font-bold text-text">
            <Clock className="text-leaf" size={18} />
            Saída {transport.departureTime}
          </div>
        ) : null}
        {transport.arrivalTime ? (
          <div className="flex items-center gap-3 rounded-[1.1rem] bg-[#F6F1E7] p-3 text-sm font-bold text-text">
            <Clock className="text-coral" size={18} />
            Chegada {transport.arrivalTime}
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <a
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-leaf px-5 text-sm font-semibold text-paper transition hover:bg-ink"
          href={transport.documentPath}
          target="_blank"
          rel="noreferrer"
        >
          <FileText size={17} />
          Ver documento
        </a>
        <MapButton
          query={transport.destinationMapQuery}
          label="Abrir destino no Maps"
        />
      </div>

      <button
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#F6F1E7] px-4 text-sm font-semibold text-navy ring-1 ring-gold/25 transition hover:bg-[#FFF9EE]"
        onClick={() => setExpanded((value) => !value)}
        type="button"
      >
        {expanded ? "Recolher detalhes" : "Detalhes do transporte"}
        <ChevronDown
          className={cn("transition", expanded && "rotate-180")}
          size={18}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
          >
            <div className="mt-5 grid gap-4">
              <div className="grid gap-2 rounded-[1.2rem] border border-[#E8DDC9] p-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  <UsersRound size={15} />
                  Passageiros
                </p>
                {transport.passengers.map((passenger) => (
                  <p className="text-sm font-semibold text-text" key={passenger.name}>
                    {passenger.name}
                    {passenger.seat ? ` — ${passenger.seat}` : ""}
                    {passenger.details ? ` — ${passenger.details}` : ""}
                  </p>
                ))}
              </div>

              <div className="grid gap-2 rounded-[1.2rem] border border-[#E8DDC9] p-4 text-sm font-semibold text-muted">
                {transport.flightNumber ? <p>Voo: {transport.flightNumber}</p> : null}
                {transport.trainNumber ? <p>Trem: {transport.trainNumber}</p> : null}
                {transport.reservationCode ? (
                  <p>Reserva: {transport.reservationCode}</p>
                ) : null}
                {transport.ticketCode ? <p>Código: {transport.ticketCode}</p> : null}
                {transport.className ? <p>Classe: {transport.className}</p> : null}
                {transport.totalValue ? <p>Valor total: {transport.totalValue}</p> : null}
                {transport.services?.length ? (
                  <p>Serviços: {transport.services.join(", ")}</p>
                ) : null}
                {transport.counterOpens ? (
                  <p>Balcão abre: {transport.counterOpens}</p>
                ) : null}
                {transport.counterCloses ? (
                  <p>Balcão fecha: {transport.counterCloses}</p>
                ) : null}
                {transport.checkInCloses ? (
                  <p>Check-in fecha {transport.checkInCloses}</p>
                ) : null}
              </div>

              {transport.baggage?.length ? (
                <div className="grid gap-2 rounded-[1.2rem] bg-[#F6F1E7] p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    <Briefcase size={15} />
                    Bagagens
                  </p>
                  {transport.baggage.map((item) => (
                    <p className="text-sm font-semibold leading-6 text-text" key={item}>
                      {item}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
