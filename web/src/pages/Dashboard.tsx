import { useContext, useState } from "react";
import DashboardCommunity from "../components/Dashboard/DashboardCommunity/DashboardCommunity";
import DashboardProfile from "@components/Dashboard/dashboardProfile/DashboardProfile";
import DashboardDashboard from "@components/Dashboard/DashboardMain/DashboardDashboard";
import DashboardCalendar from "@components/Dashboard/dashboardCalendar/DashboardCalendar";
import ProfileEditModalContextProvider from "../context/ProfileEditModalContextProvider";
import DashboardHeader from "@components/Dashboard/DashboardHeader";
import SideBar from "@components/Dashboard/SideBar";
import { CommunitySearchContextProvider } from "../context/CommunitySearchContextProvider";
import DashboardDiscover from "@components/Dashboard/DashboardDiscover/DashboardDiscover";
import SearchBar from "@components/Dashboard/DashboardCommunity/SearchBar";
import AuthenticationContext from "../context/AuthenticationContext";
import DashboardAdmin from "@components/Dashboard/DashboardAdmin/DashboardAdmin";


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
  const authContext = useContext(AuthenticationContext);
  const { isUserLoggedIn, firestoreUserDetails } = authContext as unknown as {
    isUserLoggedIn: boolean,
    firestoreUserDetails: any
  };

  // Test condition for rendering admin specific content
  // Will need to be changed later when user type column/identifier is implemented
  const isAdmin = firestoreUserDetails.role === 'admin';

  if (!isUserLoggedIn) {
    window.location.href = "/";
  }

    return (
        <CommunitySearchContextProvider>
    <div className="bg-[#F7F7FB] primary-background overflow-hidden flex flex-row h-screen">
            {/* width of the left nav bar */}
            {/* place thing component here and remove bg-primary */}
            <div className='w-[16rem] sm:max-2xl:w-[7rem]'> 
                <SideBar switchDashboard={switchDashboard} switchCalendar={switchCalendar} switchCommunity={switchCommunity} switchDiscover={switchDiscover} switchProfile={switchProfile}/>
            </div>

            <div className='flex flex-col flex-1 '>
                <div className='flex flex-row justify-end items-center w-full'>
                    <DashboardHeader/>
                </div>

                {/* whole tabs go in here */}
                <div className='flex flex-row h-[90%] pt-0 p-5'>
                    {/* <DashboardCommunity /> */}
                    {tab === 1 && (isAdmin ? <DashboardAdmin /> : <DashboardDashboard />)}
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
    </CommunitySearchContextProvider>
  );
}

export default Dashboard;
