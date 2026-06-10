import { ArrowRight, MapPin } from "lucide-react";
import type { City } from "../types/trip";
import { PremiumImagePlaceholder } from "./PremiumImagePlaceholder";

interface EditorialCityCardProps {
  city: City;
  onOpenRoutes: (city: string) => void;
}

export function EditorialCityCard({
  city,
  onOpenRoutes,
}: EditorialCityCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-gold/20 bg-paper shadow-soft transition hover:-translate-y-1 hover:shadow-editorial">
      <PremiumImagePlaceholder
        className="aspect-[5/4] rounded-b-none border-0 bg-[#FBF6EC]"
        fit="contain"
        image={city.image}
        name={city.name}
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl font-semibold text-ink">
              {city.name}
            </h3>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-muted">
              <MapPin size={15} />
              {city.country}
            </p>
          </div>
          <span className="rounded-full border border-gold/25 bg-[#F6F1E7] px-3 py-1 text-xs font-semibold text-navy">
            {city.dates}
          </span>
        </div>
        <p className="mt-4 text-sm leading-7 text-muted">{city.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {city.highlights.slice(0, 3).map((highlight) => (
            <span
              className="rounded-full bg-[#F6F1E7] px-3 py-1.5 text-xs font-semibold text-navy"
              key={highlight}
            >
              {highlight}
            </span>
          ))}
        </div>
        <button
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-leaf px-4 text-sm font-semibold text-paper transition hover:bg-ink focus:outline-none focus:ring-4 focus:ring-gold/25"
          onClick={() => onOpenRoutes(city.name)}
          type="button"
        >
          Ver roteiro
          <ArrowRight className="transition group-hover:translate-x-1" size={17} />
        </button>
      </div>
    </article>
  );
}
