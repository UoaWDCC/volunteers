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

      {/* <div className="highlights-heading">
          <MainPageButtonHeadings heading="Event Highlights" />
        </div> */}

      <div className="slider">
        {data.map((event, index) => (
          <div className="event-slides" key={index} style={{ translate: `${-100 * eventIndex}%` }}>
            <div className="highlights-heading">
              <MainPageButtonHeadings heading="Event Highlights" />
            </div>

            <div className="images">
              <div className="imgA">
                <img src={event.imgA} alt="" />
              </div>
              <div className="imgB">
                <img src={event.imgB} alt="" />
              </div>
              <div className="imgC">
                <img src={event.imgC} alt="" />
              </div>
              <div className="imgD">
                <img src={event.imgD} alt="" />
              </div>
              <div className="imgE">
                <img src={event.imgE} alt="" />
              </div>
            </div>

            <h1 className="highlights-title">{event.title}</h1>
            <p className="highlights-description">{event.description}</p>
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

      </div>
    </div>
  )
}

export default EventHighlights