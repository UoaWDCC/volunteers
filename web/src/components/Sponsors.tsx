import { useState } from 'react';
import SponsorDiscount from './SponsorDiscount';
import MainPageButtonHeadings from './MainPageButtonHeadings';
import { sponsors } from '../data/SponsorList.json'; // Import events data from JSON file to display on main page gallery, THIS MAY CHANGE IN THE FUTURE
 
interface SponsorData {
  image: string,
  name: string,
  discount: string, 
}

const Sponsors = () => {
  // in future, have a more way to dynamically manage any number of hover-overs
  const [kompass, setKompass] = useState(true);
  const [shelf, setShelf] = useState(true);
  const [sals, setSals] = useState(true);

  const data = sponsors;

  const bwImg = [
    data[0].imageSrcBw,
    data[1].imageSrcBw,
    data[2].imageSrcBw
  ];
  const colourImg = [
    data[0].imageSrcColour,
    data[1].imageSrcColour,
    data[2].imageSrcColour
  ];
  const altText = [
    data[0].alt,
    data[1].alt,
    data[2].alt
  ];

  return (
    <div className="flex flex-col items-center h-[85vh] bg-neutral text-black font-medium">
      <div className="flex flex-col items-center">
        <MainPageButtonHeadings heading="Our Sponsors"/>
        <div className="text-center mt-[1rem]">
          Make sure to show the UoA Volunteers Club sticker on your student ID card!
        </div>
      </div>
      <div className="mt-8 w-[80vw] flex justify-center flex-wrap gap-[85px]">
        {/* In the future, have another sub component for each sponsor, and perhaps rather than changing image for colour, use styling */}
        <div
          className="border-solid w-40 flex flex-col items-center"
          onMouseEnter={() => setShelf(false)}
          onMouseLeave={() => setShelf(true)}
        >
          {shelf ? (
            <img loading="lazy" src={bwImg[1]} alt={altText[1]} title={altText[1]} className="max-w-[100px] rounded-full" />
          ) : (
            <img loading="lazy" src={colourImg[1]} alt={altText[1]} title={altText[1]} className="max-w-[100px] rounded-full" />
          )}
          {shelf ? null : <SponsorDiscount name="The Shelf" discount="5% OFF" />}
        </div>
        <div
          className="border-solid w-40 flex flex-col items-center"
          onMouseEnter={() => setSals(false)}
          onMouseLeave={() => setSals(true)}
        >
          {sals ? (
            <img loading="lazy" src={bwImg[2]} alt={altText[2]} title={altText[2]} className="max-w-[100px] rounded-full" />
          ) : (
            <img loading="lazy" src={colourImg[2]} alt={altText[2]} title={altText[2]} className="max-w-[100px] rounded-full" />
          )}
          {sals ? null : <SponsorDiscount name="Sal's Pizza" discount="15% OFF" />}
        </div>
        <div
          className="border-solid w-40 flex flex-col items-center"
          onMouseEnter={() => setKompass(false)}
          onMouseLeave={() => setKompass(true)}
        >
          {kompass ? (
            <img loading="lazy" src={bwImg[0]} alt={altText[0]} title={altText[0]} className="max-w-[100px] rounded-full" />
          ) : (
            <img loading="lazy" src={colourImg[0]} alt={altText[0]} title={altText[0]} className="max-w-[100px] rounded-full" />
          )}
          {kompass ? null : <SponsorDiscount name="Kompass Coffee" discount="10% OFF" />}
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
