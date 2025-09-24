import { useContext, useEffect, useState } from "react";
import EventsScrollContainer from "../DashboardDiscover/EventsScrollContainer";
import axios from "axios";
import EventDetails from "../DashboardDiscover/EventDetails";
import AuthenticationContext from "../../../context/AuthenticationContext";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
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
  coordinates: { longitude: string; latitude: string };
};

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

function DashboardDiscover() {
  const [eventDetails, setEventDetails] = useState<null | Event>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [flagshipEvent, setFlagshipEvent] = useState<Event>({
    id:"",
    event_title: "",
    description: "",
    tasks: "",
    notes: "",
    contact: "",
    tag: [],
    start_date_time: new Date(),
    end_date_time: new Date(),
    location: "",
    image: "",
    host: "",
    coordinates: { longitude: "", latitude: "" },
  });

  const days = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  let startDate = new Date();

  const [friends, setFriends] = useState<Friend[]>([]);
  const [flagshipFriendsGoing, setFlagshipFriendsGoing] = useState<Friend[]>([]);
  const [flagshipAttendees, setFlagshipAttendees] = useState<any[]>([]);
  const authContext = useContext(AuthenticationContext);
  const { firestoreUserDetails } = authContext as unknown as {firestoreUserDetails: any};

  // Function to fetch attendees of flagship event
  const fetchFlagshipAttendees = async (event: Event) => {
    const eventRef = doc(db, "events", event.id);
    const attendeesQuery = query(
      collection(db, "event_attendance"),
      where("eventId", "==", eventRef),
    )
    const querySnapshot = await getDocs(attendeesQuery);
    const data = querySnapshot.docs.map((doc) => doc.data().uid);
    setFlagshipAttendees(data)
  }

  // Function to fetch the friends going to flagship event
  const fetchFlagshipFriendsGoing = async (event: Event) => {
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
      setFlagshipFriendsGoing(filteredFriends)
    }
  }
  
  const appUrl = import.meta.env.VITE_API_URL;

  // Get friends from backend
  useEffect(() => {
    async function fetchFriends() {
      try {
        const response = await axios.get(`${appUrl}/api/friends/${firestoreUserDetails.uid}`)
        setFriends(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchFriends();
  }, []);


  // Get events from backend
  useEffect(() => {
    async function fetchEventsAndAttendees() {
      try {
        const response = await axios.get(`${appUrl}/api/events`);
        setEvents(response.data);
  
        // Have default flagship event be next upcoming event by sorting events by date and taking the first one
        const sortedEvents = [...response.data].sort((a, b) => {
          return (
            new Date(a.start_date_time).getTime() -
            new Date(b.start_date_time).getTime()
          );
        });
        let flagshipEventToSet = sortedEvents[0];

  
        // Now check if there is a flagship event (tagged as such) and set it as the flagship event
        const flagshipEvent = sortedEvents.find((event) => event.tag.includes("Flagship Event"));
        if (flagshipEvent) {
          flagshipEventToSet = flagshipEvent;
        }
        setFlagshipEvent(flagshipEventToSet);
  
        if (flagshipEvent && friends && friends.length > 0) {
          fetchFlagshipAttendees(flagshipEvent);
          fetchFlagshipFriendsGoing(flagshipEvent);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (friends) {
      fetchEventsAndAttendees();
    }
  }, [friends]);
 
  console.log(flagshipEvent);

  return (
    <div className="flex flex-col w-[96%] relative">
      <div className="flex flex-row bg-white rounded-lg shadow-md h-[45%] cursor-pointer mb-5 items-center p-7">
        <div className="h-full w-[60%]">
          <img
            className="object-cover w-full h-full rounded-lg"
            src={flagshipEvent.image}
          />
        </div>
        <div className="flex flex-col">
          <div className="pl-5 text-2xl font-medium text-primary pt-1">
            This month's event...
          </div>
          <div className="pl-5 pt-3">
            {days[startDate.getDay()] +
              ", " +
              startDate.getDate() +
              " " +
              months[startDate.getMonth()]}
          </div>
          <div className="pl-5 font-medium">{flagshipEvent.event_title}</div>
          <div className="pl-5 font-light">{flagshipEvent.location}</div>
          <div className="flex flex-row pl-5 pt-2 pb-2">
            {/* <div className="ml-5 mt-1 rounded-full bg-slate-400 w-3 h-3"></div> */}
            {/* <div className="ml-2 font-light text-sm">Eduardo is interested</div> */}
            <div className="flex justify-end text-right block text-sm mb-0 items-center">
              {flagshipFriendsGoing.length > 0 &&
                <div className="-space-x-1 mr-2">
                  {flagshipFriendsGoing.slice(0,2).map((friend) => {
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
              {flagshipFriendsGoing.length > 0 ? (
                flagshipFriendsGoing.length === 1
                  ? `${flagshipFriendsGoing[0].firstName}`
                  : flagshipFriendsGoing.length === 2 ? `${flagshipFriendsGoing[0].firstName} and ${flagshipFriendsGoing[1].firstName}`
                  : flagshipFriendsGoing.length === 3 ? `${flagshipFriendsGoing[0].firstName}, ${flagshipFriendsGoing[1].firstName} and 1 other`
                  : `${flagshipFriendsGoing[0].firstName}, ${flagshipFriendsGoing[1].firstName} and ${flagshipFriendsGoing.length - 2} others`
              ) + ` ${flagshipFriendsGoing.length > 1 ? "are" : "is"} going`
                : `${flagshipAttendees.length} going`
              }
            </div>
          </div>
          <div
            className="pl-5 text-primary hover:underline cursor-pointer"
            onClick={() => setEventDetails(flagshipEvent)}
          >
            More Info
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-xl overflow-y-auto">
        {/* adjust sizes and stuff as needed */}
        <EventsScrollContainer
          events={events}
          setEventDetails={setEventDetails}
          friends={friends}
        />
      </div>

        {eventDetails && (
        <EventDetails event={eventDetails} setEventDetails={setEventDetails} />
      )}
      </div>
  );
}

export default DashboardDiscover;
