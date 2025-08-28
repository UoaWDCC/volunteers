import { Dispatch, SetStateAction } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useState } from 'react';

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

export default function EventDetails({event, setEventDetails}: EventProps) {
    // Need to do this for some reason to get calling methods on Date object to work
    const startDate = new Date(event.start_date_time);
    const endDate = new Date(event.end_date_time);

    const mapEmbed = "https://maps.google.com/maps?q="+event.coordinates.longitude+","+event.coordinates.latitude+"&hl=en&z=18&amp&output=embed"
    
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
 
    const [buttonText, setButtonText] = useState('Register for Event');
    const [verifyButtonText, setVerifyButtonText] = useState('Verify Attendance');
    const [isPopupVisible, setIsPopupVisible] = useState(false);  // State for popup visibility
    const [isLocationVerificationPopupVisible, setIsLocationVerificationPopupVisible] = useState(false);
    const [isDistanceResultPopupVisible, setIsDistanceResultPopupVisible] = useState(false);  
    const [distanceResultMessage, setDistanceResultMessage] = useState('');  // Message to display in distance result popup

    const handleClick = () => {
        if (buttonText === 'Register for Event') {
            setButtonText('You are registered!');
        } else {
            setIsPopupVisible(true);  // Show the popup if already registered
        }
    };

    const handleConfirmUnregister = () => {
        setButtonText('Register for Event');  // Change button text back to 'Register for Event'
        setIsPopupVisible(false);  // Close the popup
    };

    const handleCancelUnregister = () => {
        setIsPopupVisible(false);  // Close the popup without changing the button text
    };

    const handleAttendanceVerificationClick = () => {
        setIsLocationVerificationPopupVisible(true);
    };

    const handleVerifyLocation = () => {
        setIsLocationVerificationPopupVisible(false);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLon = position.coords.longitude;
                    const eventLat = parseFloat(event.coordinates.latitude);
                    const eventLon = parseFloat(event.coordinates.longitude);
                    
                    const distance = calculateDistance(userLat, userLon, eventLon, eventLat);
                    let message;
                    if (distance < 1) {
                        message = `You're ${distance.toFixed(2)} km away from the event. Thanks for joining us!`;
                    } else {
                        message = `You're ${distance.toFixed(2)} km away from the event. You must be within 1 km to verify your attendance.`;
                    }
                    setDistanceResultMessage(message);
                    setIsDistanceResultPopupVisible(true);
                },
                (error) => {
                    alert("Unable to get your location. Please try again.");
                }
            );
        } else {
            alert("This browser does not support geolocation.");
        }
    };

    const handleCancelLocationVerification = () => {
        setIsLocationVerificationPopupVisible(false);
    };

    // Calculate distance between event and current user location
    function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // Distance in kilometers
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                const eventLat = parseFloat(event.coordinates.latitude);
                const eventLon = parseFloat(event.coordinates.longitude);
                
                const distance = calculateDistance(userLat, userLon, eventLon, eventLat);
                console.log("Distance to event:", distance.toFixed(2) + " km");
            },
            (error) => {
                console.log("Unable to calculate distance:", error.message);
            }
        );
    }

    return (
        <div className="flex flex-col absolute top-0 left-0 items-center w-full h-full bg-[#F7F7FB] overflow-scroll scrollbar-none"> {/* event-container */}
            <div className="self-start ml-6 cursor-pointer" onClick={() => setEventDetails(null)}><IoArrowBackCircle  size="40px" color="#3B87DD" /></div>

            <img src={event.image} className=" w-[95%] h-[24rem] rounded-3xl mt-2 object-cover" />

            <div className="flex flex-col w-[95%] py-4">
                <div className="flex flex-row justify-between items-center w-full">
                    <h1 className="text-subheading font-bold">{event.event_title}</h1>
                    <button className="h-10 text-body-heading rounded-full" onClick={handleClick}>{buttonText}</button>
                    <button className="h-10 text-body-heading rounded-full" onClick={handleAttendanceVerificationClick}>{verifyButtonText}</button>
                </div>

                <div className="flex flex-row justify-start gap-3 w-full">
                    {event.tag.map((tag, index) => (
                        <div key={index} className="text-xs pt-[3px] px-3 h-6 text-grey border-grey border-solid border-2 rounded-full ">{tag}</div>
                    ))}
                </div>
            </div>
            {/* Popup for confirmation */}
            {isPopupVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3 text-center">
                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to unregister?</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                onClick={handleConfirmUnregister}
                            >
                                Yes, I am sure
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                onClick={handleCancelUnregister}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Location verification popup */}
            {isLocationVerificationPopupVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3 text-center">
                        <h2 className="text-lg font-semibold mb-4">Would you like to verify your attendance through location?</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                onClick={handleVerifyLocation}
                            >
                                Verify
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                onClick={handleCancelLocationVerification}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Distance result popup */}
            {isDistanceResultPopupVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3 text-center">
                        <h2 className="text-lg font-semibold mb-4">{distanceResultMessage}</h2>
                        <div className="flex justify-center">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                onClick={() => setIsDistanceResultPopupVisible(false)}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="flex flex-row w-[95%] justify-between">
                <div className="w-[60%]">
                    <div className="flex flex-col w-full mt-3">
                        <h3 className="text-heading3 font-semibold">Description</h3>
                        <p className="text-body-heading mt-[-20px]">{event.description}</p>
                    </div>

                    <div className="flex flex-col w-full mt-3">
                        <h3 className="text-heading3 font-semibold">Key Tasks and Responsibilities</h3>
                        <p className="text-body-heading mt-[-20px]">{event.tasks}</p>
                    </div>

                    <div className="flex flex-col w-full mt-3">
                        <h3 className="text-heading3 font-semibold">Important Notes</h3>
                        <p className="text-body-heading mt-[-20px]">{event.notes}</p>
                    </div>

                    <div className="flex flex-col w-full mt-3">
                        <h3 className="text-heading3 font-semibold">Contact Details</h3>
                        <p className="text-body-heading mt-[-20px]">{"Hosted By: " + event.host}</p>
                        <p className="text-body-heading mt-[-20px]">{event.contact}</p>
                    </div>
                </div>

                <div className="flex flex-col w-[35%]">
                    <div className="w-full h-[35vh] object-cover">
                        <iframe title="map" className="w-full h-full border-lightGrey border-solid border-2 rounded-lg"
                                src={mapEmbed}
                        />
                    </div>

                    <div className="flex flex-col w-full pl-2 mt-4">
                        <h3 className="text-heading3 font-semibold">Address</h3>
                        <p className="text-body-heading mt-[-20px]">{event.location}</p>
                    </div>

                    <div className="flex flex-col w-full pl-2">
                        <h3 className="text-heading3 font-semibold">Date</h3>
                        <p className="text-body-heading mt-[-20px]">{startDate.toLocaleString("en-NZ", options)}</p>
                    </div>

                    <div className="flex flex-col w-full pl-2">
                        <h3 className="text-heading3 font-semibold">Time</h3>
                        <p className="text-body-heading mt-[-20px]">{startDate.toLocaleString("en-NZ", {hour:'numeric', minute:'numeric'}) + " - " + endDate.toLocaleString("en-NZ", {hour:'numeric', minute:'numeric'})}</p>
                    </div>
                </div>
            </div>

        </div> 
    )
}