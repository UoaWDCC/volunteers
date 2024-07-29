import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const AdminEditEvent = ({
  events,
  selectedEvent,
  setEvents,
  setIsEditing,
  getEvents
}: any) => {
  const id = selectedEvent.id;

  const [title, setTitle] = useState(selectedEvent.title);
  const [date, setDate] = useState(selectedEvent.date);
  const [time, setTime] = useState(selectedEvent.time);
  const [tag, setTag] = useState(selectedEvent.tag);

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const event = {
      id,
      title,
      date,
      time,
      tag,
    };

    await setDoc(doc(db, "events", id), {
      ...event,
    });

    setEvents(events);
    setIsEditing(false);
    getEvents();
  };

  return (
    
      <div className="p-[1rem] ml-[auto] mr-[auto]">
        <form onSubmit={handleUpdate}>
          <h1>Admin Edit Event</h1>

          <label htmlFor="eventTitle">Event Title: </label>
          <input
            className="bg-lightGrey rounded-[10px] pl-[5px] pr-[5px] mr-[1em] text-grey"
            id="eventTitle"
            type="text"
            name="eventTitle"
            placeholder={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="date">Date: </label>
          <input
            className="bg-lightGrey rounded-[10px] pl-[5px] pr-[5px] mr-[1em] text-grey"
            id="date"
            type="date"
            name="date"
            placeholder={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />

          <label htmlFor="eventTime">Event Time: </label>
          <input
            className="bg-lightGrey rounded-[10px] pl-[5px] pr-[5px] mr-[1em] text-grey"
            id="eventTime"
            type="time"
            name="eventTime"
            placeholder={time}
            required
            onChange={(e) => setTime(e.target.value)}
          />

          <label htmlFor="tag">Event Tag: </label>
          <input
            className="bg-lightGrey rounded-[10px] pl-[1em] pr-[5px] mr-[1em] text-grey"
            id="tag"
            type="tag"
            name="tag"
            placeholder={tag}
            required
            onChange={(e) => setTag(e.target.value)}
          />

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
              type="submit"
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
