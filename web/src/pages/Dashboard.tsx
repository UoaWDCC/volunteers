import { useState } from "react";
import DashboardProfile from "@components/Dashboard/dashboardProfile/DashboardProfile";
import DashboardDashboard from "@components/Dashboard/dashboardDashboard/DashboardDashboard";
import DashboardCalendar from "@components/Dashboard/dashboardCalendar/DashboardCalendar";
import ProfileEditModalContextProvider from "../context/ProfileEditModalContextProvider";
import DashboardHeader from "@components/Dashboard/DashboardHeader";
import SideBar from "@components/Dashboard/SideBar";
import DashboardCommunity from "@components/Dashboard/DashboardCommunity/DashboardCommunity";
import DashboardDiscover from "@components/Dashboard/DashboardDiscover/DashboardDiscover";
import SearchBar from "@components/Dashboard/DashboardCommunity/SearchBar";

function Dashboard() {
  const [tab, setTab] = useState(1);

  const switchDashboard = () => {
    setTab(1);
  };

  const switchDiscover = () => {
    setTab(2);
  };

  const switchProfile = () => {
    setTab(3);
  };

  const switchCalendar = () => {
    setTab(4);
  };

  const switchCommunity = () => {
    setTab(5);
  };

  return (
    <div className="bg-[#F7F7FB] primary-background overflow-hidden flex flex-row">
      {/* width of the left nav bar */}
      {/* place thing component here and remove bg-primary */}
      <div className="bg-primary w-[15%] h-auto">
        <SideBar
          switchDashboard={switchDashboard}
          switchCalendar={switchCalendar}
          switchCommunity={switchCommunity}
          switchDiscover={switchDiscover}
          switchProfile={switchProfile}
        />
      </div>

      {/* width of the everything else (other than the left nav bar) or in otherwords the length of the searchbar*/}
      <div className="flex flex-col w-[85%] marker:p-5">
        <div className="flex flex-row justify-end p-5">
          {/* place notifcation stuff in here and remove bg-yellow for henrys thing it'll probably break the styling a bit but it shouldnt be too hard to fix, maybe instead of having a whole nav bar just have the notifcation and pfp component as separate thing or something*/}
          {tab === 5 && (
            <>
              <h1>other thig</h1>
              <SearchBar />
            </>
          )}
          <DashboardHeader />
        </div>

        {/* whole tabs go in here */}
        <div className="flex flex-row">
          {/* <DashboardCommunity /> */}
          {tab === 1 && <DashboardDashboard />}
          {tab === 2 && <DashboardDiscover />}
          {tab === 3 && (
            <>
              <ProfileEditModalContextProvider>
                <DashboardProfile />
              </ProfileEditModalContextProvider>
            </>
          )}
          {tab === 4 && <DashboardCalendar />}
          {tab === 5 && <DashboardCommunity />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
