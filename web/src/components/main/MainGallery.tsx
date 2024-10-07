import axios from 'axios';
import { useEffect, useState } from 'react';
// import '../styles/componentStyles/MainGallery.css'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface GalleryData {
  title: string;
  image: string;
}

const MainGallery = () => {
  // set the index of the current event to display
  const [imgIndex, setImgIndex] = useState(0);
  const [data, setData] = useState<GalleryData[]>([
    {
      title: "Relay For Life",
      image: "/assets/EventHighlights/Events/RelayForLife/imgB.png"
    },
    {
      title: "Volunteers Day",
      image: "/assets/EventHighlights/Events/VolunteersDay/imgB.png"
    },
    {
      title: "Blind Low Vision",
      image: "/assets/EventHighlights/Events/BlindLowVision/imgB.png"
    },
    {
      title: "Pub Quiz",
      image: "/assets/EventHighlights/Events/PubQuiz/imgB.png"
    }
  ]);

  useEffect(() => {
    // Fetch gallery data
    axios.get('http://localhost:3000/api/homepage/gallery')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
    , []);

  // =============== NOT YET IMPLEMENTED ===============
  // function to handle the "See other upcoming events" button when clicked
  const handleSeeMore = () => {
    console.log('See more');
  };
  // ===================================================

  // handle the back and forward buttons to change the image
  const handleBack = () => {
    setImgIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const handleForward = () => {
    setImgIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };

  // function to autoscroll the images
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    }, 7000);

    // return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [imgIndex, data.length]);

  return (
    <div className="flex justify-around py-[8rem] px-[2rem] bg-neutral">
      <div className='relative w-[100rem] h-[42rem]'>
        <div className='flex overflow-hidden w-full h-full rounded-3xl'>
          {data.map((event, index) => (
            <img loading='lazy' src={event.image} key={index} className='w-full h-full shrink-0 grow-0 transition-translate ease-in-out duration-700' style={{ translate: `${-100 * imgIndex}%` }} />
          ))}
        </div>

        <div className='buttons z-50 absolute flex bg-[#ffffff00] text-white top-[47%] w-[100%]'>
          <button className='back ml-[2%] mr-auto scale-[1] h-[3.6em] rounded-full bg-[#C7D6E7]/[0.6] backdrop-blur-[4px] shadow-lg hover:bg-primary/[0.6] hover:text-[#f7f7fb] active:translate-y-1 transition-all ease-in-out duration-180' onClick={() => handleBack()}>
            <FaArrowLeft size={25} />
          </button>
          <button className='forward ml-auto mr-[2%] scale-[1] h-[3.6em] rounded-full bg-[#e9e9e952] backdrop-blur-[4px] shadow-lg hover:bg-primary/[0.6] hover:text-[#f7f7fb] active:translate-y-1 transition-all ease-in-out duration-180' onClick={() => handleForward()}>
            <FaArrowRight size={25} />
          </button>
        </div>

        <div className="flex justify-center items-center absolute top-0 left-0 bg-neutral w-[80%] h-[128px] rounded-br-3xl before:content-[''] before:absolute before:h-[40px] before:w-[40px] before:bg-transparent before:top-[128px] before:left-0 before:rounded-tl-full before:shadow-tLInv after:content-[''] after:absolute after:h-[40px] after:w-[40px] after:bg-transparent after:top-0 after:right-[-40px] after:rounded-tl-full after:shadow-tLInv">
          <h1 className='font-bold text-primary text-[3.8rem] font-serif mt-2 z-50'>Make a Difference. Be a Volunteer.</h1>
        </div>
        <Link to={`/events/${imgIndex + 1}`}>
          <h1 className='absolute bottom-[8%] left-[2%] z-20 text-white bg-[#e9e9e952] px-6 py-3 text-[2.4vw] rounded-3xl backdrop-blur-[4px] font-[600] shadow-lg '>{data[imgIndex].title}</h1>
        </Link>
        <div className="flex justify-center items-center absolute bottom-0 right-0 bg-neutral w-[37%] h-[7rem] rounded-tl-[2.6rem] before:content-[''] before:absolute before:h-[40px] before:w-[40px] before:bg-transparent before:bottom-0 before:left-[-40px] before:rounded-br-full before:shadow-bRInv after:content-[''] after:absolute after:h-[40px] after:w-[40px] after:bg-transparent after:top-[-40px] after:right-0 after:rounded-br-full after:shadow-bRInv">
          <button className='see-more w-[90%] h-[4rem] text-[1.4rem] rounded-3xl flex justify-center items-center gap-3 bg-primary font-mono hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#264268] active:translate-y-1 transition-all ease-in-out duration-100 z-50' onClick={() => handleSeeMore}>
            See other upcoming events! <FaArrowRight className='inline sm:max-2xl:hidden' size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default MainGallery;
