function NotificationTab() {
  return (
    <div className="flex flex-row bg-white h-[96vh] w-[400px] m-[2vh_5vh_2vh_3vh]">
      <div className="back">
        <button className="text-black bg-gray-100 rounded-full text-sm py-1 px-2 mt-4 ml-4 mr-4">&gt;</button>
      </div>
      <div className="notifications flex flex-col font-light">
        <p className="font-sans font-normal text-black text-[38px] pt-[4vh] leading-[1.15] ml-4 mt-2">Notifications</p>
        <div className="tabs flex flex-row justify-between ml-2 mr-8 mb-4">
          <div className="all">
            <button className="text-black bg-gray-100 px-3 py-1 text-[11px] rounded-full mr-2 hover:bg-blue-600 hover:text-white hover:bg-[#3C9DDD]">All</button>
          </div>
          <div className="announcements">
            <button className="text-black bg-gray-100 px-3 py-1 text-[11px] rounded-full hover:bg-blue-600 hover:text-white hover:bg-[#3C9DDD]">Announcements</button>
          </div>
          <div className="reminders">
            <button className="text-black bg-gray-100 px-3 py-1 text-[11px] rounded-full ml-2 hover:bg-blue-600 hover:text-white hover:bg-[#3C9DDD]">Reminders</button>
          </div>
        </div>
        
        <p className="text-[12px] ml-4 mt-3 mb-3">
          <strong>WooHoo! You've reached a milestone!</strong>
          <br/>
          <p className="text-[9px]">Posted 20 mins ago</p>
        </p>
        
        <div className="notification flex flex-row justify-between ml-4 mb-4">
          <div className="notification-info">
            <p className="notification-name text-[12px] mb-0 font-[450]">Launch Night</p>
            <p className="text-[9px] m-0 leading-[1.2]">Monday 8th April 2024</p>
            <p className="text-[9px] m-0 leading-[1.2]">6:00pm - 8:00pm</p>
            <p className="text-[9px] ml-2 mr-8 leading-[1.2] bg-gray-100 px-2 p-1 mt-1 rounded-xl font-light">Club Event</p>
          </div>
          <div className="button flex justify-center mt-4 mr-10">
            <button className="bg-[#3C9DDD] rounded-full text-[xx-small] h-5 w-5 py-1 px-1 hover:bg-blue-300">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationTab;
