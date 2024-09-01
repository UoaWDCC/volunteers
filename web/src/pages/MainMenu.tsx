import Header from '@components/Header';
import Footer from '../components/Footer';
import '../styles/pageStyles/MainMenu.css';
import MainGallery from '@components/MainGallery';
import Sponsors from '@components/Sponsors';
import EventHighlights from '@components/EventHighlights';
import OurAchievements from '@components/OurAchievements';
import OurCommunity from '@components/OurCommunity';
import AuthenticationContextProvider from '../context/AuthenticationContextProvider';
// import ShowCaseUserAnnouncements from '@components/ShowCaseUserAnnouncements';
import LoginModalContextProvider from '../context/LoginModalContextProvider';
import LoginModal from '@components/LoginModal';

function MainMenu() {
  return (
    <div className="primary-background overflow-hidden">
      {/* <ShowCaseUserAnnouncements/> */}
      {/* <p className='font-serif text-font-primary text-lg px-h-md py-v-md'>font-serif for poppins,  font-lora for lora,  sans for Work Sans ::font-serif text-font-primary text-lg px-h-md py-v-md::</p> */}
      <AuthenticationContextProvider>
        <LoginModalContextProvider>
          <LoginModal />
          <Header />
          <MainGallery />
          <EventHighlights />
          <OurAchievements />
          <OurCommunity />
          <Sponsors />
          <Footer />
        </LoginModalContextProvider>
      </AuthenticationContextProvider>
    </div>
  );
}

export default MainMenu;
