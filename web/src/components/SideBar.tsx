import { Link } from 'react-router-dom';
import { useState } from 'react';

const SideBar = () => {
    
    const [selectedTab, setSelectedTab] = useState('dashboard');

    return ( 
        <div className="flex flex-col bg-gradient-to-b from-[#D6EDFD] to-[#58B6F1] h-[96vh] w-[225px] my-[2vh] mx-[3vh] rounded-[30px]">
            <img className="h-[68px] w-[68px] mt-[8vh] self-center" src='/public/assets/club-logo.svg' alt='club-logo' />

            <div className="flex flex-col mt-[5vh] items-end"> 
                <div className={selectedTab === "dashboard" ? "selected" : "unselected-tab" }>
                    <Link onClick={() => setSelectedTab("dashboard")} to='/'>
                        <div className='image-div'><img src='/public/assets/sidebar/dashboard-icon.svg' alt='dashboard-icon' /></div>
                        <h3>Dashboard</h3>
                    </Link>
                </div>
            
                <div className={selectedTab === "discover" ? "selected" : "unselected-tab" }>
                    <Link onClick={() => setSelectedTab("discover")} to='/'>
                        <div className='image-div'><img src='/public/assets/sidebar/discover-icon.svg' alt='discover-icon' /></div>
                        <h3>Discover</h3>
                    </Link>
                </div>
            
                <div className={selectedTab === "profile" ? "selected" : "unselected-tab" }>
                    <Link onClick={() => setSelectedTab("profile")} to='/'>
                        <div className='image-div'><img src='/public/assets/sidebar/profile-icon.svg' alt='profile-icon' /></div>
                        <h3>My Profile</h3>
                    </Link>
                </div>
        
                <div className={selectedTab === "social" ? "selected" : "unselected-tab" }>
                    <Link onClick={() => setSelectedTab("social")} to='/'>
                        <div className='image-div'><img src='/public/assets/sidebar/social-icon.svg' alt='social-icon' /></div>
                        <h3>Social</h3>
                    </Link>
                </div>
                
                
                <div className={selectedTab === "settings" ? "selected" : "unselected-tab" }>
                    <Link onClick={() => setSelectedTab("settings")} to='/'>
                        <div className='image-div'><img src='/public/assets/sidebar/settings-icon.svg' alt='settings-icon' /></div>
                        <h3>Settings</h3>
                    </Link>
                </div>
            </div>

            <button className='logout-button'>
                <img src='/public/assets/sidebar/logout-icon.svg' alt='logout-icon' />
                <h3>Log out</h3>
            </button>
        </div>
     );
}
 
export default SideBar;