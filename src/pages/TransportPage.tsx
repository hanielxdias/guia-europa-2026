import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { FilterBar } from "../components/FilterBar";
import { PageHeader } from "../components/PageHeader";
import { SearchInput } from "../components/SearchInput";
import { TransportCard } from "../components/TransportCard";
import { cities, transports } from "../data";
import { normalizeSearch } from "../utils/filters";

export function TransportPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Todas");

  const filteredTransports = useMemo(() => {
    const query = normalizeSearch(search);
    const selectedCity = normalizeSearch(city);

    return transports.filter((transport) => {
      const searchable = normalizeSearch(
        [
          transport.company,
          transport.title,
          transport.origin,
          transport.destination,
          transport.flightNumber,
          transport.trainNumber,
          transport.reservationCode,
          transport.ticketCode,
        ]
          .filter(Boolean)
          .join(" "),
      );
      const cityMatches =
        city === "Todas" ||
        normalizeSearch(`${transport.origin} ${transport.destination} ${transport.title}`).includes(
          selectedCity,
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
        eyebrow="Voos & Trens"
        title="Transportes da viagem"
        description="Cartões com origem, destino, horários, passageiros, assentos, bagagens e links úteis."
      />

      <div className="mb-5 grid gap-3">
        <SearchInput value={search} onChange={setSearch} />
        <FilterBar
          cities={cities.map((item) => item.name)}
          selectedCity={city}
          onCityChange={setCity}
        />
      </div>

      {filteredTransports.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredTransports.map((transport) => (
            <TransportCard key={transport.id} transport={transport} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhum transporte encontrado"
          message="Tente buscar por companhia, rota, código ou cidade."
        />
      )}
    </motion.div>
  );
}
