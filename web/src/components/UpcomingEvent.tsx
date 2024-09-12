const UpcomingEvent = () => {
  return (
    <div className="flex justify-between bg-white text-black mb-8 ml-10 font-light">
      <div className="flex flex-col w-[90%]">
        <div className="h-[100px] w-[100%] bg-slate-400 hover:bg-blue-500 transition-colors duration-300"></div>
        <p className="text-[14px] leading-tight m-0">Mon 11th May | 2pm</p>
        <p className="text-[20px] mb-0">Launch Night</p>
        <p className="text-[14px] leading-tight m-0">
          University of Auckland | General Library
        </p>
      </div>
    </div>
  );
};

export default UpcomingEvent;
