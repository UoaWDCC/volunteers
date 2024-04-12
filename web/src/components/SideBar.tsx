import { Link } from 'react-router-dom';
import '../styles/componentStyles/SideBar.css';

const SideBar = () => {
    return ( 
        <div className="sidebar">
            <img className='club-logo' src='src/assets/club-logo.svg' alt='club-logo' />

            <div className="sidebar-links">
                <Link to='/'>
                    <div className="selected">
                        <div className='image-div'><img src='src/assets/sidebar/dashboard-icon.svg' alt='dashboard-icon' /></div>
                        <h3>Dashboard</h3>
                    </div>
                </Link>

                <Link to='/'>
                    <div className="">
                        <div className='image-div'><img src='src/assets/sidebar/discover-icon.svg' alt='discover-icon' /></div>
                        <h3>Discover</h3>
                    </div>
                </Link>

                <Link to='/'>
                    <div className="">
                        <div className='image-div'><img src='src/assets/sidebar/profile-icon.svg' alt='profile-icon' /></div>
                        <h3>My Profile</h3>
                    </div>
                </Link>

                <Link to='/'>
                    <div className="">
                        <div className='image-div'><img src='src/assets/sidebar/social-icon.svg' alt='social-icon' /></div>
                        <h3>Social</h3>
                    </div>
                </Link>

                <Link to='/'>
                    <div className="">
                        <div className='image-div'><img src='src/assets/sidebar/settings-icon.svg' alt='settings-icon' /></div>
                        <h3>Settings</h3>
                    </div>
                </Link>
            </div>
        </div>
     );
}
 
export default SideBar;