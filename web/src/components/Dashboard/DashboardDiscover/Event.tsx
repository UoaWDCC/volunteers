import { Dispatch, SetStateAction} from "react";

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
    coordinates: {longitude: string, latitude: string};
}

interface EventProps {
    event: Event;
    setEventDetails: Dispatch<SetStateAction<null|Event>>;
}

export default function Event({event, setEventDetails}: EventProps) {
    const startDate = new Date(event.start_date_time);

    const days = ["SUN","MON","TUES","WED","THURS","FRI","SAT"];
    const day = days[startDate.getDay()];

    const months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
    const month  = months[startDate.getMonth()];

    // Represent time in 12 hour format
    const hours = startDate.getHours() > 12 ? startDate.getHours() - 12 : startDate.getHours();
    const minutes = startDate.getMinutes() < 10 ? `0${startDate.getMinutes()}` : startDate.getMinutes();
    const time = `${hours}:${minutes} ${startDate.getHours() > 12 ? "PM" : "AM"}`;


    const dateInfo = `${day}, ${startDate.getDate()} ${month} AT ${time}`;

    return (
        <div onClick={() => setEventDetails(event)} className="dashboard bg-white-background hover:bg-white hover:shadow-sm ease-in duration-500 items-center m-4 flex rounded-xl"> {/* event-container */}
            <div className="w-3/4 flex items-center">
                <div className="inline m-5"> {/* image-container */}
                    <img loading="lazy" className="h-24 w-40 object-cover rounded-md" src={event.image} />
                </div>
                
                <div className="inline w-1/2  p-2"> {/* event details on the right */}
                    <p className="mb-0 text-sm">{dateInfo}</p>
                    <h2 className="inline font-semibold text-base mb-1 text-xl">{event.event_title}</h2>
                    <p className="mb-0 text-sm">{event.location}</p>
                </div>
            </div>
            <div className="ml-auto p-6">
                <p className="text-right block text-xs font-semibold">{event.host}</p>
                <div className="">  
                    <p className="text-right block text-xs m-0">30 interested</p>
                    <p className="text-right block text-xs">15 going</p>
                </div>
            </div>
        </div>

    )
}