import { useEffect, useState } from 'react';
import '../styles/pageStyles/MainMenu.css';

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
    <div>
      {/* Render testList data */}
      <ul>
        {testList.map((item) => (
          <li key={item.id}>{item.name} - {item.number}</li>
        ))}
      </ul>
    </div>
  );
}

export default MainMenu;
