import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { FilterBar } from "../components/FilterBar";
import { HotelCard } from "../components/HotelCard";
import { PageHeader } from "../components/PageHeader";
import { SearchInput } from "../components/SearchInput";
import { cities, hotels } from "../data";
import { normalizeSearch } from "../utils/filters";

export function HotelsPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Todas");

  const filteredHotels = useMemo(() => {
    const query = normalizeSearch(search);
    const selectedCity = normalizeSearch(city);

    return hotels.filter((hotel) => {
      const cityMatches =
        city === "Todas" || normalizeSearch(hotel.city).includes(selectedCity);
      const searchable = normalizeSearch(
        [
          hotel.name,
          hotel.city,
          hotel.address,
          ...hotel.observations,
        ].join(" "),
      );

      return cityMatches && (!query || searchable.includes(query));
    });
  }, [city, search]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.28 }}
    >
      <PageHeader
        eyebrow="Hospedagens"
        title="Bases da família"
        description="Check-ins, check-outs, endereços e reservas da viagem."
      />

      <div className="mb-5 grid gap-3">
        <SearchInput value={search} onChange={setSearch} />
        <FilterBar
          cities={cities.map((item) => item.name)}
          selectedCity={city}
          onCityChange={setCity}
        />
      </div>

      {filteredHotels.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredHotels.map((hotel) => (
            <HotelCard hotel={hotel} key={hotel.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhuma hospedagem encontrada"
          message="Ajuste os filtros para ver outras hospedagens."
        />
      )}
    </motion.div>
  );
}
