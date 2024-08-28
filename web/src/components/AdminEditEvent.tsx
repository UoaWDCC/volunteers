import { useState } from "react";
import { useEventContext } from "../context/EventContext"; 

const AdminEditEvent = ({
  setIsEditing,
}: any) => {
  /**
   * Context
   * - `selectedEvent`: The event object currently selected for editing.
   * - `editEvent`: A function from the event context to handle updating an event in the backend or database.
   */
  const { selectedEvent, editEvent } = useEventContext(); 
  const id = selectedEvent.id;

  /**
   * State to manage the input fields with the current event details
   * - `title`: State for the event title input field, initialized with the current title.
   * - `date`: State for the event date input field, initialized with the current date.
   * - `time`: State for the event time input field, initialized with the current time.
   * - `tag`: State for the event tag input field, initialized with the current tag.
   */
  const [title, setTitle] = useState(selectedEvent.title);
  const [date, setDate] = useState(selectedEvent.date);
  const [time, setTime] = useState(selectedEvent.time);
  const [tag, setTag] = useState(selectedEvent.tag);

  /**
   * Handle form submission for updating an event
   * - Prevents default form behavior.
   * - Creates an updated event object with the current state values.
   * - Calls the `editEvent` function to update the event in the backend.
   * - Closes the edit event form.
   */
  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const updatedEvent = {
      id,
      title,
      date,
      time,
      tag,
    };

    await editEvent(id, updatedEvent); 

    setIsEditing(false);
  };

  return (
    <div className="p-[1rem] ml-[auto] mr-[auto]">
      <form onSubmit={handleUpdate}>
        <h1>Admin Edit Event</h1>

        {/* Event Title Input */}
        <label htmlFor="eventTitle">Event Title: </label>
        <input
          className="bg-lightGrey rounded-[10px] pl-[5px] pr-[5px] mr-[1em] text-black"
          id="eventTitle"
          type="text"
          name="eventTitle"
          placeholder={title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Event Date Input */}
        <label htmlFor="date">Date: </label>
        <input
          className="bg-lightGrey rounded-[10px] pl-[5px] pr-[5px] mr-[1em] text-black"
          id="date"
          type="date"
          name="date"
          placeholder={date}
          value={date}
          required
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Event Time Input */}
        <label htmlFor="eventTime">Event Time: </label>
        <input
          className="bg-lightGrey rounded-[10px] pl-[5px] pr-[5px] mr-[1em] text-black"
          id="eventTime"
          type="time"
          name="eventTime"
          placeholder={time}
          value={time}
          required
          onChange={(e) => setTime(e.target.value)}
        />

        {/* Event Tag Input */}
        <label htmlFor="tag">Event Tag: </label>
        <input
          className="bg-lightGrey rounded-[10px] pl-[1em] pr-[5px] mr-[1em] text-black"
          id="tag"
          type="tag"
          name="tag"
          placeholder={tag}
          value={tag}
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
            Edit
          </button>
          <button
            className="bg-primary hover:bg-blueButtonHover"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditEvent;