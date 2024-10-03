import { useState } from 'react';
import SideBarTab from './SideBarTab';
import { Link } from 'react-router-dom';

type SideBarProps = {
    switchDashboard: () => void;
    switchDiscover: () => void;
    switchProfile: () => void;
    switchCalendar: () => void;
    switchCommunity: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ switchDashboard, switchDiscover, switchProfile, switchCalendar, switchCommunity}) => {
    
    const [selectedTab, setSelectedTab] = useState('dashboard');

    return ( 
        <div className="flex flex-col bg-primary w-full h-full">
            <Link className="self-center" to={"/"}>
                <img className="h-[68px] w-[68px] mt-[8vh] sm:max-2xl:h-[48px] sm:max-2xl:w-[48px] object-cover" src='/public/assets/club-logo.svg' alt='club-logo' />
            </Link>

            <div className="flex flex-col mt-[5vh] items-end"> 
                <SideBarTab unselected='/assets/sidebar/dashboard_icon.svg' selected='/assets/sidebar/dashboard_icon_blue.svg' tabName='dashboard' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchPage={switchDashboard}/>
                <SideBarTab unselected='/assets/sidebar/discover_icon.svg' selected='/assets/sidebar/discover_icon_blue.svg' tabName='discover' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchPage={switchDiscover}/>
                <SideBarTab unselected='/assets/sidebar/profile_icon.svg' selected='/assets/sidebar/profile_icon_blue.svg' tabName='my profile' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchPage={switchProfile}/>
                <SideBarTab unselected='/assets/sidebar/calendar_icon.svg' selected='/assets/sidebar/calendar_icon_blue.svg' tabName='my calendar' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchPage={switchCalendar}/>
                <SideBarTab unselected='/assets/sidebar/community_icon.svg' selected='/assets/sidebar/community_icon_blue.svg' tabName='community' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchPage={switchCommunity}/> 
            </div>  

            <button className="flex h-[35px] justify-center items-center bg-primary self-center transition-all duration-[400] hover:bg-[#0370BEB3] gap-1.5 mt-auto mb-[40px] ml-4 rounded">
                <img className="h-[18px] w-[18px] m-0" src='/public/assets/sidebar/logout_icon.svg' alt='logout-icon' />
                <h3 className="text-[13px] font-sans m-0 mt-[2px] sm:max-2xl:hidden" >Logout</h3>
            </button>
        </div>
     );
}
 
export default SideBar;