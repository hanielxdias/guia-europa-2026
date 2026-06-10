import type { TripDay } from "../types/trip";

export function parseLocalDate(date: string, time = "08:00") {
  return new Date(`${date}T${time}:00`);
}

export function formatDate(date: string) {
  return parseLocalDate(date, "12:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateWithWeekday(date: string) {
  const parsed = parseLocalDate(date, "12:00");
  const weekday = parsed.toLocaleDateString("pt-BR", { weekday: "long" });

  return {
    date: formatDate(date),
    weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
  };
}

export function getNextTripDay(days: TripDay[], now = new Date()) {
  const sortedDays = [...days].sort(
    (a, b) =>
      parseLocalDate(a.date, a.startTime).getTime() -
      parseLocalDate(b.date, b.startTime).getTime(),
  );

  return (
    sortedDays.find(
      (day) => parseLocalDate(day.date, day.startTime).getTime() >= now.getTime(),
    ) ?? null
  );
}
