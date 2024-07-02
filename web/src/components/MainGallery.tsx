import { useState } from 'react';
// import '../styles/componentStyles/MainGallery.css'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// define the props for the MainGallery component to accept
interface MainGalleryProps {
  data: { imageSrc: string; alt: string; title: string; description: string }[];
}

// data is an array of objects stored in json
const MainGallery = ({ data }: MainGalleryProps) => {
  // set the index of the current event to display
  const [imgIndex, setEventIndex] = useState(0);

  // =============== NOT YET IMPLEMENTED ===============
  // function to handle the "See other upcoming events" button when clicked
  const handleSeeMore = () => {
    console.log('See more');
  };
  // ===================================================

  // handle the back and forward buttons to change the image
  const handleBack = () => {
    setEventIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const handleForward = () => {
    setEventIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };

  // // function to autoscroll the images, ?MIGHT REMOVE THIS LATER?
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setEventIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1))
  //   }, 5000)

  //   // return a cleanup function to clear the interval when the component unmounts
  //   return () => clearInterval(interval)
  // }, [data.length])

  return (
    <div className='gallery relative'>
      <Link to={`/events/${imgIndex + 1}`}>
        <div className='image flex overflow-hidden aspect-[8/3]'>
          {data.map((event, index) => (
            <img src={event.imageSrc} alt={event.alt} key={index} className='picture object-cover w-[100%] h-[100%] shrink-0 grow-0 transition-translate 700ms ease-in-out duration-700' style={{ translate: `${-100 * imgIndex}%` }} />
          ))}
        </div>
      </Link>

      <img className='absolute z-20 right-0 bottom-0 w-[100%] aspect-[8/3] contrast-200' src='..\public\assets\gallery\borders\galleryBorder.svg' />

      <div className='buttons z-50 absolute flex bg-[#ffffff00] text-white top-[47%] w-[100%]'>
        <button className='back ml-[2%] mr-auto scale-[0.8] h-[3.6em] rounded-full bg-[#e9e9e952] backdrop-blur-[4px] shadow-lg hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#1a26449c] active:translate-y-1 transition-all ease-in-out duration-180' onClick={() => handleBack()}>
          <FaArrowLeft size={25} />
        </button>
        <button className='forward ml-auto mr-[2%] scale-[0.8] h-[3.6em] rounded-full bg-[#e9e9e952] backdrop-blur-[4px] shadow-lg hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#1a26449c] active:translate-y-1 transition-all ease-in-out duration-180' onClick={() => handleForward()}>
          <FaArrowRight size={25} />
        </button>
      </div>

      <h1 className='title absolute top-[4%] left-[9%] z-20 text-[3.3vw] font-bold text-primary font-serif'>Make a Difference. Be a Volunteer.</h1>
      <h1 className='title2 absolute bottom-[2.8%] left-[2%] z-20 text-white bg-[#e9e9e952] p-[1.2%] rounded-3xl backdrop-blur-[4px] font-[600] shadow-lg '>{data[imgIndex].title}</h1>
      <button className='see-more absolute bottom-[5%] right-0 z-20 w-[33.4%] h-[11%] text-[1vw] rounded-3xl flex justify-center items-center gap-3 bg-primary-dark font-mono hover:bg-blue hover:text-[#f7f7fb] active:bg-[#264268] active:translate-y-1 transition-all ease-in-out duration-100' onClick={() => handleSeeMore}>
        See other upcoming events <FaArrowRight className='inline' size={15} />
      </button>
    </div>
  );
};

export default MainGallery;
