import React from "react";

type Event = {
  date: string;
  time: string;
  title: string;
  location: string;
  img: string;
};

const UpcomingEvent = ({ event }: { event: Event }) => {
  return (
    <div className="flex flex-col bg-white text-black">
      <img
        className="h-200 w-[80%] bg-grey rounded-[10px] object-cover"
        src={event.img || "./public/assets/dashboard/emptyEventImage.png"}
        alt="event image"
      />
      <p className="text-sm">{event.date}</p>
      <h2 className="text-xl font-semibold">{event.title}</h2>
      <p className="text-sm">{event.location}</p>
    </div>
  );
};

export default UpcomingEvent;
