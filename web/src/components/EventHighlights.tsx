import { useState } from "react"
import MainPageButtonHeadings from "./MainPageButtonHeadings"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "../styles/componentStyles/EventHighlights.css"

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
    setEventIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  }

  const handleForward = () => {
    setEventIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="event-highlights">

      <div className="slider">
        {data.map((event, index) => (
          <div className="event-slides" key={index} style={{ translate: `${-100 * eventIndex}%` }}>
            <div className="images">
              <div className="imgA">
                <img src={event.imgA} />
              </div>
              <div className="imgB">
                <img src={event.imgB} />
              </div>
              <div className="imgC">
                <img src={event.imgC} />
              </div>
              <div className="imgD">
                <img src={event.imgD} />
              </div>
              <div className="imgE">
                <img src={event.imgE} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ul className="static-text">
        {data.map((event, index) => (
          <li className="highlights-text" key={index} data-active={index == eventIndex ? '' : null}>
            <h1 className="highlight-title">{event.title}</h1>
            <p className="highlight-description">{event.description}</p>
          </li>
        ))}
      </ul>

      <div className="highlights-heading">
        <MainPageButtonHeadings heading="Event Highlights" />
      </div>

      <div className='buttons'>
        <button className='highlights-back' onClick={() => handleBack()}>
          <FaArrowLeft/>
        </button>
        <button className='highlights-forward' onClick={() => handleForward()}>
          <FaArrowRight/>
        </button>
      </div>

      <img src="./public/assets/EventHighlights/Vector.svg" alt="" className="icon1"/>
      <img src="./public/assets/EventHighlights/Vector (1).svg" alt="" className="icon2"/>
      <img src="./public/assets/EventHighlights/Figure 11.svg" alt="" className="icon3"/>
    </div>
  )
}

export default EventHighlights