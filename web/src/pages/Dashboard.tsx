import { useState } from "react";
import DashboardCommunity from "../components/Dashboard/dashboardCommunity/DashboardCommunity";
import DashboardProfile from "@components/Dashboard/dashboardProfile/DashboardProfile";
import DashboardDashboard from "@components/Dashboard/dashboardDashboard/DashboardDashboard";
import DashboardDiscover from "@components/Dashboard/dashboardDiscover/DashboardDiscover";
import DashboardCalendar from "@components/Dashboard/dashboardCalendar/DashboardCalendar";
import SearchBar from "@components/Dashboard/dashboardCommunity/SearchBar";
import ProfileEditModalContextProvider from "../context/ProfileEditModalContextProvider";
import DashboardHeader from "@components/Dashboard/DashboardHeader";
import SideBar from "@components/Dashboard/SideBar";

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
        <div className="bg-[#F7F7FB] primary-background overflow-hidden flex flex-row h-screen">
            {/* width of the left nav bar */}
            {/* place thing component here and remove bg-primary */}
            <div className='w-[15%]'> 
                <SideBar switchDashboard={switchDashboard} switchCalendar={switchCalendar} switchCommunity={switchCommunity} switchDiscover={switchDiscover} switchProfile={switchProfile}/>
            </div>

            {/* width of the everything else (other than the left nav bar) or in otherwords the length of the searchbar*/}
            <div className='flex flex-col w-[85%]'>
                <div className='flex flex-row justify-end items-center w-full h-[10%] pl-5 pr-[5%]'>
                    {/* place notifcation stuff in here and remove bg-yellow for henrys thing it'll probably break the styling a bit but it shouldnt be too hard to fix, maybe instead of having a whole nav bar just have the notifcation and pfp component as separate thing or something*/}
                    {tab === 5 &&(
                        <>
                            <h1 className="m-0">other thig</h1>
                            <SearchBar />
                        </>
                    )}
                    <DashboardHeader/>
                </div>

                {/* whole tabs go in here */}
                <div className='flex flex-row h-[90%]'>
                    {/* <DashboardCommunity /> */}
                    {tab === 1 && <DashboardDashboard />}
                    {tab === 2 && <DashboardDiscover />}
                    {tab === 3 &&
                        <>
                            <ProfileEditModalContextProvider>
                                <DashboardProfile />
                            </ProfileEditModalContextProvider>
                        </>}
                    {tab === 4 && <DashboardCalendar />}
                    {tab === 5 && <DashboardCommunity />}
                </div>
            </div>

        </div>
  );
}

export default Dashboard;
