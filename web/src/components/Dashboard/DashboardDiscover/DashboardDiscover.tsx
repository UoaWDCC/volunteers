import { useEffect, useState } from "react";
import EventsScrollContainer from "../dashboardDiscover/EventsScrollContainer";
import axios from "axios";
import EventDetails from "../dashboardDiscover/EventDetails";

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
  coordinates: { longitude: string, latitude: string };
}

function DashboardDiscover() {
  const [eventDetails, setEventDetails] = useState<null | Event>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [flagshipEvent, setFlagshipEvent] = useState<Event>({
    event_title: "",
    description: "",
    tasks: "",
    notes: "",
    contact: "",
    tag: [],
    start_date_time: new Date(),
    end_date_time: new Date(),
    location: "",
    image: "",
    host: "",
    coordinates: { longitude: "", latitude: "" }
  });

  const days = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  let startDate = new Date();

  // Get events from backend
  useEffect(() => {
    axios.get("http://localhost:3000/api/events")
      .then((response) => {
        setEvents(response.data);

        // Have default flagship event be next upcoming event by sorting events by date and taking the first one
        events.sort((a, b) => {
          return new Date(a.start_date_time).getTime() - new Date(b.start_date_time).getTime();
        });

        setFlagshipEvent(response.data[0]);

        // Now check if there is a flagship event (tagged as such) and set it as the flagship event
        response.data.forEach((event: Event) => {
          if (event.tag.includes("Flagship Event")) {
            setFlagshipEvent(event);
          }
        },

          // Need to do this for some reason to get calling methods on Date object to work
          startDate = new Date(flagshipEvent.start_date_time),

        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
    , []);

  console.log(flagshipEvent);


  return (
    <div className="flex flex-col w-[96%] relative">
      <div className='flex flex-row bg-white rounded-lg shadow-md h-[18rem] cursor-pointer mb-5 items-center p-7'>
        <div className="h-[16rem] w-[48rem]">
          <img className='object-cover w-full h-full rounded-lg' src={flagshipEvent.image} />
        </div>
        <div className="flex flex-col">
          <div className='pl-5 text-2xl font-medium text-primary pt-1'>This month's event...</div>
          <div className='pl-5 pt-3'>{days[startDate.getDay()] + ", " + startDate.getDate() + " " + months[startDate.getMonth()]}</div>
          <div className='pl-5 font-medium'>{flagshipEvent.event_title}</div>
          <div className='pl-5 font-light'>{flagshipEvent.location}</div>
          <div className="flex flex-row pt-2 pb-2">
            <div className="ml-5 mt-1 rounded-full bg-slate-400 w-3 h-3"></div>
            <div className='ml-2 font-light text-sm'>Eduardo is interested</div>
            <div className="ml-5 mt-1 rounded-full bg-slate-400 w-3 h-3"></div>
            <div className='ml-2 font-light text-sm'>John, and 4 other friends are going</div>
          </div>
          <div className='pl-5 text-primary hover:underline cursor-pointer' onClick={() => setEventDetails(flagshipEvent)}>More Info</div>
        </div>
      </div>

      <div className='flex-1 rounded-xl overflow-y-auto'>
        {/* adjust sizes and stuff as needed */}
        <EventsScrollContainer events={events} setEventDetails={setEventDetails} />
      </div>

        {eventDetails && (
          <EventDetails event={eventDetails} setEventDetails={setEventDetails} />
        )}
    </div>

  );
}

export default DashboardDiscover;