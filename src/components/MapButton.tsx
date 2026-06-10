import { MapPin } from "lucide-react";
import { getGoogleMapsUrl } from "../utils/maps";
import { cn } from "../utils/cn";

interface MapButtonProps {
  query: string;
  label?: string;
  url?: string;
  variant?: "primary" | "soft";
}

export function MapButton({
  query,
  label = "Abrir no Maps",
  url,
  variant = "soft",
}: MapButtonProps) {
  const href = url ?? getGoogleMapsUrl(query);

  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold/30",
        variant === "primary"
          ? "bg-leaf text-paper shadow-soft"
          : "bg-paper text-navy ring-1 ring-gold/25 hover:bg-[#FFF9EE]",
      )}
      href={href}
      target="_blank"
      rel="noreferrer"
      title={url ? label : `Buscar ${query} no Google Maps`}
    >
      <MapPin size={17} />
      {label}
    </a>
  );
}
