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
}

interface EventProps {
    event: Event;
}

export default function Event(event: EventProps) {
    return (
        <div className="dashboard bg-white-background hover:bg-white hover:shadow-sm ease-in duration-500 items-center m-4 flex rounded-xl"> {/* event-container */}
            <div className="w-3/4 flex items-center">
                <div className="inline m-5"> {/* image-container */}
                    <img loading="lazy" className="h-24 w-40 object-cover rounded-md" src="../../assets/gallery/events/sample1.png" />
                </div>
                
                <div className="inline w-1/2  p-2"> {/* event details on the right */}
                    <p className="mb-0 text-sm">SAT, 11 MAY AT 9PM</p>
                    <h2 className="inline font-semibold text-base mb-1 text-xl">UoA Annual Volunteers Day</h2>
                    <p className="mb-0 text-sm">The University of Auckland | General Library</p>
                </div>
            </div>
            <div className="ml-auto p-6">
                <p className="text-right block text-xs font-semibold">UoA Volunteers Club</p>
                <div className="">  
                    <p className="text-right block text-xs m-0">30 interested</p>
                    <p className="text-right block text-xs">15 going</p>
                </div>
            </div>
        </div>

    )
}