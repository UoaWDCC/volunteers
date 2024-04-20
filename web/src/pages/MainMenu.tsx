import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import '../styles/pageStyles/MainMenu.css';
import Discover from '@components/Discover';

function MainMenu() {
  const [testList, setTestList] = useState<{ id: string, name: string, number: number }[]>([]);

  useEffect(() => {
    const fetchTestList = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getTest');
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
      {/* Render testList data */}
      <Discover/>
      <ul>
        {testList.map((item) => (
          <li key={item.id}>{item.name} - {item.number}</li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default MainMenu;
