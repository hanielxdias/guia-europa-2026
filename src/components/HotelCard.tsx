import { BedDouble, FileText } from "lucide-react";
import type { Hotel } from "../types/trip";
import { MapButton } from "./MapButton";
import { StatusBadge } from "./StatusBadge";

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-gold/20 bg-paper p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-[#F6F1E7] text-navy">
            <BedDouble size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">
              {hotel.city}
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{hotel.name}</h3>
            <p className="mt-1 text-sm font-bold text-muted">{hotel.address}</p>
          </div>
        </div>
        <StatusBadge status={hotel.status} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.2rem] border border-[#E8DDC9] bg-[#FFF9EE] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Check-in
          </p>
          <p className="mt-2 text-sm font-semibold text-text">{hotel.checkIn}</p>
        </div>
        <div className="rounded-[1.2rem] border border-[#E8DDC9] bg-[#FFF9EE] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Check-out
          </p>
          <p className="mt-2 text-sm font-semibold text-text">{hotel.checkOut}</p>
        </div>
      </div>

      {hotel.room || hotel.totalPrice || hotel.reservation ? (
        <div className="mt-4 rounded-[1.2rem] bg-[#F6F1E7] p-4 text-sm font-semibold leading-6 text-muted">
          {hotel.reservation ? <p>Reserva: {hotel.reservation}</p> : null}
          {hotel.room ? <p>Quarto: {hotel.room}</p> : null}
          {hotel.totalPrice ? <p>Preço total: {hotel.totalPrice}</p> : null}
        </div>
      ) : null}

      {hotel.observations.length ? (
        <ul className="mt-4 grid gap-2">
          {hotel.observations.map((observation) => (
            <li
              className="rounded-[1.1rem] bg-[#F6F1E7] px-4 py-3 text-sm font-semibold text-muted"
              key={observation}
            >
              {observation}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <MapButton query={hotel.mapQuery} label="Abrir no Google Maps" />
        <a
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-leaf px-5 text-sm font-semibold text-paper transition hover:bg-ink"
          href={hotel.documentPath}
          target="_blank"
          rel="noreferrer"
        >
          <FileText size={17} />
          Ver reserva
        </a>
      </div>
    </article>
  );
}
