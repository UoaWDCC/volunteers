
type Event = {
  date: string;
  time: string;
  title: string;
  location: string;
  img: string;
};

const UpcomingEvent = ({ event }: { event: Event }) => {
  return (
    <div className="flex flex-col bg-white text-black rounded-xl border-solid border-2 border-slate-100 border p-5">
      <img
        className="w-[30rem] rounded-xl object-cover"
        src={event.img || "./public/assets/dashboard/emptyEventImage.png"}
        alt="event image"
      />
      <p className="text-sm m-0 mt-2">{event.date}</p>
      <h2 className="text-xl font-semibold m-0">{event.title}</h2>
      <p className="text-sm m-0">{event.location}</p>
    </div>
  );
};

export default UpcomingEvent;
