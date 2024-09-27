interface NotificationTabProps {
  toggleNotificationTab: () => void;
}
import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import DashboardAnnouncements from "./DashboardAnnouncements/DashboardAnnouncements";

const colref = collection(db, 'Announcements')

function NotificationTab({ toggleNotificationTab }: NotificationTabProps) {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [showAnnouncements, toggleShowAnnouncements] = useState(false);
  
  useEffect(() => {
    getDocs(colref)
      .then((snapshot) => {
        let getAnnouncements: any[] = [];
        snapshot.docs.forEach((doc) => {
          getAnnouncements.push({ ...doc.data(), id: doc.id });
        });
        console.log(getAnnouncements); 
        setAnnouncements(getAnnouncements);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="absolute flex flex-row bg-white h-[96vh] w-[400px] shadow-lg top-2 right-4">
      <div>
        <button className="text-black bg-gray-100 rounded-full text-sm py-1 px-2.5 mt-4 ml-4 mr-4 hover:text-white hover:bg-primary" onClick={toggleNotificationTab}>&gt;</button>
      </div>
      <div className="flex flex-col font-light">
        <p className="font-sans font-medium text-black text-[38px] pt-[4vh] leading-[1.15] ml-4 mt-2">Notifications</p>
        <div className="flex flex-row justify-between ml-2 mr-8 mb-4">
          <button className="text-black font-medium bg-gray-100 px-3 py-1 text-[11px] rounded-full mr-2 hover:text-white hover:bg-primary" onClick={()=>{toggleShowAnnouncements(false)}}>All</button>
          <button className="text-black font-medium bg-gray-100 px-3 py-1 text-[11px] rounded-full hover:text-white hover:bg-primary" onClick={()=>{toggleShowAnnouncements(true)}}>Announcements</button>
          <button className="text-black font-medium bg-gray-100 px-3 py-1 text-[11px] rounded-full ml-2 hover:text-white hover:bg-primary" onClick={()=>{toggleShowAnnouncements(false)}}>Reminders</button>
        </div>
        <div>
          {showAnnouncements && <DashboardAnnouncements announcements={announcements}/>}
        </div>
      </div>
    </div>
  );
}

export default NotificationTab;
