const UpcomingEvent = ({ event }: any) => {
  const startTimestamp = event.start_date_time;
  const startDate = startTimestamp.toDate();
  //const endTimestamp = event.end_date_time;
  //const endDate = endTimestamp.toDate();

  return (
    <div className="flex flex-col bg-white text-black rounded-xl pl-10 pt-5 border-solid border-2 border-slate-100 mr-[1em]">
      <img
        className="h-200 w-[90%] rounded-[10px] object-cover mt-[5%]"
        src={event.image || "./public/assets/dashboard/emptyEventImage.png"}
        alt="event image"
      />
      <p className="text-sm mt-[1em]">
        Date: {startDate.toLocaleDateString("en-US")}
      </p>
      <h2 className="text-xl font-semibold">{event.event_title}</h2>
      <p className="text-sm">{event.location}</p>
    </div>
  );
};

export default UpcomingEvent;
