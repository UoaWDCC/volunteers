import axios from "axios";
import { useState, useEffect } from "react";
import CommunityGalleryCard from "../DashboardCommunity/CommunityGalleryCard";

interface GalleryData {
  title: string;
  image: string;
}

const CommunityGallery = ({
  event,
  location,
}: {
  event: string;
  location: string;
}) => {
  // TEMPORARY DATA, we should be getting the profile data from somewhere
  const name = "John Doe";
  const hours = "14";
  const [data, setData] = useState<GalleryData[]>([
    {
      title: "Relay For Life",
      image: "/assets/EventHighlights/Events/RelayForLife/imgB.png",
    },
    {
      title: "Volunteers Day",
      image: "/assets/EventHighlights/Events/VolunteersDay/imgB.png",
    },
    {
      title: "Blind Low Vision",
      image: "/assets/EventHighlights/Events/BlindLowVision/imgB.png",
    },
    {
      title: "Pub Quiz",
      image: "/assets/EventHighlights/Events/PubQuiz/imgB.png",
    },
  ]);

  useEffect(() => {
    // Fetch gallery data
    const appUrl = import.meta.env.VITE_APP_URL;
    const port = import.meta.env.VITE_APP_PORT;
    axios
      .get(`${appUrl}:${port}/api/homepage/gallery`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-white rounded-3xl py-10 px-[4%] w-full text-subheading text-black shadow-lg">
      <p>
        People you may know from {event} at {location}
      </p>
      <div className="w-full grid grid-cols-3 max-[1280px]:grid-cols-2 min-[2100px]:grid-cols-4 min-[2560px]:grid-cols-5 gap-[2%]">
        {/* hardcoded 4 people, this shoulded be mapped with however many people in the event?? */}
        <CommunityGalleryCard
          name={name}
          hours={hours}
          profileImgLink={data[0].image}
        />
        <CommunityGalleryCard
          name={name}
          hours={hours}
          profileImgLink={data[1].image}
        />
        <CommunityGalleryCard
          name={name}
          hours={hours}
          profileImgLink={data[2].image}
        />
        <CommunityGalleryCard
          name={name}
          hours={hours}
          profileImgLink={data[3].image}
        />
      </div>
    </div>
  );
};

export default CommunityGallery;
