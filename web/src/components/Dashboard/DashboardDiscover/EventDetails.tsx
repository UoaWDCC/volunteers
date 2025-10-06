import { Dispatch, SetStateAction } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthenticationContextProvider';
import { addDoc, collection, doc, getFirestore, serverTimestamp, query, where, getDocs, deleteDoc } from "firebase/firestore";

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
    id?: string; // Add document ID
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
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [attendanceId, setAttendanceId] = useState<string | null>(null);
    const [isInterested, setIsInterested] = useState(false);
    const [interestId, setInterestId] = useState<string | null>(null);
    const [interestedCount, setInterestedCount] = useState(0);
    const [goingCount, setGoingCount] = useState(0);

    const db = getFirestore();

    const auth = useAuth();
    const user = auth?.currentUser;

    // Check if user is already registered for this event
    useEffect(() => {
        const checkRegistration = async () => {
            if (!user?.uid || !event.id) return;
            
            try {
                // First, find the user's document ID in the users collection
                const usersRef = collection(db, 'users');
                const userQuery = query(usersRef, where('uid', '==', user.uid));
                const userSnapshot = await getDocs(userQuery);
                
                if (userSnapshot.empty) {
                    return;
                }
                
                const userDocId = userSnapshot.docs[0].id;
                
                const attendanceRef = collection(db, 'event_attendance');
                const q = query(
                    attendanceRef, 
                    where('eventId', '==', doc(db, 'events', event.id)),
                    where('uid', '==', doc(db, 'users', userDocId))
                );
                const querySnapshot = await getDocs(q);
                
                if (!querySnapshot.empty) {
                    const attendanceDoc = querySnapshot.docs[0];
                    const status = attendanceDoc.data().status || 'going';
                    
                    if (status === 'going') {
                        setIsRegistered(true);
                        setButtonText('You are registered!');
                        setAttendanceId(attendanceDoc.id);
                        setIsInterested(false);
                        setInterestId(null);
                    } else if (status === 'interested') {
                        setIsInterested(true);
                        setInterestId(attendanceDoc.id);
                        setIsRegistered(false);
                        setAttendanceId(null);
                    }
                } else {
                    setIsRegistered(false);
                    setButtonText('Register for Event');
                    setAttendanceId(null);
                    setIsInterested(false);
                    setInterestId(null);
                }
                
                // Get counts for interested and going
                const allAttendanceQuery = query(
                    attendanceRef,
                    where('eventId', '==', doc(db, 'events', event.id))
                );
                const allAttendanceSnapshot = await getDocs(allAttendanceQuery);
                
                let interested = 0;
                let going = 0;
                allAttendanceSnapshot.forEach((doc) => {
                    const status = doc.data().status || 'going';
                    if (status === 'interested') {
                        interested++;
                    } else if (status === 'going') {
                        going++;
                    }
                });
                
                setInterestedCount(interested);
                setGoingCount(going);
            } catch (error) {
                console.error('Error checking registration:', error);
            }
        };

        checkRegistration();
    }, [user?.uid, event.id]);

    const handleClick = () => {
        if (!isRegistered) {
            if(user?.uid && event.id) {
                registerUserToEvent(event.id, user.uid);
            } else {
                return;
            }
            setButtonText('You are registered!');
        } else {
            setIsPopupVisible(true);  // Show the popup if already registered
        }
    };

    const handleConfirmUnregister = () => {
        if (attendanceId) {
            unregisterUserFromEvent(attendanceId);
        } else {
            console.error("No attendanceId found for unregister");
        }
        setButtonText('Register for Event');
        setIsPopupVisible(false);
    };

    const handleCancelUnregister = () => {
        setIsPopupVisible(false);  // Close the popup without changing the button text
    };

    async function registerUserToEvent(eventId: string, userId: string) {
        try {
            // First, find the user's document ID in the users collection
            const usersRef = collection(db, 'users');
            const userQuery = query(usersRef, where('uid', '==', userId));
            const userSnapshot = await getDocs(userQuery);
            
            if (userSnapshot.empty) {
                return;
            }
            
            const userDocId = userSnapshot.docs[0].id;
            
            // If user was interested, update the existing record
            if (interestId) {
                const interestDoc = doc(db, "event_attendance", interestId);
                await deleteDoc(interestDoc);
                setIsInterested(false);
                setInterestId(null);
            }
            
            const docRef = await addDoc(collection(db, "event_attendance"), {
                eventId: doc(db, "events", eventId), // Reference to events collection
                uid: doc(db, "users", userDocId),    // Reference to users collection using actual document ID
                status: "going",
                timestamp: serverTimestamp(),
            });
            
            setIsRegistered(true);
            setAttendanceId(docRef.id); // Set the attendance document ID
            setGoingCount(goingCount + 1);
            if (interestId) {
                setInterestedCount(interestedCount - 1);
            }
        } catch (error) {
            console.error("Error registering for event:", error);
        }
    }

    async function unregisterUserFromEvent(attendanceDocId: string) {
        try {
            const attendanceDoc = doc(db, "event_attendance", attendanceDocId);
            await deleteDoc(attendanceDoc);
            setIsRegistered(false);
            setAttendanceId(null);
            setGoingCount(goingCount - 1);
        } catch (error) {
            console.error("Error unregistering from event:", error);
        }
    }

    async function markInterestInEvent(eventId: string, userId: string) {
        try {
            // First, find the user's document ID in the users collection
            const usersRef = collection(db, 'users');
            const userQuery = query(usersRef, where('uid', '==', userId));
            const userSnapshot = await getDocs(userQuery);
            
            if (userSnapshot.empty) {
                return;
            }
            
            const userDocId = userSnapshot.docs[0].id;
            
            const docRef = await addDoc(collection(db, "event_attendance"), {
                eventId: doc(db, "events", eventId),
                uid: doc(db, "users", userDocId),
                status: "interested",
                timestamp: serverTimestamp(),
            });
            
            setIsInterested(true);
            setInterestId(docRef.id);
            setInterestedCount(interestedCount + 1);
        } catch (error) {
            console.error("Error marking interest in event:", error);
        }
    }

    async function removeInterestInEvent(interestDocId: string) {
        try {
            const interestDoc = doc(db, "event_attendance", interestDocId);
            await deleteDoc(interestDoc);
            setIsInterested(false);
            setInterestId(null);
            setInterestedCount(interestedCount - 1);
        } catch (error) {
            console.error("Error removing interest in event:", error);
        }
    }

    const handleInterestClick = () => {
        if (!isInterested) {
            if (user?.uid && event.id) {
                markInterestInEvent(event.id, user.uid);
            }
        } else {
            if (interestId) {
                removeInterestInEvent(interestId);
            }
        }
    };
    
    return (
        <div className="flex flex-col absolute top-0 left-0 items-center w-full h-full bg-[#F7F7FB] overflow-scroll scrollbar-none"> {/* event-container */}
            <div className="self-start ml-6 cursor-pointer" onClick={() => setEventDetails(null)}><IoArrowBackCircle  size="40px" color="#3B87DD" /></div>

            <img src={event.image} className=" w-[95%] h-[24rem] rounded-3xl mt-2 object-cover" />

            <div className="flex flex-col w-[95%] py-4">
                <div className="flex flex-row justify-between items-center w-full">
                    <h1 className="text-subheading font-bold">{event.event_title}</h1>
                    <div className="flex gap-2">
                        <button 
                            className={`h-10 px-4 text-body-heading rounded-full border-2 ${isInterested ? 'bg-blue-100 border-blue-500 text-blue-700' : 'border-gray-300 hover:border-blue-300'}`}
                            onClick={handleInterestClick}
                        >
                            {isInterested ? '★ Interested' : '☆ Interested'}
                        </button>
                        <button className="h-10 px-4 text-body-heading rounded-full bg-primary text-white" onClick={handleClick}>{buttonText}</button>
                    </div>
                </div>

                <div className="flex flex-row justify-start gap-3 w-full mt-2">
                    {event.tag.map((tag, index) => (
                        <div key={index} className="text-xs pt-[3px] px-3 h-6 text-grey border-grey border-solid border-2 rounded-full ">{tag}</div>
                    ))}
                </div>

                <div className="flex flex-row gap-4 mt-2 text-sm text-gray-600">
                    <span>{interestedCount} interested</span>
                    <span>{goingCount} going</span>
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

        </div> 
    )
}