import { IoIosNotifications } from "react-icons/io";
import NotificationTab from "@components/NotificationTab";
import { useState } from "react";

const DashboardHeader = () => {
  const [isNotificationTabVisible, setNotificationTabVisible] = useState(false);

  const toggleNotificationTab = () => {
    setNotificationTabVisible(!isNotificationTabVisible);
  }

  return (
    <div className="">
      <div className="flex justify-between items-center w-fit gap-8">
        <div className="flex">
          <span className="p-1 rounded-full bg-primary cursor-pointer shadow-lg transform active:scale-[80%] transition-transform" onClick={toggleNotificationTab}>
            <IoIosNotifications className="text-white text-3xl" />
          </span>
        </div>

        <div className="h-12 border border-lightGrey"></div>

        <div className="flex items-center justify-center gap-4">
          <span className="font-medium text-lg">John Doe</span>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile Picture" className="rounded-full w-12 h-auto" />
        </div>
      </div>

      <div className="relative">
        {isNotificationTabVisible && <NotificationTab />}
      </div>

    </div>
  );
}

export default DashboardHeader;