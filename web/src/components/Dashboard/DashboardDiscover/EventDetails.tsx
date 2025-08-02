import { Dispatch, SetStateAction, useContext, useEffect, useCallback } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios';
import AuthenticationContext from "../../../context/AuthenticationContext";
import CloseThumbsUpSuccessPopup from "../dashboardProfile/CloseThumbsUpSuccessPopup";

type Event = {
    id?: string;
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
 
    const [buttonText, setButtonText] = useState('Checking...');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState(true);

    // Get user context
    const authContext = useContext(AuthenticationContext);
    const { uid, email, firestoreUserDetails } = authContext as unknown as {
        uid: string;
        email: string;
        firestoreUserDetails: Record<string, unknown> | null;
    };

    const appUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const checkRegistrationStatus = useCallback(async () => {
        try {
            setIsCheckingStatus(true);
            console.log('Checking registration status for event:', event.id);
            console.log('Current user UID:', uid);
            console.log('Firestore user details:', firestoreUserDetails);
            
            // Use the UID from firestoreUserDetails if available, otherwise use the current uid
            const userIdentifier = firestoreUserDetails?.uid || uid;
            console.log('Using user identifier:', userIdentifier);
            
            const response = await axios.get(`${appUrl}/api/userEventRegistrations/user/${userIdentifier}`);
            const userRegistrations = response.data;
            console.log('User registrations:', userRegistrations);
            
            // Check if user is registered for this specific event
            const isUserRegistered = userRegistrations.some((reg: { eventId: string; status: string }) => {
                console.log('Comparing:', reg.eventId, 'with', event.id, 'status:', reg.status);
                // Only consider as registered if status is 'registered', not 'cancelled'
                return reg.eventId === event.id && reg.status === 'registered';
            });
            
            console.log('Is user registered:', isUserRegistered);
            setIsRegistered(isUserRegistered);
            setButtonText(isUserRegistered ? 'You are registered!' : 'Register for Event');
        } catch (error) {
            console.error('Error checking registration status:', error);
            setButtonText('Register for Event');
        } finally {
            setIsCheckingStatus(false);
        }
    }, [event.id, uid, firestoreUserDetails, appUrl]);

    // Check if user is registered for this event on component mount
    useEffect(() => {
        if (uid && event.id) {
            checkRegistrationStatus();
        }
    }, [uid, event.id, checkRegistrationStatus]);

    const handleClick = async () => {
        if (!uid) {
            alert('Please log in to register for events');
            return;
        }

        if (!event.id) {
            alert('Event ID not found');
            return;
        }

        setIsLoading(true);

        try {
            if (!isRegistered) {
                // Register for event
                console.log('Attempting to register for event:', event.id);
                
                // Use the UID from firestoreUserDetails if available, otherwise use the current uid
                const userIdentifier = firestoreUserDetails?.uid || uid;
                console.log('Using user identifier for registration:', userIdentifier);
                
                const registrationData = {
                    userId: userIdentifier,
                    eventId: event.id,
                    userEmail: email,
                    eventTitle: event.event_title
                };
                console.log('Registration data:', registrationData);
                
                await axios.post(`${appUrl}/api/userEventRegistrations/register`, registrationData);
                
                console.log('Registration successful');
                // Re-check registration status after registration
                await checkRegistrationStatus();
                setShowSuccessPopup(true);
            } else {
                // Show unregister popup
                setIsPopupVisible(true);
            }
        } catch (error: unknown) {
            console.error('Error registering for event:', error);
            if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'status' in error.response && error.response.status === 409) {
                // User is already registered, re-check status
                await checkRegistrationStatus();
                setShowSuccessPopup(true);
            } else {
                alert('Failed to register for event. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmUnregister = async () => {
        if (!uid || !event.id) return;

        setIsLoading(true);
        try {
            // Use the UID from firestoreUserDetails if available, otherwise use the current uid
            const userIdentifier = firestoreUserDetails?.uid || uid;
            console.log('Using user identifier for unregistration:', userIdentifier);
            
            await axios.put(`${appUrl}/api/userEventRegistrations/cancel/${userIdentifier}/${event.id}`);
            // Re-check registration status after cancellation
            await checkRegistrationStatus();
            setIsPopupVisible(false);
            setShowSuccessPopup(true);
        } catch (error) {
            console.error('Error unregistering from event:', error);
            alert('Failed to unregister from event. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelUnregister = () => {
        setIsPopupVisible(false);  // Close the popup without changing the button text
    };
    return (
        <div className="flex flex-col absolute top-0 left-0 items-center w-full h-full bg-[#F7F7FB] overflow-scroll scrollbar-none"> {/* event-container */}
            <div className="self-start ml-6 cursor-pointer" onClick={() => setEventDetails(null)}><IoArrowBackCircle  size="40px" color="#3B87DD" /></div>

            <img src={event.image} className=" w-[95%] h-[24rem] rounded-3xl mt-2 object-cover" />

            <div className="flex flex-col w-[95%] py-4">
                <div className="flex flex-row justify-between items-center w-full">
                    <h1 className="text-subheading font-bold">{event.event_title}</h1>
                    <button 
                        className={`h-10 text-body-heading rounded-full ${(isLoading || isCheckingStatus) ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        onClick={handleClick}
                        disabled={isLoading || isCheckingStatus}
                    >
                        {isLoading ? 'Loading...' : isCheckingStatus ? 'Checking...' : buttonText}
                    </button>
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

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[1000]">
                    <CloseThumbsUpSuccessPopup onClose={() => setShowSuccessPopup(false)} />
                </div>
            )}

        </div> 
    )
}