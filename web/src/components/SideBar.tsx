import { useState } from 'react';
import SideBarTab from './SideBarTab';

const SideBar = () => {
    
    const [selectedTab, setSelectedTab] = useState('dashboard');

    return ( 
        <div className="flex flex-col bg-gradient-to-b from-[#D6EDFD] to-[#58B6F1] h-[96vh] w-[225px] my-[2vh] mx-[3vh] rounded-[30px]">
            <img className="h-[68px] w-[68px] mt-[8vh] self-center" src='/public/assets/club-logo.svg' alt='club-logo' />

            <div className="flex flex-col mt-[5vh] items-end"> 
                <SideBarTab image='/public/assets/sidebar/dashboard-icon.svg' tabName='dashboard' selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <SideBarTab image='/public/assets/sidebar/discover-icon.svg' tabName='discover' selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <SideBarTab image='/public/assets/sidebar/profile-icon.svg' tabName='profile' selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <SideBarTab image='/public/assets/sidebar/social-icon.svg' tabName='social' selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <SideBarTab image='/public/assets/sidebar/settings-icon.svg' tabName='settings' selectedTab={selectedTab} setSelectedTab={setSelectedTab} /> 
            </div>

            <button className='logout-button'>
                <img src='/public/assets/sidebar/logout-icon.svg' alt='logout-icon' />
                <h3>Log out</h3>
            </button>
        </div>
     );
}
 
export default SideBar;