import Header from '@components/Header';
import Footer from '../components/Footer';
import '../styles/pageStyles/MainMenu.css';
import MainGallery from '@components/MainGallery';
import { sponsors } from '../data/SponsorList.json'; // Import events data from JSON file to display on main page gallery, THIS MAY CHANGE IN THE FUTURE
import Sponsors from '@components/Sponsors';
import EventHighlights from '@components/EventHighlights';
import { eventHighlights } from '../data/EventHighlights.json';
import OurAchievements from '@components/OurAchievements';
import OurCommunity from '@components/OurCommunity';

import ShowCaseUserAnnouncements from '@components/ShowCaseUserAnnouncements';


function MainMenu() {

  return (
    <div className="primary-background">
      

      <ShowCaseUserAnnouncements/>

    
      
      {/* <p className='font-serif text-font-primary text-lg px-h-md py-v-md'>font-serif for poppins,  font-lora for lora,  sans for Work Sans ::font-serif text-font-primary text-lg px-h-md py-v-md::</p> */}
      <Header />
      <MainGallery data={eventHighlights} />
      <EventHighlights data={eventHighlights} />
      <OurAchievements/>
      <OurCommunity/>
      <Sponsors data={sponsors}/>
      <Footer />
    </div>
  );
}

export default MainMenu;
