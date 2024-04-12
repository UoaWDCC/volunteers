import '../styles/componentStyles/SideBar.css';

const SideBar = () => {
    return ( 
        <div className="sidebar">
            <img className='club-logo' src='src/assets/club-logo.svg' alt='club-logo' />

            <div className="sidebar-links">
                <a href="#">
                    <div className="">
                        <img src='src/assets/sidebar/dashboard-icon.svg' alt='dashboard-icon' />
                        <h3>Dashboard</h3>
                    </div>

                    <div className="">
                        <img src='src/assets/sidebar/discover-icon.svg' alt='discover-icon' />
                        <h3>Discover</h3>
                    </div>

                    <div className="">
                        <img src='src/assets/sidebar/profile-icon.svg' alt='profile-icon' />
                        <h3>My Profile</h3>
                    </div>

                    <div className="">
                        <img src='src/assets/sidebar/social-icon.svg' alt='social-icon' />
                        <h3>Social</h3>
                    </div>

                    <div className="">
                        <img src='src/assets/sidebar/settings-icon.svg' alt='settings-icon' />
                        <h3>Settings</h3>
                    </div>
                </a>
            </div>
        </div>
     );
}
 
export default SideBar;