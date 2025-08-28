import { useState } from 'react';
import { useExternalRegistration } from '../../../Hooks/useExternalRegistration';
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
    id?: string;
    is_external?: boolean;
    external_registration_url?: string | null;
};

interface EventCardProps {
    event: Event;
    onEdit?: () => void;
}

export default function EventCard({ event, onEdit }: EventCardProps) {
    const {
        showConfirmation,
        pendingEvent,
        startExternalRegistration,
        completeRegistration,
        cancelRegistration,
        unregisterExternalEvent,
        isExternallyRegistered
    } = useExternalRegistration();
    
    const [showUnregisterPopup, setShowUnregisterPopup] = useState(false);
    const isRegistered = isExternallyRegistered(event.id || '');
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
            if (isRegistered) {
                setShowUnregisterPopup(true);
            } else {
                startExternalRegistration(event.id || '', event.event_title, event.external_registration_url);
            }
        } else {
            console.log("Internal registration flow for", event.event_title);
        }
    };

    const handleConfirmUnregister = () => {
        if (event.id) {
            unregisterExternalEvent(event.id);
        }
        setShowUnregisterPopup(false);
    };

    const handleCancelUnregister = () => {
        setShowUnregisterPopup(false);
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

            {/* Registration Button */}
            <div className="absolute bottom-5 right-5">
                <button 
                    onClick={handleRegistration}
                    className={`px-4 py-2 rounded-md transition 'bg-blue-500 text-white hover:bg-blue-600`}
                    disabled={isRegistered}
                >
                    {isRegistered ? 'You are registered!' : 
                     event.is_external ? 'Register (External)' : 'Register'}
                </button>
            </div>

            {/* External Registration Confirmation Popup */}
            {showConfirmation && pendingEvent && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg w-1/3 text-center">
                        <h2 className="text-lg font-semibold mb-4">Registration Confirmation</h2>
                        <p className="mb-4">Did you complete your registration for "{pendingEvent.title}"?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                onClick={completeRegistration}
                            >
                                Yes, I completed registration
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                onClick={cancelRegistration}
                            >
                                Not yet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
