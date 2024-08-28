import { useState } from "react"
import MainPageButtonHeadings from "./MainPageButtonHeadings";
import { IoIosArrowRoundBack, IoIosArrowRoundForward} from "react-icons/io";

interface EventHighlightProps {
  data: {
    title: string,
    description: string,
    imgA: string,
    imgB: string,
    imgC: string,
    imgD: string,
    imgE: string
  }[];
}

const EventHighlights = ({ data }: EventHighlightProps) => {

  const [eventIndex, setEventIndex] = useState(0)

  const handleBack = () => {
    setEventIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  }

  const handleForward = () => {
    setEventIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="flex flex-col justify-center items-center relative bg-neutral-tan overflow-hidden aspect-[1.41/1]">
      <div className="flex absolute w-full h-full overflow-hidden z-[2]">
        {data.map((event, index) => (
          <div className="relative overflow-hidden flex-grow flex-shrink-0 basis-full transition-[translate] duration-[850ms] ease-in-out" key={index} style={{ translate: `${-100 * eventIndex}%` }}>
            <div className="images">
              <div className="absolute top-[5%] left-[13.5%] w-[21%]">
                <img className="object-cover w-full h-full rounded-sm" src={event.imgA} />
              </div>
              <div className="absolute bottom-[10%] left-[5%] w-[38%]">
                <img className="object-cover w-full h-full rounded-sm" src={event.imgB} />
              </div>
              <div className="absolute top-[19%] right-[22.5%] w-[11%]">
                <img className="object-cover w-full h-full rounded-sm" src={event.imgC} />
              </div>
              <div className="absolute top-[40%] right-[0%] w-[27.5%]">
                <img className="object-cover w-full h-full rounded-sm rounded-r-none" src={event.imgD} />
              </div>
              <div className="absolute bottom-[2.5%] right-[30%] w-[12.5%]">
                <img className="object-cover w-full h-full rounded-sm" src={event.imgE} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ul className="absolute w-[30%] h-[25%] z-[3]">
        {data.map((event, index) => (
          <li className="data-[active=true]:opacity-100 data-[active=true]:delay-0 opacity-0 flex absolute flex-col justify-start items-center transition-opacity duration-[850ms] ease-in-out delay-200" key={index} data-active={index == eventIndex ? "true" : null}>
            <h1 className="text-black text-center font-serif text-heading">{event.title}</h1>
            <p className="text-black text-center font-serif text-detail">{event.description}</p>
          </li>
        ))}
      </ul>

      <div className="absolute top-[7%] z-[1]">
        <MainPageButtonHeadings heading="Event Highlights" />
      </div>

      <div className='z-[4]'>
        <IoIosArrowRoundBack className='absolute top-[45%] left-[6%] w-10 h-10 text-white bg-[#9FA1A6]/[0.9] rounded-full cursor-pointer hover:bg-black/[0.75] active:bg-[#464646]/[0.5] transform active:translate-y-[3px] shadow-lg transition-[all_ease-in-out_200ms] transition-[transform_ease-in-out_80ms]' onClick={() => handleBack()}/>
        <IoIosArrowRoundForward className='absolute top-[45%] right-[6%] w-10 h-10 text-white bg-[#9FA1A6]/[0.9] rounded-full cursor-pointer hover:bg-black/[0.75] active:bg-[#464646]/[0.5] transform active:translate-y-[3px] shadow-lg transition-[all_ease-in-out_200ms] transition-[transform_ease-in-out_80ms]' onClick={() => handleForward()}/>
      </div>

      <img loading="lazy" src="./assets/EventHighlights/swirl.svg" alt="" className="absolute w-[10%] h-auto bottom-[5%] left-[41%]"/>
      <img loading="lazy" src="./assets/EventHighlights/flower.svg" alt="" className="absolute w-[8%] h-auto top-[30%] right-[18%]"/>
      <img loading="lazy" src="./assets/EventHighlights/sparkle.svg" alt="" className="absolute w-[25%] h-auto top-[24%] left-0"/>
    </div>
  )
}

export default EventHighlights