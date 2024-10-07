const UpcomingEvent = ({ event }: any) => {
  const startTimestamp = event.start_date_time;
  const startDate = startTimestamp.toDate();
  //const endTimestamp = event.end_date_time;
  //const endDate = endTimestamp.toDate();

  return (
    <div className="flex flex-col bg-white text-black rounded-xl border-solid border-2 border-slate-100 border p-5">
      <img
        className="w-[30rem] rounded-xl object-cover"
        src={event.image || "./public/assets/dashboard/emptyEventImage.png"}
        alt="event image"
      />
      <p className="text-sm m-0 mt-2">
        Date: {startDate.toLocaleDateString("en-US")}
      </p>
      <h2 className="text-xl font-semibold m-0">{event.event_title}</h2>
      <p className="text-sm m-0">{event.location}</p>
    </div>
  );
};

export default UpcomingEvent;
