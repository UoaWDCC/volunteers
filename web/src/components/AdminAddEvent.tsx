import React, { useState } from "react";
import { useEventContext } from "../context/EventContext"; // Import the context

const AdminAddEvent = ({ setIsAdding }: any) => {
  const { events, setEvents, addEvent } = useEventContext(); // Get context methods and state

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [tag, setTag] = useState('');

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
        await addEvent(newEvent); // Use the context's addEvent method
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
