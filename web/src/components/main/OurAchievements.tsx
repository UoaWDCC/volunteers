import { useEffect, useState } from "react";
import MainPageButtonHeadings from "./MainPageButtonHeadings";
import axios from "axios";

// define the props for the OurAchievements component to accept
interface OurAchievementsData {
  leftImage: string;
  leftText: {
    topText: string;
    middleText: string;
    bottomText: string;
  };
  middleImage: string;
  rightText: {
    topText: string;
    middleText: string;
    bottomText: string;
  };
  rightImage: string;
}

const OurAchievements = () => {
  const [data, setData] = useState<OurAchievementsData>({
    leftImage: "/assets/gallery/events/sample1.png",
    leftText: {
      topText: "Relay for life:\nSilver Award",
      middleText: "$8,043",
      bottomText: "raised",
    },
    middleImage: "/assets/gallery/events/sample3.png",
    rightText: {
      topText: "UoA Clubs Awards:\nRunner Up",
      middleText: "2023",
      bottomText: "Cause of the Year",
    },
    rightImage: "/assets/gallery/events/sample4.png",
  });

  // TODO: replace this axios call with a utility function within utils/---.ts
  useEffect(() => {
    // Fetch achievements data
    axios
      .get("http://localhost:3000/api/homepage/achievements")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center bg-neutral-tan font-medium py-20 pb-44">
      <img
        src="./assets/graphics/camera.svg"
        alt=""
        className="absolute h-auto top-[-25%] right-[-7%] z-50"
      />
      <img
        src="./assets/graphics/trophy.svg"
        alt=""
        className="absolute h-auto bottom-[-24%] left-[-10%] z-50"
      />

      <MainPageButtonHeadings heading="Achievements" />
      <div className="achievements flex flex-row gap-4 items-center mt-8 bg-primary-dark px-11 py-32 rounded-3xl">
        <img
          loading="lazy"
          className="rounded-[30px] object-cover w-[150px] h-[200px]"
          src={data.leftImage}
          alt="Left Image"
        />

        <div className="w-[180px] h-[250px] bg-lightGrey font-semibold tracking-[-1px] rounded-[30px]">
          <p className="text-center text-lg leading-[8px] mt-12">
            {data.leftText.topText.split("\n")[0]}
          </p>
          <p className="text-center text-lg leading-[8px]">
            {data.leftText.topText.split("\n")[1]}
          </p>
          <p className="text-center text-[2.3em] leading-[8px] mt-12 mb-10">
            {data.leftText.middleText}
          </p>
          <p className="text-center text-lg leading-[8px]">
            {data.leftText.bottomText}
          </p>
        </div>

        <img
          loading="lazy"
          className="rounded-[30px] object-cover w-[300px] h-[350px]"
          src={data.middleImage}
          alt="Middle Image"
        />

        <div className="w-[180px] h-[250px] bg-lightGrey font-semibold tracking-[-1px] rounded-[30px]">
          <p className="text-center text-lg leading-[8px] mt-12">
            {data.rightText.topText.split("\n")[0]}
          </p>
          <p className="text-center text-lg leading-[8px]">
            {data.rightText.topText.split("\n")[1]}
          </p>
          <p className="text-center text-[2.3em] leading-[8px] mt-12 mb-10">
            {data.rightText.middleText}
          </p>
          <p className="text-center text-lg leading-[8px]">
            {data.rightText.bottomText}
          </p>
        </div>

        <img
          loading="lazy"
          className="rounded-[30px] object-cover w-[150px] h-[200px]"
          src={data.rightImage}
          alt="Right Image"
        />
      </div>
    </div>
  );
};

export default OurAchievements;
