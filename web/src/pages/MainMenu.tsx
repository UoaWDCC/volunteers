import { useEffect, useState } from 'react';
import '../styles/pageStyles/MainMenu.css';

function MainMenu() {
  const [testList, setTestList] = useState([]);

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
    <div>
      {/* Render testList data */}
      <h1>Test List</h1>
      <ul>
        {testList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MainMenu;
