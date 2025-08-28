import Leaderboard from "../Leaderboard";
import WelcomeStats from "./WelcomeStats";
import YourEvents from "./YourEvents";
import { useState } from "react";
import EventDetails from "@components/Dashboard/DashboardDiscover/EventDetails";

function DashboardDashboard() {
  const [eventDetails, setEventDetails] = useState<any | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <div className="flex flex-row w-full h-full gap-5 relative">
      {/* width of the gallery */}
      <div className="w-[75%] h-full flex flex-col gap-8">
        <div className="flex-none">
          <WelcomeStats />
        </div>
        <div className="flex-1 shadow-lg rounded-lg overflow-y-auto">
          <YourEvents
            onOpen={(ev) => setEventDetails({
              id: ev.id,
              event_title: ev.event_title,
              description: ev.description || "",
              tasks: "",
              notes: "",
              contact: "",
              tag: [],
              start_date_time: ev.start_date_time,
              end_date_time: ev.end_date_time,
              location: ev.location,
              image: ev.image || "",
              host: ev.host || "",
              coordinates: { longitude: "", latitude: "" }
            })}
            refreshKey={refreshKey}
          />
        </div>
      </div>

      <div className="w-[20%]">
        {/* adjust sizes and stuff as needed */}
        <Leaderboard />
      </div>

      {/* Full content overlay below top bar and left sidebar */}
      {eventDetails && (
        <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none">
          <div className="absolute left-0 right-0 top-0 bottom-0 bg-black/5" />
          <div className="absolute left-[0] right-[0] top-[0] bottom-[0] pointer-events-auto">
            <EventDetails
              event={eventDetails}
              setEventDetails={(v:any)=>{
                const closing = v === null;
                if (closing) {
                  setRefreshKey(k => k + 1);
                }
                setEventDetails(v);
              }}
              onRegistrationChange={()=>{/* defer refresh until close */}}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardDashboard;
