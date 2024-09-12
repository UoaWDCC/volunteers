import { useState } from "react";
import DashboardCommunity from "../components/Dashboard/DashboardCommunity/DashboardCommunity";
import DashboardProfile from "@components/DashboardProfile";
import DashboardDashboard from "@components/DashboardDashboard";
import DashboardDiscover from "@components/DashboardDiscover";
import SearchBar from "@components/SearchBar";
import DashboardHeader from "@components/DashboardHeader";

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
        <h1>side thing test</h1>
        <button onClick={switchDashboard}>dashboard</button>
        <button onClick={switchDiscover}>discover</button>
        <button onClick={switchProfile}>profile</button>
        <button onClick={switchCalendar}>calendar</button>
        <button onClick={switchCommunity}>community</button>

            {/* width of the everything else (other than the left nav bar) or in otherwords the length of the searchbar*/}
            <div className='flex flex-col w-[85%] marker:p-5'>
                <div className='flex flex-row justify-end p-5'>
                    {/* place notifcation stuff in here and remove bg-yellow for henrys thing it'll probably break the styling a bit but it shouldnt be too hard to fix, maybe instead of having a whole nav bar just have the notifcation and pfp component as separate thing or something*/}
                    {tab === 5 &&(
                        <>
                            <h1>other thig</h1>
                            <SearchBar />
                        </>
                    )}
                    <DashboardHeader/>
                </div>
        {/* whole tabs go in here */}
        <div className="flex flex-row">
          {/* <DashboardCommunity /> */}
          {tab === 1 && <DashboardDashboard />}
          {tab === 2 && <DashboardDiscover />}
          {tab === 3 && <DashboardProfile />}
          {tab === 4 && <h1>Calendar</h1>}
          {tab === 5 && <DashboardCommunity />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
