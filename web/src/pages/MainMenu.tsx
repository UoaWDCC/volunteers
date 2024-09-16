import Header from '@components/main/Header';
import Footer from '../components/main/Footer';
import '../styles/pageStyles/MainMenu.css';
import MainGallery from '@components/main/MainGallery';
import SponsorsList from '@components/main/SponsorsList';
import EventHighlights from '@components/main/EventHighlights';
import OurAchievements from '@components/main/OurAchievements';
import OurCommunity from '@components/main/OurCommunity';
import AuthenticationContextProvider from '../context/AuthenticationContextProvider';

// import ShowCaseUserAnnouncements from '@components/legacy/ShowCaseUserAnnouncements';
import LoginModalContextProvider from "../context/LoginModalContextProvider";
import LoginModal from "@components/main/LoginModal";
import AboutUs from '@components/main/AboutUs';

function MainMenu() {
  return (
    <div className="overflow-hidden">
      {/* <p className='font-serif text-font-primary text-lg px-h-md py-v-md'>font-serif for poppins,  font-lora for lora,  sans for Work Sans ::font-serif text-font-primary text-lg px-h-md py-v-md::</p> */}
      <AuthenticationContextProvider>
        <LoginModalContextProvider>
          <LoginModal />
          <Header />
          <MainGallery />
          <AboutUs />
          <EventHighlights />
          <OurAchievements />
          <OurCommunity />
          <SponsorsList />
          <Footer />
        </LoginModalContextProvider>
      </AuthenticationContextProvider>
    </div>
  );
}

export default MainMenu;
