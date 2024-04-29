import { useEffect, useState } from 'react'
import '../styles/componentStyles/MainGallery.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

// define the props for the MainGallery component to accept 
interface MainGalleryProps {
  data: { imageSrc: string; alt: string; title: string; description: string }[]
}

// data is an array of objects stored in json
const MainGallery = ({ data }: MainGalleryProps) => {
  
  // set the index of the current event to display
  const [imgIndex, setEventIndex] = useState(0) 

  // =============== NOT YET IMPLEMENTED ===============
  // function to handle the "See other upcoming events" button when clicked
  const handleSeeMore = () => {
    console.log('See more')
  }
  // ===================================================

  // handle the back and forward buttons to change the image
  const handleBack = () => {
    setEventIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1))
  }

  const handleForward = () => {
    setEventIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1))
  }

  // function to autoscroll the images, ?MIGHT REMOVE THIS LATER?
  useEffect(() => {
    const interval = setInterval(() => {
      setEventIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    // return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval)
  }, [data.length])

  return (
    <div className='gallery'>
      {/* link to event page when clicking on image banner. Currently takes you to /events/[eventID] !!!! NOT YET IMPLEMENTED !!!! */}
      <Link to={`/events/${imgIndex + 1}`}>
        <div className='image'>
          {data.map((event, index) => (
            <img src={event.imageSrc} alt={event.alt} key={index} className='picture' style={{ translate: `${-100 * imgIndex}%` }} />
          ))}
        </div>
      </Link>

      <div className='buttons'>
        <button className='back' onClick={() => handleBack()}>
          <IoIosArrowBack size={30} />
        </button>
        <button className='forward' onClick={() => handleForward()}>
          <IoIosArrowForward size={30} />
        </button>
      </div>

      <div className='details'>
        <div className='text'>
          <h1 className='title'>{data[imgIndex].title}</h1>
          <p className='description'>{data[imgIndex].description}</p>
        </div>
        <button className='see-more' onClick={() => handleSeeMore}>
          See other upcoming events
        </button>
      </div>
    </div>
  )
}

export default MainGallery
