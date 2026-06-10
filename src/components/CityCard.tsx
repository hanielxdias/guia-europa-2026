import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { City } from "../types/trip";
import { TouristImageCard } from "./TouristImageCard";

interface CityCardProps {
  city: City;
  onOpenRoutes: (city: string) => void;
}

export function CityCard({ city, onOpenRoutes }: CityCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lift">
      <TouristImageCard
        accent={city.accent}
        className="h-48 rounded-b-none"
        city={city.country}
        image={city.image}
        name={city.name}
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-text">{city.name}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-muted">
              <MapPin size={16} />
              {city.country}
            </p>
          </div>
          <span className="rounded-full bg-mist px-3 py-1 text-xs font-black text-navy">
            {city.dates}
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-muted">{city.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {city.highlights.slice(0, 4).map((highlight) => (
            <span
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-text"
              key={highlight}
            >
              {highlight}
            </span>
          ))}
        </div>

        <button
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-navy px-4 text-sm font-black text-white transition hover:bg-ink focus:outline-none focus:ring-4 focus:ring-navy/20"
          onClick={() => onOpenRoutes(city.name)}
          type="button"
        >
          <CalendarDays size={17} />
          Ver roteiro
          <ArrowRight className="transition group-hover:translate-x-1" size={17} />
        </button>
      </div>
    </article>
  );
}
