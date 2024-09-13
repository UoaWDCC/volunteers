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
        <div className="flex flex-col items-center fixed left-[15%] top-[10%] w-[85%] h-[90%] px-5 pt-5 bg-[#F7F7FB] overflow-scroll scrollbar-none"> {/* event-container */}
            <img src={event.image} className=" w-[95%] h-[45vh] rounded-3xl" />

            <div className="flex flex-col w-full px-10 py-4">
                <div className="flex flex-row justify-between items-center w-full">
                    <h1 className="text-subheading font-bold">{event.event_title}</h1>
                    <button className="h-10 text-body-heading rounded-full">Register for Event</button>
                </div>

                <div className="flex flex-row justify-start gap-3 w-full">
                    {event.tag.map((tag, index) => (
                        <div key={index} className="text-xs pt-[3px] px-3 h-6 text-grey border-grey border-solid border-2 rounded-full ">{tag}</div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col w-full px-10 mt-3">
                <h3 className="text-heading3 font-semibold">Description</h3>
                <p className="text-body-heading mt-[-20px]">{event.description}</p>
            </div>

            <div className="flex flex-col w-full px-10 mt-3">
                <h3 className="text-heading3 font-semibold">Key Tasks and Responsibilities</h3>
                <p className="text-body-heading mt-[-20px]">{event.tasks}</p>
            </div>

            <div className="flex flex-col w-full px-10 mt-3">
                <h3 className="text-heading3 font-semibold">Important Notes</h3>
                <p className="text-body-heading mt-[-20px]">{event.notes}</p>
            </div>

        </div> 
    )
}