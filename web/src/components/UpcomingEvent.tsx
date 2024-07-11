const UpcomingEvent = () => {
    return (
      <div className="flex justify-between bg-white text-black p-1 mb-0 ml-8 font-light">
        <div className="flex flex-col">
          <p className="text-[15px] mb-0">Launch Night</p>
          <p className="text-[9px] leading-tight m-0">Monday 8th April 2024</p>
          <p className="text-[9px] leading-tight m-0">6:00pm - 8:00pm</p>
          <p className="text-[6px] bg-gray-200 px-2 py-1 rounded-xl mt-1 ml-[0.5rem] mr-[3rem]">Club Event</p>
        </div>
        <div className="flex items-center mx-4">
          <button className="bg-primary rounded-full text-[12px] px-[6.5px] py-[0px] hover:bg-blueButtonHover">&gt;</button>
        </div>
      </div>
    );
  }
  
  export default UpcomingEvent;
  