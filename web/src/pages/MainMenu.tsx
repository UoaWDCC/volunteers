import { useEffect, useState } from 'react';
import Header from '@components/Header';
import Footer from '../components/Footer';
import '../styles/pageStyles/MainMenu.css';
import MainGallery from '@components/MainGallery';
import { events } from '../data/MainGalleryEvents.json'; // Import events data from JSON file to display on main page gallery, THIS MAY CHANGE IN THE FUTURE
import { sponsors } from '../data/SponsorList.json'; // Import events data from JSON file to display on main page gallery, THIS MAY CHANGE IN THE FUTURE
import Sponsors from '@components/Sponsors';
import OurAchievements from '@components/OurAchievements';
import OurCommunity from '@components/OurCommunity';
function MainMenu() {
  const [testList, setTestList] = useState<{ id: string, name: string, number: number }[]>([]);

  useEffect(() => {
    const fetchTestList = async () => {
      try {
        const response = await fetch('/api/getTest');
        if (!response.ok) {
          throw new Error('Failed to fetch test list');
        }
        const data = await response.json();
        setTestList(data);
      } catch (error) {
        console.error("Error fetching test list:", error);
      }
    };

    fetchTestList();
  }, []);

  return (
    <div className="MainMenu">
      <Header />
      {/* Render testList data */}
      <ul>
        {testList.map((item) => (
          <li key={item.id}>{item.name} - {item.number}</li>
        ))}
      </ul>
      <MainGallery data={events} />
      <OurAchievements/>
      <OurCommunity/>
      <Sponsors data={sponsors}/>
      <Footer />
    </div>
  );
}

export default MainMenu;
