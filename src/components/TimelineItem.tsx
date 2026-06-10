import type { TripDay } from "../types/trip";
import { EventCard } from "./EventCard";

interface TimelineItemProps {
  day: TripDay;
}

export function TimelineItem({ day }: TimelineItemProps) {
  return (
    <div className="relative pl-7">
      <div className="absolute left-0 top-6 h-full w-px bg-slate-200" />
      <div className="absolute left-[-7px] top-6 h-4 w-4 rounded-full border-4 border-mist bg-coral shadow-soft" />
      <EventCard day={day} />
    </div>
  );
}
