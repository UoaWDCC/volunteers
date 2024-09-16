import { useState } from "react";
import { useEventContext } from "../../context/EventContext"; 

const AdminAddEvent = ({ setIsAdding }: any) => {
  /**
   * Context
   * - `events`: An array of event objects retrieved from the event context.
   * - `setEvents`: A function to update the list of events with a new event.
   * - `addEvent`: A function to add a new event to the backend or database.
   */
  const { events, setEvents, addEvent } = useEventContext(); 

  /**
   * State to manage the input fields in the form
   * - `title`: State for the event title input field.
   * - `date`: State for the event date input field.
   * - `time`: State for the event time input field.
   * - `tag`: State for the event tag input field.
   */
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [tag, setTag] = useState('');

  /**
   * Handle form submission for adding a new event
   * - Prevents default form behavior.
   * - Confirms with the user if they want to add the event.
   * - Creates a new event object and adds it to the backend.
   * - Updates the `events` state with the new event.
   * - Closes the add event form.
   */
  const handleAdd = async (e: any) => {
    e.preventDefault();
    const confirmAdd = window.confirm("Are you sure want to add this event?");

    if (confirmAdd) {
      const newEvent = {
        title,
        date,
        time,
        tag,
      };

      try {
        await addEvent(newEvent); 
        setEvents([...events, newEvent]);
      } catch (error) {
        console.log(error);
      }

      setIsAdding(false);
    }
  };

  return (
    <div className="p-[1rem] ml-[auto] mr-[auto]">
      <form onSubmit={handleAdd}>
        <h1>Admin Add Event</h1>

        {/* Event Title Input */}
        <label htmlFor="eventTitle">Event Title: </label>
        <input
          className="bg-lightGrey rounded-[10px] pl-[5px] pr-[5px] mr-[1em] text-grey"
          id="eventTitle"
          type="text"
          name="eventTitle"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Event Date Input */}
        <label htmlFor="date">Date: </label>
        <input
          className="bg-lightGrey rounded-[10px] pl-[5px] pr-[5px] mr-[1em] text-grey"
          id="date"
          type="date"
          name="date"
          placeholder="Date"
          required
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Event Time Input */}
        <label htmlFor="eventTime">Event Time: </label>
        <input
          className="bg-lightGrey rounded-[10px] pl-[5px] pr-[5px] mr-[1em] text-grey"
          id="eventTime"
          type="time"
          name="eventTime"
          placeholder="Time"
          required
          onChange={(e) => setTime(e.target.value)}
        />

        {/* Event Tag Input */}
        <label htmlFor="tag">Event Tag: </label>
        <input
          className="bg-lightGrey rounded-[10px] pl-[1em] pr-[5px] mr-[1em] text-grey"
          id="tag"
          type="tag"
          name="tag"
          placeholder="Tag"
          required
          onChange={(e) => setTag(e.target.value)}
        />

        {/* Form Buttons */}
        <div style={{ marginTop: "30px" }}>
          <button
            className="bg-primary hover:bg-blueButtonHover mr-[1em]"
            type="submit"
            value="Add"
          >
            Add
          </button>
          <button
            className="bg-primary hover:bg-blueButtonHover"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddEvent;