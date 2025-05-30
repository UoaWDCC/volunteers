import EventCard from "./EventCard";
import { useEventContext } from "../../../context/EventContext";

const VolunteerEvents: React.FC = () => {
  const { events } = useEventContext();

  return (
    <div className="p-6 flex flex-col bg-white shadow-lg rounded-xl gap-6 h-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-3">
          <h2 className="font-bold text-primary">Volunteer Events</h2>
          <a href="#" className="text-sm text-primary hover:underline">See All Events</a>
        </div>
        <button className="rounded-full">Create Event</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[9pt]">

        <button className="flex items-center gap-2 bg-transparent text-primary hover:underline">
          <img
            src="/assets/dashboard/admin/search.png"
            className="w-4 h-4"/>
          <span>Search</span>
        </button>

        <button className="flex items-center gap-2 bg-transparent text-primary hover:underline">
          <img
            src="/assets/dashboard/admin/filter.png"
            className="w-4 h-4"/>
          <span>Filter by</span>
        </button>

        {["Duration", "Impact Area", "Year Level", "Extras"].map((filter) => (
          <button key={filter} className="stroked rounded-full px-3 py-1 text-xs whitespace-nowrap">
            {filter}
          </button>
        ))}
      </div>

      {/* Event List */}
      <div className="flex flex-col overflow-y-auto max-h-[70vh] overflow-hidden">
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