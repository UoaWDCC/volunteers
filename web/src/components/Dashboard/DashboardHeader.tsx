import { IoIosNotifications } from "react-icons/io";
import NotificationTab from "@components/Dashboard/NotificationTab";
import { useState } from "react";
import { useAuth } from '../../context/AuthenticationContextProvider'; 

const DashboardHeader = () => {
  const [isNotificationTabOpen, setNotificationTabOpen] = useState(false);
  const [isNotificationTabVisible, setNotificationTabVisible] = useState(false);
  
  const auth = useAuth();
  if (!auth) return null; // or render fallback UI if needed

  // Show full name only if both first and last names are available.
  // If either is missing, show an empty string.
  const displayName =
    auth.firstName && auth.lastName
      ? `${auth.firstName} ${auth.lastName}`
      : "";

  const toggleNotificationTab = () => {
    if (isNotificationTabOpen) {
      setNotificationTabOpen(false);
      setTimeout(() => setNotificationTabVisible(false), 800)
    } else {
      setNotificationTabVisible(true);
      setNotificationTabOpen(true)
    }
  };

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
          <span className="font-medium text-lg">{displayName}</span> 
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile Picture" className="rounded-full w-12 h-auto"/>
        </div>
      </div>

      <div className={`relative transform transition-transform z-50 ${isNotificationTabOpen ? 'translate-x-0 duration-[400ms]' : 'translate-x-[32rem] duration-[800ms]'}`}>
        {isNotificationTabVisible && <NotificationTab toggleNotificationTab={toggleNotificationTab} />}
      </div>
    </div>
  );
}

export default DashboardHeader;