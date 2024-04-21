import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/pageStyles/MainMenu.css";
import MainGallery from "@components/MainGallery";
import { events } from "../data/MainGalleryEvents.json"; // Import events data from JSON file to display on main page gallery, THIS MAY CHANGE IN THE FUTURE

function MainMenu() {
  const [testList, setTestList] = useState<{ id: string; name: string; number: number }[]>([]);

  useEffect(() => {
    const fetchTestList = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getTest");
        if (!response.ok) {
          throw new Error("Failed to fetch test list");
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
      <ul>
        {testList.map((item) => (
          <li key={item.id}>
            {item.name} - {item.number}
          </li>
        ))}
      </ul>
      <MainGallery data={events} />
      <Footer />
    </div>
  );
}

export default MainMenu;
