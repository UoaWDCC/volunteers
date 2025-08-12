import { IoIosNotifications } from "react-icons/io";
import NotificationTab from "@components/Dashboard/NotificationTab";
import SearchBar from "@components/Dashboard/DashboardCommunity/SearchBar";
import { useState } from "react";

type DashboardHeaderProps = { tab: number };

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ tab }) => {
  const [isNotificationTabOpen, setNotificationTabOpen] = useState(false);
  const [isNotificationTabVisible, setNotificationTabVisible] = useState(false);

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
    <div className="bg-white w-full shadow-sm flex justify-between py-3 px-8">
      {tab === 5 ? <SearchBar /> : <div />}

      <div>
        <div className="flex justify-between items-center w-fit gap-8">
          <div className="flex">
            <span className="p-1 rounded-full bg-primary cursor-pointer shadow-lg transform active:scale-[80%] transition-transform" onClick={toggleNotificationTab}>
              <IoIosNotifications className="text-white text-3xl" />
            </span>
          </div>

          <div className="h-12 border border-lightGrey"></div>

          <div className="flex items-center justify-center gap-4">
            <span className="font-medium text-lg sm:max-2xl:hidden">John Doe</span>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile Picture" className="rounded-full w-10 h-auto" />
          </div>
        </div>

        <div className={`relative transform transition-transform z-50 ${isNotificationTabOpen ? 'translate-x-0 duration-[400ms]' : 'translate-x-[32rem] duration-[800ms]'}`}>
          {isNotificationTabVisible && <NotificationTab toggleNotificationTab={toggleNotificationTab} />}
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;

                        