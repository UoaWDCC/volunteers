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
    is_external?: boolean;               
    external_registration_url?: string;
};

interface EventCardProps {
    event: Event;
    onEdit?: () => void;
}

export default function EventCard({ event, onEdit }: EventCardProps) {
    const startDate = new Date(event.start_date_time);

    const days = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
    const day = days[startDate.getDay()];

    const months = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    const month = months[startDate.getMonth()];

    const hours = startDate.getHours() > 12 ? startDate.getHours() - 12 : startDate.getHours();
    const minutes = startDate.getMinutes() < 10 ? `0${startDate.getMinutes()}` : startDate.getMinutes();
    const time = `${hours}:${minutes} ${startDate.getHours() >= 12 ? "PM" : "AM"}`;

    const dateInfo = `${day}, ${startDate.getDate()} ${month} AT ${time}`;

    const handleRegistration = () => {
        if (event.is_external && event.external_registration_url) {
            // Open external URL in new tab
            window.open(event.external_registration_url, '_blank', 'noopener,noreferrer');
            
            // Show confirmation when user returns to tab
            const confirmation = confirm(
                "Have you completed registration on the external site?"
            );
            if (confirmation) {
                // Track successful redirects
                console.log("External registration completed for", event.event_title);
            }
        } else {
            // Internal event registration logic would go here
            console.log("Internal registration flow for", event.event_title);
        }
    };

    return (
        <div className="relative dashboard w-fullitems-center my-2 p-4 flex rounded-xl cursor-pointer bg-grey-background transition transform hover:translate-y-0.5 hover:bg-white hover:shadow-sm ease-in duration-100 ">
            {/* Edit Icon - Top Right */}
            <div className="absolute bg-white top-5 right-5 rounded-full shadow-md">
                <div className="w-10 h-10 rounded-full flex justify-center items-center transition duration-150 hover:border hover:border-blue-500 cursor-pointer"
                    onClick={onEdit}>
                    <img src="/assets/dashboard/admin/pen-tool.png"className="w-[55%] h-[55%] object-contain"/>
                </div>
            </div>

            {/* Image */}
            <div className="w-[25%] flex justify-center items-center">
                <img src={event.image} loading="lazy" alt="event" className=" rounded-md object-cover"/>
            </div>

            {/* Text */}
            <div className="w-[75%] flex flex-col justify-center pl-4">
                <p className="mb-0 text-sm">{dateInfo}</p>
                <h2 className="inline font-semibold text-base mb-1 text-xl">{event.event_title}</h2>
                <p className="mb-0 text-sm">{event.location}</p>
            </div>

            {/* Add Registration Button */}
            <div className="absolute bottom-5 right-5">
                <button 
                    onClick={handleRegistration}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    {event.is_external ? "Register (External)" : "Register"}
                </button>
            </div>
        </div>
    );
}
