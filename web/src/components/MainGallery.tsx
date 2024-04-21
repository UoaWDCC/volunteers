import { useEffect, useState } from "react";
import "../styles/componentStyles/MainGallery.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

interface MainGalleryProps {
  data: { imageSrc: string; alt: string; title: string; description: string }[]; // Specify array of objects with imageSrc and alt
}

const MainGallery = ({ data }: MainGalleryProps) => {
  const [eventIndex, setEventIndex] = useState(0);

  // =============== NOT YET IMPLEMENTED ===============
  // function to handle the "See other upcoming events" button when clicked
  const handleSeeMore = () => {
    console.log("See more");
  };
  // ===================================================

  // function to autoscroll the images, ?MIGHT REMOVE THIS LATER?
  useEffect(() => {
    const interval = setInterval(() => {
      setEventIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    // return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className="entire">
      {/* link to event page when clicking on image banner. !!!! NOT YET IMPLEMENTED !!!! */}
      <Link to={`/events/${eventIndex}`}>
        <div className="image">
          {data.map((event, index) => (
            <img src={event.imageSrc} alt={event.alt} key={index} className="picture" style={{ translate: `${-100 * eventIndex}%` }} />
          ))}
        </div>
      </Link>

      <div className="buttons">
        <button className="back" onClick={() => (eventIndex === 0 ? setEventIndex(data.length - 1) : setEventIndex(eventIndex - 1))}>
          <IoIosArrowBack size={30} />
        </button>
        <button className="forward" onClick={() => (eventIndex === data.length - 1 ? setEventIndex(0) : setEventIndex(eventIndex + 1))}>
          <IoIosArrowForward size={30} />
        </button>
      </div>

      <div className="details">
        <div className="text">
          <h1 className="title">{data[eventIndex].title}</h1>
          <p className="description">{data[eventIndex].description}</p>
        </div>
        <button className="see-more" onClick={() => handleSeeMore}>
          See other upcoming events
        </button>
      </div>
    </div>
  );
};

export default MainGallery;
