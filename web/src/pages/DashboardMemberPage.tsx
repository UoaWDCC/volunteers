import { useContext, useEffect, useState } from "react";
import DashboardCommunity from "@components/Dashboard/DashboardCommunity/DashboardCommunity";
import DashboardProfile from "@components/Dashboard/dashboardProfile/DashboardProfile";
import DashboardDashboard from "@components/Dashboard/DashboardMain/DashboardDashboard";
import DashboardCalendar from "@components/Dashboard/dashboardCalendar/DashboardCalendar";
import ProfileEditModalContextProvider from "../context/ProfileEditModalContextProvider";
import DashboardHeader from "@components/Dashboard/DashboardHeader";
import SideBar from "@components/Dashboard/SideBar";
import { CommunitySearchContextProvider } from "../context/CommunitySearchContextProvider";
import DashboardDiscover from "@components/Dashboard/DashboardDiscover/DashboardDiscover";
import AuthenticationContext from "../context/AuthenticationContext";

function DashboardMemberPage() {
  const [tab, setTab] = useState(1);
  const switchDashboard = () => setTab(1);
  const switchDiscover = () => setTab(2);
  const switchProfile = () => setTab(3);
  const switchCalendar = () => setTab(4);
  const switchCommunity = () => setTab(5);

  const authContext = useContext(AuthenticationContext) as {
    firestoreUserDetails: { role?: string } | null;
  } | null;
  const { firestoreUserDetails } = authContext || {};
  const role = firestoreUserDetails?.role;

  // Guard: non-admins only. Admins should be sent to admin dashboard
  useEffect(() => {
    if (role === 'admin') {
      window.location.href = "/dashboard/admin";
    }
  }, [role]);

  return (
    <CommunitySearchContextProvider>
      <div className="bg-[#F7F7FB] primary-background overflow-hidden flex flex-row h-screen">
        <div className='w-[16rem] sm:max-2xl:w-[7rem]'>
          <SideBar
            activeTab={tab === 1 ? 'dashboard' : tab === 2 ? 'discover' : tab === 3 ? 'my profile' : tab === 4 ? 'my calendar' : 'community'}
            switchDashboard={switchDashboard}
            switchCalendar={switchCalendar}
            switchCommunity={switchCommunity}
            switchDiscover={switchDiscover}
            switchProfile={switchProfile}
          />
        </div>
        <div className='flex flex-col flex-1 '>
          <div className='flex flex-row justify-end items-center w-full mb-4'>
            <DashboardHeader tab={tab} />
          </div>
          <div className='flex flex-row h-[90%] py-6 px-8'>
            {tab === 1 && <DashboardDashboard />}
            {tab === 2 && <DashboardDiscover />}
            {tab === 3 && (
              <ProfileEditModalContextProvider>
                <DashboardProfile />
              </ProfileEditModalContextProvider>
            )}
            {tab === 4 && <DashboardCalendar />}
            {tab === 5 && <DashboardCommunity />}
          </div>
        </div>
      </div>
    </CommunitySearchContextProvider>
  );
}

export default DashboardMemberPage;


