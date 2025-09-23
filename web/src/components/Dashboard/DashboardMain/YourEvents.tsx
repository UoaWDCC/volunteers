import { useContext, useEffect, useMemo, useState } from "react";
import AuthenticationContext from "../../../context/AuthenticationContext";
import { getFirestore, collection, query, where, getDocs, doc, addDoc, serverTimestamp, type DocumentReference, type Timestamp } from "firebase/firestore";
import CloseThumbsUpSuccessPopup from "@components/Dashboard/dashboardProfile/CloseThumbsUpSuccessPopup";

type EventItem = {
  id: string;
  event_title: string;
  start_date_time: Date;
  end_date_time: Date;
  location: string;
  description?: string;
  image?: string;
  host?: string;
};

type EventDoc = {
  event_title: string;
  start_date_time: Timestamp;
  end_date_time: Timestamp;
  location: string;
  description?: string;
  image?: string;
  host?: string;
};

type AttendanceDoc = {
  eventId?: DocumentReference;
  uid?: DocumentReference;
  timestamp?: Timestamp;
};

type EventRowProps = {
    event: EventItem;
    action?: React.ReactNode;
    variant?: 'upcoming' | 'previous';
    onOpen?: (e: EventItem) => void;
  };

function EventRow({ event, action, variant = 'upcoming', onOpen }: EventRowProps) {
  const start = event.start_date_time;
  const weekday = start.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const day = start.getDate();
  const month = start.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const year = start.getFullYear();
  const h12 = start.getHours() % 12 || 12;
  const m = start.getMinutes();
  const ampm = start.getHours() >= 12 ? 'PM' : 'AM';
  const dateStr = `${weekday}, ${day} ${month} ${year} AT ${h12}${m ? ':' + m : ''}${ampm}`;

  const rowMinH = "min-h-[152px]";
  const cardBase = "my-4 rounded-2xl w-full transition ease-in duration-100 px-6 py-5";
  const cardUpcoming = "bg-[#F7F7FB] hover:translate-y-0.5 hover:bg-white rounded-xl border-solid hover:shadow-sm";
  const cardPrevious = "bg-[#D9D9D9]";

  return (
    <div className={`${cardBase} ${rowMinH} ${variant === 'previous' ? cardPrevious : cardUpcoming} cursor-pointer`} onClick={() => onOpen && onOpen(event)}>
      {/* 3 columns: image | text | host+button (top-aligned) */}
      <div className="grid grid-cols-[160px,minmax(0,1fr),200px] items-center gap-6">
        {/* Left: image (top alignment baseline) */}
        <img
          loading="lazy"
          className="h-28 w-40 object-cover rounded-lg"
          src={event.image || "/assets/dashboard/emptyEventImage.png"}
          alt=""
        />

        {/* Middle: date / title / location */}
        <div className="min-w-0 translate-y-[4px]">
          <p className="text-sm font-medium leading-none mb-2 truncate">
            {dateStr}
          </p>

          <h2 className="text-2xl font-semibold leading-tight mb-1 truncate">
            {event.event_title}
          </h2>

          <p className="text-sm text-gray-700 mt-2 truncate">
            {event.location}
          </p>
        </div>

        {/* Right: host on top, fixed-size button below; */}
        <div className="min-w-[200px] self-start mt-[15px] grid grid-rows-[auto_auto] gap-4 justify-items-end">
          {event.host && (
            <div className="text-gray-800 font-semibold leading-none max-w-[200px] truncate text-right">
              {event.host}
            </div>
          )}
          <div className="row-start-2" onClick={(e) => e.stopPropagation()}>
            {action}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function YourEvents({ onOpen, refreshKey = 0 }: { onOpen?: (e: any) => void; refreshKey?: number; }) {
  const [userEvents, setUserEvents] = useState<EventItem[]>([]);
  // All events from Firestore (same source as UpcomingEvents.tsx)
  const [allEvents, setAllEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const authContext = useContext(AuthenticationContext);
  const { uid } = (authContext as unknown) as { uid: string };
  const db = getFirestore();

  useEffect(() => {
    if (uid) {
      fetchUserEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, refreshKey]);

  // Also load all events independently so suggestions are available
  useEffect(() => {
    fetchAllEvents();
  }, [refreshKey]);

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("uid", "==", uid));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        setUserEvents([]);
        setLoading(false);
        return;
      }

      const userDocId = userSnapshot.docs[0].id;

      const attendanceRef = collection(db, "event_attendance");
      const attendanceQuery = query(
        attendanceRef,
        where("uid", "==", doc(db, "users", userDocId))
      );
      const attendanceSnapshot = await getDocs(attendanceQuery);

      if (attendanceSnapshot.empty) {
        setUserEvents([]);
        setLoading(false);
        return;
      }

      const eventsRef = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsRef);

      const all: EventItem[] = [];
      eventsSnapshot.forEach((d) => {
        const data = d.data() as EventDoc;
        all.push({
          id: d.id,
          event_title: data.event_title,
          start_date_time: data.start_date_time.toDate(),
          end_date_time: data.end_date_time.toDate(),
          location: data.location,
          description: data.description,
          image: data.image,
          host: data.host,
        });
      });

      const registered = all.filter((event) =>
        attendanceSnapshot.docs.some((attendance) => {
          const att = attendance.data() as AttendanceDoc;
          return att.eventId?.path?.includes(event.id);
        })
      );

      setUserEvents(registered);
      setAllEvents(all);
    } catch (err) {
      console.error("Error fetching user events:", err);
      setError("Failed to load your events");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (eventId: string) => {
    try {
      // find users doc id by uid
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("uid", "==", uid));
      const userSnapshot = await getDocs(userQuery);
      if (userSnapshot.empty) return;
      const userDocId = userSnapshot.docs[0].id;

      // check if already registered
      const attendanceRef = collection(db, "event_attendance");
      const existsQ = query(
        attendanceRef,
        where('eventId', '==', doc(db, 'events', eventId)),
        where('uid', '==', doc(db, 'users', userDocId))
      );
      const existsSnap = await getDocs(existsQ);
      if (existsSnap.empty) {
        await addDoc(attendanceRef, {
          eventId: doc(db, 'events', eventId),
          uid: doc(db, 'users', userDocId),
          timestamp: serverTimestamp(),
        });
      }

      // refresh to reflect new registration and show success popup
      await fetchUserEvents();
      await fetchAllEvents();
      setShowSuccess(true);
    } catch (e) {
      console.error('Sign up failed', e);
    }
  };

  // Fetch all events directly from Firestore (mirrors UpcomingEvents.tsx source)
  const fetchAllEvents = async () => {
    try {
      const eventsRef = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsRef);
      const all: EventItem[] = [];
      eventsSnapshot.forEach((d) => {
        const data = d.data() as EventDoc;
        all.push({
          id: d.id,
          event_title: data.event_title,
          start_date_time: data.start_date_time.toDate(),
          end_date_time: data.end_date_time.toDate(),
          location: data.location,
          description: data.description,
          image: data.image,
          host: data.host,
        });
      });
      setAllEvents(all);
    } catch (e) {
      console.error("Failed to load all events for suggestions", e);
      setAllEvents([]);
    }
  };

  const { upcoming, previous } = useMemo(() => {
    const now = new Date();
    const up = userEvents
      .filter((e) => e.start_date_time >= now)
      .sort((a, b) => a.start_date_time.getTime() - b.start_date_time.getTime());
    const prev = userEvents
      .filter((e) => e.start_date_time < now)
      .sort((a, b) => b.start_date_time.getTime() - a.start_date_time.getTime());
    return { upcoming: up, previous: prev };
  }, [userEvents]);

  const suggestedUpcoming = useMemo(() => {
    const now = new Date();
    return allEvents
      .filter((e) => e.start_date_time >= now)
      .slice(0, 2);
  }, [allEvents]);

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-white font-light items-center justify-center">
        <p className="text-gray-600">Loading your events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full bg-white font-light items-center justify-center">
        <p className="text-red-600 mb-2">{error}</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={fetchUserEvents}>Try again</button>
      </div>
    );
  }

  const noUpcoming = upcoming.length === 0;
  const noPrevious = previous.length === 0;

  return (
    <div className="flex flex-col h-full bg-white font-light rounded-xl overflow-hidden">
      {/* Header bar */}
      <div className="w-full h-[74px] bg-[#3B87DD] flex items-center px-5">
        <div className="text-white text-xl font-semibold">Your volunteer events</div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-5 scrollbar-none">
        {/* Upcoming section header or empty-state tip */}
        {noUpcoming ? (
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-700 font-medium">No upcoming events. See <span className="font-semibold">suggested</span> events</div>
            <a className="text-gray-700 underline text-xs cursor-pointer font-medium" onClick={()=>window.dispatchEvent(new CustomEvent('switch-tab', { detail: { tab: 2 } }))}>See all</a>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-3">
            <div className="text-base font-semibold text-gray-800">Upcoming events</div>
            <a className="text-gray-700 underline text-xs cursor-pointer font-medium" onClick={()=>window.dispatchEvent(new CustomEvent('switch-tab', { detail: { tab: 2 } }))}>See all</a>
          </div>
        )}

        {/* Upcoming list or suggested */}
        {noUpcoming ? (
        <div className="mb-6 w-full">
            {suggestedUpcoming.map((e) => (
            <EventRow
                key={e.id}
                event={e}
                onOpen={onOpen}
                action={
                  <button className="px-8 py-1.5 rounded-full border-primary border-solid text-primary font-medium bg-white text-xs hover:bg-gray-50" onClick={(ev)=>{ ev.stopPropagation(); handleSignUp(e.id); }}>Sign up</button>
                }
            />
            ))}
        </div>
        ) : (
        <div className="mb-6">
            {upcoming.map((e) => <EventRow key={e.id} event={e} onOpen={onOpen} />)}
        </div>
        )}

        {/* Previous */}
        <div className="mt-1 mb-3">
          <div className="flex items-center justify-between mt-1 mb-3">
            <div className="text-base font-semibold text-gray-800">Previous events</div>
            {!noPrevious && (
              <a className="text-gray-700 underline text-xs cursor-pointer font-medium" onClick={()=>window.dispatchEvent(new CustomEvent('switch-tab', { detail: { tab: 2 } }))}>See all</a>
            )}
          </div>

            {noPrevious ? (
            <div className="my-4 rounded-2xl w-full px-6 py-5 min-h-[152px] font-normal bg-[#F4F4F4] flex items-center justify-center">
                No events
            </div>
           ) : (
             previous.map((e) => 
                 <EventRow key={e.id} event={e} variant="previous" onOpen={onOpen}
                     action={
                       <button className="px-6 py-2 rounded-full bg-[#3B87DD] text-white text-sm font-semibold hover:brightness-110">
                         Validate
                       </button>
                     }/>
             )
           )}
        </div>
      </div>

      {/* Success popup with blurred background */}
      {showSuccess && (
        <div className="fixed inset-0 z-[999]">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <CloseThumbsUpSuccessPopup onClose={() => setShowSuccess(false)} />
        </div>
      )}
    </div>
  );
}


