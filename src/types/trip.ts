export type EventType =
  | "voo"
  | "trem"
  | "hospedagem"
  | "passeio"
  | "dia livre"
  | "documento"
  | "period-suggestion";

export type Status =
  | "Confirmado"
  | "A confirmar"
  | "Sugestão"
  | "Dia livre"
  | "A definir"
  | "A definir com Tia Dani"
  | "A combinar com Tia Dani"
  | "Detalhes a preencher"
  | "Aguardando arquivo";

export interface City {
  id: string;
  name: string;
  country: string;
  dates: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  image?: string;
  accent: "navy" | "leaf" | "coral" | "gold";
}

export interface TicketTime {
  label: string;
  time: string;
}

export interface TouristPoint {
  id: string;
  name: string;
  city: string;
  description: string;
  status: Status;
  mapQuery: string;
  image?: string;
  confirmLabel?: string;
}

export interface CustomMapLink {
  title: string;
  url: string;
  description: string;
  status: Status;
}

export interface TripDay {
  id: string;
  date: string;
  city: string;
  title: string;
  eventType: EventType;
  status: Status;
  period?: string;
  startTime?: string;
  description?: string;
  route?: string;
  activities: string[];
  summaryTitle?: string;
  practicalSummary?: string;
  routeNotes?: string[];
  foodSuggestions?: string[];
  importantNotes?: string[];
  ticketTimes?: TicketTime[];
  importantInfo?: string[];
  numberedRoute?: string[];
  suggestions?: TouristPoint[];
  customMapLinks?: CustomMapLink[];
  transportId?: string;
  hotelIds?: string[];
  voucherIds?: string[];
  mapQueries?: string[];
}

export interface PassengerDetail {
  name: string;
  seat?: string;
  details?: string;
}

export interface Transport {
  id: string;
  type: "voo" | "trem";
  company: string;
  title: string;
  date: string;
  origin: string;
  destination: string;
  departureTime?: string;
  arrivalTime?: string;
  flightNumber?: string;
  trainNumber?: string;
  reservationCode?: string;
  ticketCode?: string;
  className?: string;
  passengers: PassengerDetail[];
  baggage?: string[];
  services?: string[];
  totalValue?: string;
  counterOpens?: string;
  counterCloses?: string;
  checkInCloses?: string;
  status: Status;
  documentPath: string;
  originMapQuery: string;
  destinationMapQuery: string;
  notes?: string[];
}

export interface Hotel {
  id: string;
  city: string;
  name: string;
  checkIn: string;
  checkOut: string;
  address: string;
  status: Status;
  observations: string[];
  wifi: string;
  notes: string;
  reservation?: string;
  room?: string;
  totalPrice?: string;
  documentPath: string;
  mapQuery: string;
}

export interface Voucher {
  id: string;
  title: string;
  city: string;
  date: string;
  time?: string;
  type?: string;
  status: Status;
  meetingPoint?: string;
  address?: string;
  reservation?: string;
  observations?: string[];
  documentPath: string;
  mapQuery: string;
  image?: string;
}

export interface Mission {
  id: string;
  date: string;
  city: string;
  title: string;
  tasks: string[];
}

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  city?: string;
  date?: string;
  status: Status;
  filePath: string;
  details?: string[];
}

export interface MapLocation {
  id: string;
  name: string;
  city: string;
  type:
    | "Hospedagem"
    | "Aeroporto"
    | "Estação de trem"
    | "Ponto turístico"
    | "Ponto de encontro"
    | "Passeio confirmado";
  query: string;
  status?: Status;
}
