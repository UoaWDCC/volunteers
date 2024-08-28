import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import { useEventContext } from "../context/EventContext"; // Import the context

const AdminEventsTable = ({ setIsAdding, handleEdit }: any) => {
  const { events, setEvents, fetchEvents, deleteEvent } = useEventContext(); // Get context methods and state
  const [sortOption, setSortOption] = useState('none');

  const handleSortChange = (event: any) => {
    setSortOption(event.target.value);
  };

  useEffect(() => {
    const sortEvents = () => {
      let sortedEvents = [...events]; // Create a copy of the array
      if (sortOption === 'date-ascending') {
        sortedEvents.sort((a, b) => a.date.localeCompare(b.date));
      } else if (sortOption === 'date-descending') {
        sortedEvents.sort((a, b) => b.date.localeCompare(a.date));
      } else if (sortOption === 'title-ascending') {
        sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOption === 'title-descending') {
        sortedEvents.sort((a, b) => b.title.localeCompare(a.title));
      } else if (sortOption === 'tag') {
        sortedEvents.sort((a, b) => a.tag.localeCompare(b.tag));
      } else if (sortOption === 'none') {
        fetchEvents(); // Fetch and set the original events
        return;
      }
      setEvents(sortedEvents); // Update the state with sorted events
    };

    sortEvents();
  }, [sortOption, events, setEvents, fetchEvents]);

  return (
    <div>
      <AdminHeader setIsAdding={setIsAdding} />
      {/*<AdminSortEvents event={event} setEvents={setEvents}/>*/}
      <div className="flex">
        <div className="ml-[1em]">Sort By:</div>
        <div className="ml-[1em]">
          <select onChange={handleSortChange}>
            <option value="none">None</option>
            <option value="date-ascending">Date: Ascending</option>
            <option value="date-descending">Date: Descending</option>
            <option value="title-ascending">Title: Ascending</option>
            <option value="title-descending">Title: Descending</option>
            <option value="tag">Tag</option>
          </select>
        </div>
      </div>

      <table className="striped-table min-w-full border-4 m-[1rem]">
        <thead className="border-4">
          <tr className="">
            <th>Event Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Tag</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {events.length > 0 ? (
            events.map((event: any) => (
              <tr key={event.id}>
                <td className="text-center">{event.title}</td>
                <td className="text-center">{event.date}</td>
                <td className="text-center">{event.time}</td>
                <td className="text-center">{event.tag}</td>
                <div className="flex flex-row justify-between w-[80%]">
                  <td className="flex-1 flex justify-center">
                    <button
                      onClick={() => handleEdit(event.id)}
                      className="button muted-button bg-primary hover:bg-blueButtonHover"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="flex-1 flex justify-center">
                    <button
                      onClick={() => deleteEvent(event.id)} // Use context's deleteEvent method
                      className="button muted-button bg-primary hover:bg-blueButtonHover"
                    >
                      Delete
                    </button>
                  </td>
                </div>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Events Loading . . .</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEventsTable;
