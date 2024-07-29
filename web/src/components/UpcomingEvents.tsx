import UpcomingEvent from './UpcomingEvent';

const UpcomingEvents = () => {
  return (
    <div className="flex flex-col bg-white h-[96vh] w-[275px] m-[2vh_5vh_2vh_3vh] rounded-[30px] font-light">
      <div className="ml-4 mt-2">
        <p className="text-black text-[38px] leading-[1.15] pl-8 pt-[4vh] m-0 font-semibold">Upcoming Events</p>
        <p className="text-black text-[17px] leading-[1.15] pl-8 pt-4 pb-5 m-0">See what's going on!</p>
      </div>
      <div className="flex flex-col justify-between mb-[20%] overflow-scroll ml-4 mr-4">
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
        <UpcomingEvent />
      </div>
    </div>
  );
}

export default UpcomingEvents;
