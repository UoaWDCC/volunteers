import Header from '@components/Header';
import Footer from '../components/Footer';
import '../styles/pageStyles/MainMenu.css';
import MainGallery from '@components/MainGallery';
import { events } from '../data/MainGalleryEvents.json'; // Import events data from JSON file to display on main page gallery, THIS MAY CHANGE IN THE FUTURE
import { sponsors } from '../data/SponsorList.json'; // Import events data from JSON file to display on main page gallery, THIS MAY CHANGE IN THE FUTURE
import Sponsors from '@components/Sponsors';
import EventHighlights from '@components/EventHighlights';
import { eventHighlights } from '../data/EventHighlights.json';
import OurAchievements from '@components/OurAchievements';
import OurCommunity from '@components/OurCommunity';
// import Announcements from '@components/Announcements';

// getUserById
import { getAllUsers } from '../utils/UserService';

import Users from '@components/Users';

function MainMenu() {

  return (
    <div className="primary-background">
      
      {/* <Announcements user={}/> */}
      <Users/>
    
      
      {/* <p className='font-serif text-font-primary text-lg px-h-md py-v-md'>font-serif for poppins,  font-lora for lora,  sans for Work Sans ::font-serif text-font-primary text-lg px-h-md py-v-md::</p> */}
      <Header />
      <MainGallery data={events} />
      <EventHighlights data={eventHighlights} />
      <OurAchievements/>
      <OurCommunity/>
      <Sponsors data={sponsors}/>
      <Footer />
    </div>
  );
}

export default MainMenu;
