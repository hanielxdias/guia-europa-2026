import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, FileText, TicketCheck } from "lucide-react";
import { useState } from "react";
import type { Voucher } from "../types/trip";
import { formatDate } from "../utils/dates";
import { cn } from "../utils/cn";
import { MapButton } from "./MapButton";
import { StatusBadge } from "./StatusBadge";
import { TouristImageCard } from "./TouristImageCard";

interface VoucherCardProps {
  voucher: Voucher;
}

export function VoucherCard({ voucher }: VoucherCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      className="overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-slate-100"
      layout
    >
      <TouristImageCard
        accent="coral"
        className="h-40 rounded-b-none"
        city={voucher.city}
        image={voucher.image}
        name={voucher.title}
      />
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-coral">
              Voucher
            </p>
            <h3 className="mt-1 text-xl font-black text-text">{voucher.title}</h3>
            <p className="mt-1 text-sm font-bold text-muted">
              {voucher.city} • {formatDate(voucher.date)}
              {voucher.time ? ` • ${voucher.time}` : ""}
            </p>
          </div>
          <StatusBadge status={voucher.status} />
        </div>

        {voucher.type ? (
          <div className="mt-4 flex gap-3 rounded-2xl bg-mist p-4 text-sm font-semibold text-text">
            <TicketCheck className="shrink-0 text-navy" size={18} />
            {voucher.type}
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <a
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-navy px-4 text-sm font-black text-white transition hover:bg-ink"
            href={voucher.documentPath}
            target="_blank"
            rel="noreferrer"
          >
            <FileText size={17} />
            Ver voucher
          </a>
          <MapButton query={voucher.mapQuery} label="Abrir no Google Maps" />
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 text-sm font-black text-text transition hover:bg-slate-200"
            onClick={() => setExpanded((value) => !value)}
            type="button"
          >
            Detalhes
            <ChevronDown
              className={cn("transition", expanded && "rotate-180")}
              size={18}
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
            >
              <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 p-4 text-sm font-semibold leading-6 text-muted">
                {voucher.meetingPoint ? (
                  <p>
                    <span className="font-black text-text">Ponto de encontro:</span>{" "}
                    {voucher.meetingPoint}
                  </p>
                ) : null}
                {voucher.address ? (
                  <p>
                    <span className="font-black text-text">Endereço:</span>{" "}
                    {voucher.address}
                  </p>
                ) : null}
                {voucher.reservation ? (
                  <p>
                    <span className="font-black text-text">Reserva:</span>{" "}
                    {voucher.reservation}
                  </p>
                ) : null}
                {voucher.observations?.map((observation) => (
                  <p key={observation}>{observation}</p>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
