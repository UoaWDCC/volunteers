import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";

type Event = {
    id: string;
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
    coordinates: { longitude: string, latitude: string };
}

type Friend = {
    id: string;
    dietaryRequirements: string[];
    firstName: string;
    yearLevel: string;
    upi: string;
    uid: string;
    email: string;
    role: string;
    emergencyContactFirstName: string;
    gender: string;
    hours: number;
    emergencyContactRelationship: string;
    emergencyContactLastName: string;
    otherRequirements: string;
    birthdate: string;
    mobile: string;
    driversLicense: string;
    lastName: string;
    emergencyContactMobile: string;
    profile_picture: string;
};

interface EventProps {
    event: Event;
    setEventDetails: Dispatch<SetStateAction<null | Event>>;
    friends?: Friend[];
}

export default function Event({ event, setEventDetails, friends }: EventProps) {
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

    const [friendsGoing, setFriendsGoing] = useState<Friend[]>([]);
    const [attendees, setAttendees] = useState<any[]>([]);

    useEffect(() => {
        const fetchAttendees = async () => {
            try {
                const eventRef = doc(db, "events", event.id);
                const attendeesQuery = query(
                    collection(db, "event_attendance"),
                    where("eventId", "==", eventRef),
                )
                const querySnapshot = await getDocs(attendeesQuery);
                const data = querySnapshot.docs.map((doc) => doc.data().uid);
                setAttendees(data)
            } catch (error) {
                console.error(error);
            }
        }

        const fetchFriendsGoing = async () => {
            try {
                const eventRef = doc(db, "events", event.id);
                const friendRefs = friends?.map(friend => doc(db, "users", friend.id));
                const attendeesQuery = query(
                    collection(db, "event_attendance"),
                    where("eventId", "==", eventRef),
                    where("uid", "in", friendRefs)
                )
                const querySnapshot = await getDocs(attendeesQuery);
                const data = querySnapshot.docs.map((doc) => doc.data());
                const friendsGoingIds = data.map((doc) => doc.uid.id);
                const filteredFriends = friends?.filter(friend => friendsGoingIds.includes(friend.id));
                if (filteredFriends) {
                    setFriendsGoing(filteredFriends)
                }
            } catch (error) {
                console.error(error);
            }
        }
        
        if (friends && friends.length > 0) {
            fetchFriendsGoing();
            fetchAttendees();
        }
    }, [event, friends]);

    return (
        <div onClick={() => setEventDetails(event)} className="dashboard bg-white-background transition transform hover:translate-y-0.5 hover:bg-white hover:shadow-sm ease-in duration-100 items-center m-4 flex rounded-xl cursor-pointer"> {/* event-container */}
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
                <div className="flex flex-col">
                    <p className="text-right block text-xs m-0">30 interested</p>

                    <div className="flex justify-end text-right block text-xs mb-0 items-center">
                        {friendsGoing.length > 0 &&
                            <div className="-space-x-1 mr-2">
                                {friendsGoing.map((friend) => {
                                    return (
                                        <img
                                            key={`${friend.firstName}-profile-picture`}
                                            alt={`${friend.firstName}-profile-picture`}
                                            src={friend.profile_picture ? friend.profile_picture : "assets/profile_placeholder.png"}
                                            className="inline-block size-4 rounded-full outline outline-[0.5px] outline-gray-500"
                                        />
                                    )
                                })}
                            </div>
                        }
                        {friendsGoing.length > 0 ? (
                             friendsGoing.length === 1
                                ? `${friendsGoing[0].firstName}`
                                : friendsGoing.length === 2 ? `${friendsGoing[0].firstName} and ${friendsGoing[1].firstName}`
                                : friendsGoing.length === 3 ? `${friendsGoing[0].firstName}, ${friendsGoing[1].firstName} and 1 other`
                                : `${friendsGoing[0].firstName}, ${friendsGoing[1].firstName} and ${friendsGoing.length - 2} others`
                            ) + ` ${friendsGoing.length > 1 ? "are" : "is"} going`
                            : `${attendees.length} going`
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}