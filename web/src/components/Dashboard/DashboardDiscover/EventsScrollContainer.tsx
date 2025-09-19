import { Dispatch, SetStateAction } from "react";
import Event from "../DashboardDiscover/Event.tsx";


type Event = {
  id: string;
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
  friends?: any[];
}

export default function EventsScrollContainer({
  events,
  setEventDetails,
  friends
}: EventsProps) {
  return (
    <div className="bg-white-background h-full overflow-y-scroll scrollbar-none">
      {events.map((e, index) => (
        <Event key={index} event={e} setEventDetails={setEventDetails} friends={friends}/>
      ))}
    </div>
  );
}
