import UpcomingEvent from "./UpcomingEvent";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const colref = collection(db, 'events')

const UpcomingEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  
  useEffect(() => {
    getDocs(colref)
      .then((snapshot) => {
        let getEvents: any[] = [];
        snapshot.docs.forEach((doc) => {
          getEvents.push({ ...doc.data(), id: doc.id });
        });
        console.log(getEvents); 
        setEvents(getEvents);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  
  // Sort events by start date and slice to get only the first 4 events
  const firstFourEvents = events
    .sort((a, b) => a.start_date_time - b.end_date_time)
    .slice(0, 4);

  return (
    <div className="flex flex-col bg-white mt-5 rounded-[30px] font-light h-full">
      <div>
        <p className="text-black text-[38px] leading-[1.15] pl-8 pt-2 m-0 font-semibold">
          Upcoming Events
        </p>
        <p className="text-black text-[14px] leading-[1.15] pl-8 pt-4 pb-5 m-0">
          See what's going on!
        </p>
      </div>
      <div className="flex-grow overflow-auto ml-5">
        <div className="grid grid-cols-2 gap-5">
          {/*}
          <UpcomingEvent event={event_test_one} />
          <UpcomingEvent event={event_test_six} />
          <UpcomingEvent event={event_test_three} />
          <UpcomingEvent event={event_test_four} />
          <UpcomingEvent event={event_test_five} />
          <UpcomingEvent event={event_test_two} />*/}
          {/*}
          {events.map((event: any) => (
            <UpcomingEvent event={event} />
          ))}
            */}
          {firstFourEvents.length > 0 ? (
            firstFourEvents.map((event) => (
              <UpcomingEvent event={event} />
            ))
          ) : (
            <p>No upcoming events to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
