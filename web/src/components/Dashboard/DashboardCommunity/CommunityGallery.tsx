import axios from 'axios';
import { useState, useEffect } from 'react';
import CommunityGalleryCard from './CommunityGalleryCard';

interface GalleryData {
  title: string;
  image: string;
}

const CommunityGallery = ({event, location}: {event: string, location: string}) => {

// TEMPORARY DATA, we should be getting the profile data from somewhere
const name = 'John Doe';
const hours = '14';
      const [data, setData] = useState<GalleryData[]>([
    {
      title: "Relay For Life", 
      image: "/assets/EventHighlights/Events/RelayForLife/imgB.png"
    },
    {
      title:"Volunteers Day",
      image: "/assets/EventHighlights/Events/VolunteersDay/imgB.png"
    },
    {
      title:"Blind Low Vision",
      image: "/assets/EventHighlights/Events/BlindLowVision/imgB.png"
    },
    {
      title: "Pub Quiz",
      image: "/assets/EventHighlights/Events/PubQuiz/imgB.png"
    }
    ]);

    useEffect(() => {
    // Fetch gallery data
    axios.get('http://localhost:3000/api/homepage/gallery')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  , []);

  
    return (  
        <div className='bg-white rounded-3xl py-10 px-[4%] w-full text-subheading text-black shadow-lg max-[1887px]:px-[6%] max-[1770px]:px-[3%] max-[1510px]:px-[8%]'>
            <p>People you may know from {event} at {location}</p>
            <div className='flex gap-x-[5px] justify-between gap-y-2 flex-wrap '>
                {/* hardcoded 4 people, this shoulded be mapped with however many people in the event?? */}
                <CommunityGalleryCard name={name} hours={hours} profileImgLink={data[0].image}/>
                <CommunityGalleryCard name={name} hours={hours} profileImgLink={data[1].image}/>
                <CommunityGalleryCard name={name} hours={hours} profileImgLink={data[2].image}/>
                <CommunityGalleryCard name={name} hours={hours} profileImgLink={data[3].image}/>
            </div>
        </div>
    );
}
 
export default CommunityGallery;