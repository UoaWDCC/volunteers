import { useState } from "react"
import MainPageButtonHeadings from "./MainPageButtonHeadings"
import "../styles/componentStyles/EventHighlights.css"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

interface EventHighlightProps {
  data: {
    title: string,
    description: string,
    imgA: string,
    imgB: string,
    imgC: string,
    imgD: string,
    imgE: string
  }[]
}

const EventHighlights = ({ data }: EventHighlightProps) => {

  const [eventIndex, setEventIndex] = useState(0)

  const handleBack = () => {
    setEventIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1))
  }

  const handleForward = () => {
    setEventIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="event-highlights">
      <div className="highlights-heading">
        <MainPageButtonHeadings heading="Event Highlights" />
      </div>

      {data.map((event, index) => (
        <div className={(index === eventIndex ? "event-slides-active" : "event-slides")} key={index}>
          <img src={event.imgA} alt="" className="imgA" />
          <img src={event.imgB} alt="" className="imgB" />
          <img src={event.imgC} alt="" className="imgC" />
          <img src={event.imgD} alt="" className="imgD" />
          <img src={event.imgE} alt="" className="imgE" />
        </div>
      ))}

      <div className='buttons'>
        <button className='back' onClick={() => handleBack()}>
          <IoIosArrowBack size={30} />
        </button>
        <button className='forward' onClick={() => handleForward()}>
          <IoIosArrowForward size={30} />
        </button>
      </div>

      <h1 className="highlights-title">{data[eventIndex].title}</h1>
      <p className="highlights-description">{data[eventIndex].description}</p>
    </div>
  )
}

export default EventHighlights