import { useContext, useState } from 'react';
import SideBarTab from './SideBarTab';
import { Link } from 'react-router-dom';
import AuthenticationContext from '../../context/AuthenticationContext';

type SideBarProps = {
    switchDashboard: () => void;
    switchDiscover: () => void;
    switchProfile: () => void;
    switchCalendar: () => void;
    switchCommunity: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ switchDashboard, switchDiscover, switchProfile, switchCalendar, switchCommunity}) => {
    
    const [selectedTab, setSelectedTab] = useState('dashboard');

    const authContext = useContext(AuthenticationContext);
    const { signOut } = authContext as unknown as { signOut: () => void };

    return ( 
        <div className="flex flex-col from-[#D6EDFD] to-[#58B6F1] h-[100vh] w-full rounded-[30px]">
            <Link className="self-center" to={"/"}>
                <img className="h-[68px] w-[68px] mt-[8vh] self-center" src='/public/assets/club-logo.svg' alt='club-logo' />
            </Link>

            <div className="flex flex-col mt-[5vh] items-end"> 
                <SideBarTab unselected='/assets/sidebar/dashboard_icon.svg' selected='/assets/sidebar/dashboard_icon_blue.svg' tabName='dashboard' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchPage={switchDashboard}/>
                <SideBarTab unselected='/assets/sidebar/discover_icon.svg' selected='/assets/sidebar/discover_icon_blue.svg' tabName='discover' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchPage={switchDiscover}/>
                <SideBarTab unselected='/assets/sidebar/profile_icon.svg' selected='/assets/sidebar/profile_icon_blue.svg' tabName='my profile' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchPage={switchProfile}/>
                <SideBarTab unselected='/assets/sidebar/calendar_icon.svg' selected='/assets/sidebar/calendar_icon_blue.svg' tabName='my calendar' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchPage={switchCalendar}/>
                <SideBarTab unselected='/assets/sidebar/community_icon.svg' selected='/assets/sidebar/community_icon_blue.svg' tabName='community' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchPage={switchCommunity}/> 
            </div>  

            <button className="flex w-[130px] h-[35px] items-center bg-primary self-center mt-auto mb-4 rounded-3xl transition-all duration-[400] hover:bg-[#0370BEB3] gap-1.5">
                <img className="h-[18px] w-[18px]  ml-2" src='/public/assets/sidebar/logout_icon.svg' alt='logout-icon' />
                <h3 className="text-[13px] font-sans m-0 mt-[2px]" onClick={signOut} >Logout</h3>
            </button>
        </div>
     );
}
 
export default SideBar;