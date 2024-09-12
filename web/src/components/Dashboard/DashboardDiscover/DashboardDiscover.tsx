import { useEffect, useState } from "react";
import EventsScrollContainer from "./EventsScrollContainer";
import axios from "axios";

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
}

function DashboardDiscover() {
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
    host: ""
  });

  const days = ["SUN","MON","TUES","WED","THURS","FRI","SAT"];
  const months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
  let startDate = new Date();

  // Get events from backend
  useEffect(() => {
      axios.get("http://localhost:3000/api/events")
          .then((response) => {
              setEvents(response.data);

            // Have default flagship event be next upcoming event
            events.sort((a, b) => {
              return new Date(a.start_date_time).getTime() - new Date(b.start_date_time).getTime();
            });

            setFlagshipEvent(response.data[0]);

            // Now check if there is a flagship event
            response.data.forEach((event:Event) => {
              if (event.tag.includes("Flagship Event")) {
                setFlagshipEvent(event);
              }
            },

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
    <div className="overflow-hidden flex flex-col w-[100%] h-screen px-5">

                <div className='flex flex-col bg-white mb-5 h-[33%] rounded-lg shadow-md'>
                    <div className='flex flex-row p-7'>
                    <img className='h-[190px] w-[680px] rounded-lg' src={flagshipEvent.image} />
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
                    <div className='pl-5 text-primary hover:underline'>More Info</div>
                    </div>
                    </div>
                </div>
                    
                <div className='mb-5 h-[60%]'>
                    {/* adjust sizes and stuff as needed */}
                    <EventsScrollContainer events = {events}/>
                </div>
            
        </div>
        
  );
}

export default DashboardDiscover;