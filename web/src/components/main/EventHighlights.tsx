import { useEffect, useState } from "react";
import MainPageButtonHeadings from "./MainPageButtonHeadings";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

interface EventHighlightData {
  title: string;
  description: string;
  topLeftImage: string; // img A
  bottomLeftImage: string; // img B
  topRightImage: string; // img C
  rightImage: string; // img D
  bottomRightImage: string; // img E
}

const EventHighlights = () => {
  const [eventIndex, setEventIndex] = useState(0);
  const [data, setData] = useState<EventHighlightData[]>([
    {
      title: "Relay For Life",
      description:
        "It was a huge success, thanks to our amazing participants and generous donors! Together, we raised an impressive $8,433 placing us second in the community group category!",
      topLeftImage: "/assets/EventHighlights/Events/RelayForLife/imgA.png",
      bottomLeftImage: "/assets/EventHighlights/Events/RelayForLife/imgB.png",
      topRightImage: "/assets/EventHighlights/Events/RelayForLife/imgC.png",
      rightImage: "/assets/EventHighlights/Events/RelayForLife/imgD.png",
      bottomRightImage: "/assets/EventHighlights/Events/RelayForLife/imgE.png",
    },
    {
      title: "Volunteers Day",
      description:
        "The biggest day of the year for us! There were opportunities like Elder Care Volunteering where students connected with residents through music, arts, and crafts!\n Other students volunteered for the Takapuna Beach Clean Up, helping to preserve the beautiful beach!",
      topLeftImage: "/assets/EventHighlights/Events/VolunteersDay/imgA.png",
      bottomLeftImage: "/assets/EventHighlights/Events/VolunteersDay/imgB.png",
      topRightImage: "/assets/EventHighlights/Events/VolunteersDay/imgC.png",
      rightImage: "/assets/EventHighlights/Events/VolunteersDay/imgD.png",
      bottomRightImage: "/assets/EventHighlights/Events/VolunteersDay/imgE.png",
    },
  ]);

  // Fetch highlight data
  useEffect(() => {
    const appUrl = import.meta.env.VITE_APP_URL;
    const port = import.meta.env.VITE_APP_PORT;

    axios
      .get(`${appUrl}:${port}/api/homepage/highlights`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBack = () => {
    setEventIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleForward = () => {
    setEventIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col justify-center items-center relative bg-neutral overflow-hidden w-full h-[60vw]">
      <div className="absolute flex w-full h-full overflow-hidden z-10">
        {data.map((event, index) => (
          <div
            className="relative overflow-hidden flex-grow flex-shrink-0 basis-full transition- [translate] duration-[850ms] ease-in-out"
            key={index}
            style={{ translate: `${-100 * eventIndex}%` }}
          >
            <div className="">
              <div className="absolute top-[7%] left-[15%] w-[16%] h-[33%]">
                <img
                  className="object-cover w-full h-full rounded-3xl"
                  src={event.topLeftImage}
                />
              </div>
              <div className="absolute bottom-[10%] left-[6%] w-[32%] h-[24%]">
                <img
                  className="object-cover w-full h-full rounded-3xl"
                  src={event.bottomLeftImage}
                />
              </div>
              <div className="absolute top-[22%] right-[22.5%] w-[13%] h-[20%]">
                <img
                  className="object-cover w-full h-full rounded-3xl"
                  src={event.topRightImage}
                />
              </div>
              <div className="absolute top-[48%] right-[-2%] w-[28%] h-[22%]">
                <img
                  className="object-cover w-full h-full rounded-3xl"
                  src={event.rightImage}
                />
              </div>
              <div className="absolute bottom-[2.5%] right-[30%] w-[10%] h-[24%]">
                <img
                  className="object-cover w-full h-full rounded-3xl"
                  src={event.bottomRightImage}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ul className="absolute w-[32rem] min-h-[12rem] top-[45%]">
        {data.map((event, index) => (
          <li
            className="data-[active=true]:opacity-100 data-[active=true]:delay-0 opacity-0 flex absolute flex-col items-center transition-opacity duration-[850ms] ease-in-out delay-200 w-full"
            key={index}
            data-active={index == eventIndex ? "true" : null}
          >
            <h1 className="text-black font-serif text-heading m-0 mb-2">
              {event.title}
            </h1>
            <p className="text-black text-center font-sans text-detail m-0 sm:max-2xl:hidden">
              {event.description}
            </p>
          </li>
        ))}
      </ul>

      <div className="absolute top-[7%] z-[1]">
        <MainPageButtonHeadings heading="Event Highlights" />
      </div>

      <div className="z-20">
        <FaArrowLeft
          className="absolute top-[50%] left-[6%] w-10 h-10 text-white bg-[#C7D6E7]/[0.6] backdrop-blur-[4px] rounded-full cursor-pointer hover:bg-primary/[0.6] transform active:translate-y-[3px] shadow-lg transition-[all_ease-in-out_200ms] transition-[transform_ease-in-out_80ms] p-3"
          onClick={() => handleBack()}
        />
        <FaArrowRight
          className="absolute top-[50%] right-[6%] w-10 h-10 text-white bg-[#C7D6E7]/[0.6] backdrop-blur-[4px] rounded-full cursor-pointer hover:bg-primary/[0.6] transform active:translate-y-[3px] shadow-lg transition-[all_ease-in-out_200ms] transition-[transform_ease-in-out_80ms] p-3"
          onClick={() => handleForward()}
        />
      </div>

      {/*Spiral*/}
      <img
        loading="lazy"
        src="./assets/graphics/swirlDBlue.svg"
        alt=""
        className="absolute w-[8%] h-auto bottom-[3%] left-[36%]"
      />
      {/*Flower*/}
      <img
        loading="lazy"
        src="./assets/graphics/flowerLRed.svg"
        alt=""
        className="absolute w-[7%] h-auto top-[38%] right-[19%]"
      />
      {/*Star*/}
      <img
        loading="lazy"
        src="./assets/graphics/sparkleRed.svg"
        alt=""
        className="absolute w-[18%] h-auto top-[27%] left-[4.5%]"
      />
    </div>
  );
};

export default EventHighlights;
