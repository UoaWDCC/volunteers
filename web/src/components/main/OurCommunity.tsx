import { useContext, useEffect, useState } from "react";
import MainPageButtonHeadings from "./MainPageButtonHeadings";
import LoginModalContext from "../../context/LoginModalContext";
import axios from "axios";

interface OurCommunityData {
  topLeftImage: string;
  bottomLeftImage: string;
  topRightImage: string;
  bottomRightImage: string;
  volunteerStatistic: string;
}

const OurCommunity = () => {
  const { setShowModal } = useContext(LoginModalContext);

  const [data, setData] = useState<OurCommunityData>({
    topLeftImage: "/assets/gallery/events/sample1.png",
    bottomLeftImage: "/assets/gallery/events/sample3.png",
    topRightImage: "/assets/gallery/events/sample3.png",
    bottomRightImage: "/assets/gallery/events/sample4.png",
    volunteerStatistic: "1,200",
  });

  // TODO: replace this axios call with a utility function within utils/---.ts
  useEffect(() => {
    // Fetch gallery data
    axios
      .get("http://localhost:3000/api/homepage/community")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="relative flex flex-col items-center bg-neutral text-black font-medium pt-20 overflow-hidden">
      <img
        src="./assets/graphics/helpingHand.svg"
        alt=""
        className="absolute bottom-[-3%] right-[-4.5%]"
      />

      <div className="relative w-full h-screen">
        <div className="flex flex-col items-center">
          <MainPageButtonHeadings heading="Our Community" />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-center font-medium w-[36rem] leading-[1.2rem] mt-[4rem]">
            Join our community to start tracking your efforts!
            <br />
            Create an account to log your hours, connect with others, and stay
            updated on our events. With over:
          </div>
          <div className="text-center text-[5rem] leading-[150%] font-semibold mt-[3.5rem]">
            {data.volunteerStatistic}
          </div>
          <div className="text-center text-[1.4rem]">
            volunteers in our club
          </div>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="text-white z-10 text-[0.7rem] py-[1rem] mt-[2.2rem] rounded-[30px] px-8 leading-[0.5rem] bg-primary"
          >
            Sign me up!
          </button>
        </div>

        <div className="absolute top-0 left-0 right-0 flex flex-col items-center">
          <div className="flex w-full h-1/2">
            <img
              loading="lazy"
              className="object-cover rounded-[20px] ml-[10vw] mt-[5vh] h-[25vh] w-[19vh] transform rotate-[-15deg]"
              src={data.topLeftImage}
              alt="Top Left"
            />
            <img
              loading="lazy"
              className="object-cover rounded-[20px] ml-[53vw] mt-[12vh] h-[35vh] w-[27vh] transform rotate-[17deg]"
              src={data.topRightImage}
              alt="Top Right"
            />
          </div>
          <div className="flex w-full h-1/2">
            <img
              loading="lazy"
              className="object-cover rounded-[20px] ml-[23vw] mt-[5vh] h-[35vh] w-[30vh] transform rotate-[7deg]"
              src={data.bottomLeftImage}
              alt="Bottom Left"
            />
            <img
              loading="lazy"
              className="object-cover rounded-[20px] ml-[25vw] mt-[8vh] h-[25vh] w-[17vh] transform rotate-[-7deg]"
              src={data.bottomRightImage}
              alt="Bottom Right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCommunity;
