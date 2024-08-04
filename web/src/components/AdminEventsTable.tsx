import AdminHeader from "./AdminHeader";
import { useState, useEffect } from "react";

const AdminEventsTable = ({event, setEvents, setIsAdding, handleDelete, handleEdit, getEvents}:any) => {
    const [sortOption, setSortOption] = useState('none');
    const handleSortChange = (event:any) => {
      setSortOption(event.target.value);
    };  

    useEffect(() => {
      const sortEvents = () => {
          let sortedEvents = [...event]; // Create a copy of the array
          if (sortOption === 'date-ascending') {
              sortedEvents.sort((a, b) => a.date.localeCompare(b.date));
          } else if (sortOption === 'date-descending') {
              sortedEvents.sort((a, b) => b.date.localeCompare(a.date));
          } else if (sortOption === 'title-ascending'){
              sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
          } else if (sortOption === 'title-descending'){
              sortedEvents.sort((a, b) => b.title.localeCompare(a.title));
          } else if (sortOption === 'none') {
              getEvents(); // Fetch and set the original events
              return;
          }
          setEvents(sortedEvents); // Update the state with sorted events
      };
      
      sortEvents();
  }, [sortOption, event, setEvents, getEvents]);

    return (
      <div>
        <AdminHeader setIsAdding={setIsAdding}/>
        {/*<AdminSortEvents event={event} setEvents={setEvents}/>*/}
        <div className="flex">
          <div className="ml-[1em]">
            Sort By:
          </div>
          <div className="ml-[1em]">
            <select onChange={handleSortChange}>
              <option value="none">None</option>
              <option value="date-ascending">Date: Ascending</option>
              <option value="date-descending">Date: Descending</option>
              <option value="title-ascending">Title: Ascending</option>
              <option value="title-descending">Title: Descending</option>
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
          {event.length > 0 ? (
            event.map((event:any) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.tag} </td>
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
                    onClick={() => handleDelete(event.id)}
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
                {event.length == 0 ? <td colSpan={7}>No Events</td> : <td colSpan={7}>Events Loading . . .</td>}
            </tr>
          )}
        </tbody>
      </table>
      </div>
    )
}

export default AdminEventsTable;