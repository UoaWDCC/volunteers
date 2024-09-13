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

interface EventProps {
    event: Event;
}

export default function EventDetails({event}: EventProps) {
    const startDate = new Date(event.start_date_time);
    const endDate = new Date(event.end_date_time);

    return (
        <div className="fixed left-[15%] top-[10%] flex flex-col w-[85%] h-[90%] px-5 bg-[#F7F7FB]"> {/* event-container */}
            <div className="w-3/4 flex items-center">
                <div className="inline m-5"> {/* image-container */}
                    <img loading="lazy" className="h-24 w-40 object-cover rounded-md" src={event.image} />
                </div>
                
                <div className="inline w-1/2  p-2"> {/* event details on the right */}
                    <p className="mb-0 text-sm">{startDate.toISOString()}</p>
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