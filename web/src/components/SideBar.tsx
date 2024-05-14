import { Link } from 'react-router-dom';
import '../styles/componentStyles/SideBar.css';
import { useState } from 'react';

const SideBar = () => {
    
    const [selectedTab, setSelectedTab] = useState('dashboard');

    return ( 
        <div className="sidebar">
            <img className='club-logo' src='src/assets/club-logo.svg' alt='club-logo' />

            <div className="sidebar-tabs"> 
                <div className={selectedTab === "dashboard" ? "selected" : "unselected-tab" }>
                    <Link onClick={() => setSelectedTab("dashboard")} to='/'>
                        <div className='image-div'><img src='src/assets/sidebar/dashboard-icon.svg' alt='dashboard-icon' /></div>
                        <h3>Dashboard</h3>
                    </Link>
                </div>
            
                <div className={selectedTab === "discover" ? "selected" : "unselected-tab" }>
                    <Link onClick={() => setSelectedTab("discover")} to='/'>
                        <div className='image-div'><img src='src/assets/sidebar/discover-icon.svg' alt='discover-icon' /></div>
                        <h3>Discover</h3>
                    </Link>
                </div>
            
                <div className={selectedTab === "profile" ? "selected" : "unselected-tab" }>
                    <Link onClick={() => setSelectedTab("profile")} to='/'>
                        <div className='image-div'><img src='src/assets/sidebar/profile-icon.svg' alt='profile-icon' /></div>
                        <h3>My Profile</h3>
                    </Link>
                </div>
        
                <div className={selectedTab === "social" ? "selected" : "unselected-tab" }>
                    <Link onClick={() => setSelectedTab("social")} to='/'>
                        <div className='image-div'><img src='src/assets/sidebar/social-icon.svg' alt='social-icon' /></div>
                        <h3>Social</h3>
                    </Link>
                </div>
                
                
                <div className={selectedTab === "settings" ? "selected" : "unselected-tab" }>
                    <Link onClick={() => setSelectedTab("settings")} to='/'>
                        <div className='image-div'><img src='src/assets/sidebar/settings-icon.svg' alt='settings-icon' /></div>
                        <h3>Settings</h3>
                    </Link>
                </div>
            </div>

            <button className='logout-button'>
                <div className='image-div'><img src='src/assets/sidebar/logout-icon.svg' alt='logout-icon' /></div>
                <h3>Log out</h3>
            </button>
        </div>
     );
}
 
export default SideBar;