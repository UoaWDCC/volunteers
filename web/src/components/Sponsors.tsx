import { useEffect, useState } from 'react';
import SponsorDiscount from './SponsorDiscount';
import MainPageButtonHeadings from './MainPageButtonHeadings';
import { sponsors } from '../data/SponsorList.json'; // Import events data from JSON file to display on main page gallery, THIS MAY CHANGE IN THE FUTURE
import Sponsor from './Sponsor';
import axios from 'axios';
 
interface SponsorData {
  logo: string,
  name: string,
  discount: string, 
  website: string
}

const Sponsors = () => {

  const [data, setData] = useState<SponsorData[]>([{logo: "", name: "", discount: "", website: ""}]);

  useEffect(() => {
    // Fetch gallery data
    axios.get('http://localhost:3000/api/homepage/sponsors')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  , []);

  return (
    <div className="flex flex-col items-center h-[85vh] bg-neutral text-black font-medium">
      <div className="flex flex-col items-center">
        <MainPageButtonHeadings heading="Our Sponsors"/>
        <div className="text-center mt-[1rem]">
          Make sure to show the UoA Volunteers Club sticker on your student ID card!
        </div>
      </div>
      <div className="mt-8 w-[80vw] flex justify-center flex-wrap gap-[85px]">
        {data.map((sponsor, index) => (
          <Sponsor key={index} logo={sponsor.logo} name={sponsor.name} discount={sponsor.discount} website={sponsor.website} />
        ))}
    </div>
  </div>
  );
}

export default Sponsors;
