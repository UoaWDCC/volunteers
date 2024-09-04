import { useEffect, useState } from 'react';
import MainPageButtonHeadings from './MainPageButtonHeadings';
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
    <div className="flex flex-col pb-[100px] items-center bg-neutral text-black font-medium">
      <div className="flex flex-col items-center">
        <MainPageButtonHeadings heading="Our Sponsors"/>
        <div className="text-center mt-[1rem]">
          Make sure to show the UoA Volunteers Club sticker on your student ID card!
        </div>
      </div>
      <div className="mt-8 max-w-[40vw] flex justify-center flex-wrap gap-[85px]">
        {data.map((sponsor, index) => (
          <Sponsor key={index} logo={sponsor.logo} name={sponsor.name} discount={sponsor.discount} website={sponsor.website} />
        ))}
    </div>
  </div>
  );
} 

export default Sponsors;
