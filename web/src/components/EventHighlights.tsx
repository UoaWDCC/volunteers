import { useEffect, useState } from "react"
import MainPageButtonHeadings from "./MainPageButtonHeadings";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

interface EventHighlightData {
  title: string,
  description: string,
  topLeftImage: string, // img A
  bottomLeftImage: string, // img B
  topRightImage: string, // img C
  rightImage: string, // img D
  bottomRightImage: string // img E
}

const EventHighlights = () => {

  const [eventIndex, setEventIndex] = useState(0)
  const [data, setData] = useState<EventHighlightData[]>([
    {
      title: "Relay For Life",
      description: "It was a huge success, thanks to our amazing participants and generous donors! Together, we raised an impressive $8,433 placing us second in the community group category!",
      topLeftImage: "/assets/EventHighlights/Events/RelayForLife/imgA.png",
      bottomLeftImage: "/assets/EventHighlights/Events/RelayForLife/imgB.png",
      topRightImage: "/assets/EventHighlights/Events/RelayForLife/imgC.png",
      rightImage: "/assets/EventHighlights/Events/RelayForLife/imgD.png",
      bottomRightImage: "/assets/EventHighlights/Events/RelayForLife/imgE.png"
    },
    {
      title: "Volunteers Day",
      description: "The biggest day of the year for us! There were opportunities like Elder Care Volunteering where students connected with residents through music, arts, and crafts!\n Other students volunteered for the Takapuna Beach Clean Up, helping to preserve the beautiful beach!",
      topLeftImage: "/assets/EventHighlights/Events/VolunteersDay/imgA.png",
      bottomLeftImage: "/assets/EventHighlights/Events/VolunteersDay/imgB.png",
      topRightImage: "/assets/EventHighlights/Events/VolunteersDay/imgC.png",
      rightImage: "/assets/EventHighlights/Events/VolunteersDay/imgD.png",
      bottomRightImage: "/assets/EventHighlights/Events/VolunteersDay/imgE.png"
    }
  ]);

  useEffect(() => {
    // Fetch highlight data
    axios.get('http://localhost:3000/api/homepage/highlights')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
    , []);

  const handleBack = () => {
    setEventIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  }

  const handleForward = () => {
    setEventIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="flex flex-col justify-center items-center relative bg-neutral overflow-hidden h-screen">
      <div className="flex absolute w-full h-full overflow-hidden z-[2]">
        {data.map((event, index) => (
          <div className="relative overflow-hidden flex-grow flex-shrink-0 basis-full transition- [translate] duration-[850ms] ease-in-out" key={index} style={{ translate: `${-100 * eventIndex}%` }}>
            <div className="">
              <div className="absolute top-[5%] left-[15%] w-[15%]">
                <img className="object-cover w-full h-full rounded-sm" src={event.topLeftImage} />
              </div>
              <div className="absolute bottom-[10%] left-[10%] w-[32%]">
                <img className="object-cover w-full h-full rounded-sm" src={event.bottomLeftImage} />
              </div>
              <div className="absolute top-[19%] right-[22.5%] w-[8%]">
                <img className="object-cover w-full h-full rounded-sm" src={event.topRightImage} />
              </div>
              <div className="absolute top-[40%] right-[-2%] w-[22.5%]">
                <img className="object-cover w-full h-full rounded-sm" src={event.rightImage} />
              </div>
              <div className="absolute bottom-[2.5%] right-[30%] w-[8%]">
                <img className="object-cover w-full h-full rounded-sm" src={event.bottomRightImage} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ul className="absolute w-[30%] h-[25%] z-[3]">
        {data.map((event, index) => (
          <li className="data-[active=true]:opacity-100 data-[active=true]:delay-0 opacity-0 flex absolute flex-col justify-start items-center transition-opacity duration-[850ms] ease-in-out delay-200" key={index} data-active={index == eventIndex ? "true" : null}>
            <h1 className="text-black text-center font-serif text-heading">{event.title}</h1>
            <p className="text-black text-center font-serif text-detail w-[80%]">{event.description}</p>
          </li>
        ))}
      </ul>

      <div className="absolute top-[7%] z-[1]">
        <MainPageButtonHeadings heading="Event Highlights" />
      </div>

      <div className='z-[4]'>
        <FaArrowLeft className='absolute top-[50%] left-[6%] w-10 h-10 text-white bg-[#C7D6E7]/[0.6] rounded-full cursor-pointer hover:bg-primary/[0.6] transform active:translate-y-[3px] shadow-lg transition-[all_ease-in-out_200ms] transition-[transform_ease-in-out_80ms] p-3' onClick={() => handleBack()}/>
        <FaArrowRight className='absolute top-[50%] right-[6%] w-10 h-10 text-white bg-[#C7D6E7]/[0.6] rounded-full cursor-pointer hover:bg-primary/[0.6] transform active:translate-y-[3px] shadow-lg transition-[all_ease-in-out_200ms] transition-[transform_ease-in-out_80ms] p-3' onClick={() => handleForward()}/>
      </div>

      {/*Spiral*/}
      <img loading="lazy" src="./assets/EventHighlights/swirl.svg" alt="" className="absolute w-[8%] h-auto bottom-[3%] left-[40.5%]" />
      {/*Flower*/}
      <img loading="lazy" src="./assets/EventHighlights/flower.svg" alt="" className="absolute w-[7%] h-auto top-[29%] right-[18%]" />
      {/*Star*/}
      <img loading="lazy" src="./assets/EventHighlights/sparkle.svg" alt="" className="absolute w-[20%] h-auto top-[22.5%] left-[4%]" />
    </div>
  )
}

export default EventHighlights