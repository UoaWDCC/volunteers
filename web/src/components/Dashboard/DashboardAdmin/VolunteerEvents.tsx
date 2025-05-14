import EventCard from "./EventCard";
import { useEventContext } from "../../../context/EventContext";

const VolunteerEvents: React.FC = () => {
  const { events } = useEventContext();

  return (
    <div className="p-6 flex flex-col bg-white shadow-lg rounded-xl gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-3">
          <h2 className="font-bold text-blue-600">Volunteer Events</h2>
          <a href="#" className="text-sm text-blue-400 hover:underline">See All Events</a>
        </div>
        <button className="rounded-full">Create Event</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[9pt]">
        <span className="text-gray-500">🔍 Search</span>
        <span className="text-gray-500">🧰 Filter by:</span>
        {["Duration", "Impact Area", "Year Level", "Extras"].map((filter) => (
          <button key={filter} className="stroked rounded-full px-3 py-1 text-xs whitespace-nowrap">
            {filter}
          </button>
        ))}
      </div>

      {/* Event List */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[70vh]">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ):(
          <p className="text-sm text-gray-400">No events available.</p>
        )}
      </div>

    </div>
  );
};

export default VolunteerEvents;