import Header from "@components/main/Header";
import Footer from "../components/main/Footer";
import "../styles/pageStyles/MainMenu.css";
import MainGallery from "@components/main/MainGallery";
import SponsorsList from "@components/main/SponsorsList";
import EventHighlights from "@components/main/EventHighlights";
import OurAchievements from "@components/main/OurAchievements";
import OurCommunity from "@components/main/OurCommunity";
import LoginModalContextProvider from "../context/LoginModalContextProvider";
import LoginModal from "@components/main/LoginModal";
import AboutUs from "@components/main/AboutUs";

function MainMenu() {
  return (
    <div className="min-h-screen flex flex-col">
      <LoginModalContextProvider>
        <LoginModal />
        <Header />
        <main className="flex-1">
          <MainGallery />
          <AboutUs />
          <EventHighlights />
          <OurAchievements />
          <OurCommunity />
          <SponsorsList />
        </main>
        <Footer />
      </LoginModalContextProvider>
    </div>
  );
}

export default MainMenu;
