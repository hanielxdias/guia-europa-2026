import { motion } from "framer-motion";
import { MapPinned } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { FilterBar } from "../components/FilterBar";
import { MapButton } from "../components/MapButton";
import { PageHeader } from "../components/PageHeader";
import { SearchInput } from "../components/SearchInput";
import { StatusBadge } from "../components/StatusBadge";
import { cities, mapLocations } from "../data";
import type { MapLocation } from "../types/trip";
import { normalizeSearch } from "../utils/filters";

const groups: Array<MapLocation["type"] | "Todos"> = [
  "Todos",
  "Hospedagem",
  "Aeroporto",
  "Estação de trem",
  "Ponto turístico",
  "Ponto de encontro",
  "Passeio confirmado",
];

export function MapsPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Todas");
  const [group, setGroup] = useState<MapLocation["type"] | "Todos">("Todos");

  const filteredLocations = useMemo(() => {
    const query = normalizeSearch(search);
    const selectedCity = normalizeSearch(city);

    return mapLocations.filter((location) => {
      const cityMatches =
        city === "Todas" || normalizeSearch(location.city).includes(selectedCity);
      const groupMatches = group === "Todos" || location.type === group;
      const searchable = normalizeSearch(
        `${location.name} ${location.city} ${location.type} ${location.query}`,
      );

      return cityMatches && groupMatches && (!query || searchable.includes(query));
    });
  }, [city, group, search]);

  const locationsByGroup = groups
    .filter((item) => item !== "Todos")
    .map((item) => ({
      group: item,
      locations: filteredLocations.filter((location) => location.type === item),
    }))
    .filter((item) => item.locations.length > 0);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.28 }}
    >
      <PageHeader
        eyebrow="Mapas"
        title="Locais úteis"
        description="Hospedagens, aeroportos, estações, pontos turísticos, encontros e passeios confirmados com links para Google Maps."
      />

      <div className="mb-5 grid gap-3">
        <SearchInput value={search} onChange={setSearch} />
        <FilterBar
          cities={cities.map((item) => item.name)}
          selectedCity={city}
          onCityChange={setCity}
        />
        <div className="flex gap-2 overflow-x-auto rounded-[1.35rem] bg-white p-3 shadow-soft ring-1 ring-slate-100">
          {groups.map((item) => (
            <button
              className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-bold transition ${
                group === item
                  ? "bg-coral text-white shadow-soft"
                  : "bg-slate-100 text-muted hover:bg-slate-200"
              }`}
              key={item}
              onClick={() => setGroup(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {locationsByGroup.length ? (
        <div className="grid gap-6">
          {locationsByGroup.map((section) => (
            <section key={section.group}>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy text-white">
                  <MapPinned size={20} />
                </div>
                <h2 className="text-xl font-black text-text">{section.group}</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {section.locations.map((location) => (
                  <article
                    className="rounded-[1.35rem] bg-white p-5 shadow-soft ring-1 ring-slate-100"
                    key={location.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-coral">
                          {location.city}
                        </p>
                        <h3 className="mt-1 text-lg font-black text-text">
                          {location.name}
                        </h3>
                      </div>
                      {location.status ? (
                        <StatusBadge status={location.status} />
                      ) : null}
                    </div>
                    <div className="mt-4">
                      <MapButton query={location.query} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhum local encontrado"
          message="Ajuste cidade, grupo ou busca para ver outros pontos no mapa."
        />
      )}
    </motion.div>
  );
}
