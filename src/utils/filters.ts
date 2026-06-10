import type { EventType } from "../types/trip";

export const eventTypeLabels: Record<EventType, string> = {
  voo: "Voo",
  trem: "Trem",
  hospedagem: "Hospedagem",
  passeio: "Passeio",
  "dia livre": "Dia livre",
  documento: "Documento",
  "period-suggestion": "Período flexível",
};

export function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
