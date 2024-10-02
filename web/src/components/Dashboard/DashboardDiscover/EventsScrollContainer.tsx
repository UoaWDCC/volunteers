import { Dispatch, SetStateAction } from "react";
import Event from "../DashboardDiscover/Event.tsx";


type Event = {
  event_title: string;
  description: string;
  tasks: string;
  notes: string;
  contact: string;
  tag: string[];
  start_date_time: Date;
  end_date_time: Date;
  location: string;
  image: string;
  host: string;
  coordinates: { longitude: string; latitude: string };
};

interface EventsProps {
  events: Event[];
  setEventDetails: Dispatch<SetStateAction<null | Event>>;
}

export default function EventsScrollContainer({
  events,
  setEventDetails,
}: EventsProps) {
  return (
    <div className="dashboard bg-white-background h-[43vh] overflow-y-scroll">
      {events.map((e, index) => (
        <Event key={index} event={e} setEventDetails={setEventDetails} />
      ))}
    </div>
  );
}
