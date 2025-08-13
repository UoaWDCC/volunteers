import { IoIosNotifications } from "react-icons/io";
import NotificationTab from "@components/Dashboard/NotificationTab";
import { useAuth } from '../../context/AuthenticationContextProvider'; 
import PlaceholderPFP from "@components/Dashboard/placeholderPfp";
import SearchBar from "@components/Dashboard/DashboardCommunity/SearchBar";
import AuthenticationContext from "../../context/AuthenticationContext.tsx";
import {useContext, useState } from "react";

type DashboardHeaderProps = { tab: number };

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ tab }) => {
  const [isNotificationTabOpen, setNotificationTabOpen] = useState(false);
  const [isNotificationTabVisible, setNotificationTabVisible] = useState(false);
  const authContext = useContext(AuthenticationContext);
  const { firestoreUserDetails } = authContext as unknown as {firestoreUserDetails: any};
  const isAdmin = firestoreUserDetails.role === 'admin';

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
    <div className="bg-white w-full shadow-sm shadow-black/35 flex justify-between py-3 px-8">
      {tab === 5 ? <SearchBar /> : <div />}

      <div>
        <div className="flex justify-between items-center w-fit gap-8">
          {isAdmin ?
            <a
              href="http://localhost:3000/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="stroked rounded-full text-xs whitespace-nowrap px-4 py-2 text-primary border-2 border-primary hover:text-white hover:bg-primary"
            >
              CMS Panel
            </a>
            : <div/>
          }

          <div className="flex">
            <span className="p-1 rounded-full bg-primary cursor-pointer shadow-lg transform active:scale-[80%] transition-transform" onClick={toggleNotificationTab}>
              <IoIosNotifications className="text-white text-3xl" />
            </span>
          </div>

          <div className="h-12 border border-lightGrey"></div>

        <div className="flex items-center justify-center gap-4">
          <span className="font-medium text-lg">{displayName}</span> 
            <PlaceholderPFP size="w-12 h-12" name={displayName} />
        </div>

        <div className={`relative transform transition-transform z-50 ${isNotificationTabOpen ? 'translate-x-0 duration-[400ms]' : 'translate-x-[32rem] duration-[800ms]'}`}>
          {isNotificationTabVisible && <NotificationTab toggleNotificationTab={toggleNotificationTab} />}
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;

                        