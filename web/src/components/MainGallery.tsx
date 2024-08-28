import axios from 'axios';
import { useEffect, useState } from 'react';
// import '../styles/componentStyles/MainGallery.css'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const   MainGallery = () => {
  // set the index of the current event to display
  const [imgIndex, setEventIndex] = useState(0);
  const [data, setData] = useState<{ title: string, image: string }[]>([{title: "", image: ""} ]);

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
    setEventIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const handleForward = () => {
    setEventIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };

  // function to autoscroll the images
  useEffect(() => {
    const interval = setInterval(() => {
      setEventIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    }, 7000);

    // return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [imgIndex, data.length]);

  

  return (
    <div className='gallery relative'>
      <div className='image flex overflow-hidden aspect-[8/3]'>
        {data.map((event, index) => (
          <img loading='lazy' src={event.image} key={index} className='picture object-cover w-[100%] h-[100%] shrink-0 grow-0 transition-translate 700ms ease-in-out duration-700' style={{ translate: `${-100 * imgIndex}%` }} />
        ))}
      </div>

      <img loading='lazy' className='absolute z-20 right-0 bottom-[-1px] w-[100%]' src='..\public\assets\gallery\borders\GalleryBord.svg' draggable='false' />

      <div className='buttons z-50 absolute flex bg-[#ffffff00] text-white top-[47%] w-[100%]'>
        <button className='back ml-[2%] mr-auto scale-[1] h-[3.6em] rounded-full bg-[#e9e9e952] backdrop-blur-[4px] shadow-lg hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#1a26449c] active:translate-y-1 transition-all ease-in-out duration-180' onClick={() => handleBack()}>
          <FaArrowLeft size={25} />
        </button>
        <button className='forward ml-auto mr-[2%] scale-[1] h-[3.6em] rounded-full bg-[#e9e9e952] backdrop-blur-[4px] shadow-lg hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#1a26449c] active:translate-y-1 transition-all ease-in-out duration-180' onClick={() => handleForward()}>
          <FaArrowRight size={25} />
        </button>
      </div>

      <h1 className='title absolute top-[4%] left-[9%] z-20 text-[3.3vw] font-bold text-primary font-serif'>Make a Difference. Be a Volunteer.</h1>
      <Link to={`/events/${imgIndex + 1}`}>
        <h1 className='title2 absolute bottom-[5.2%] left-[3%] z-20 text-white bg-[#e9e9e952] p-[1.3%] text-[2.4vw] rounded-3xl backdrop-blur-[4px] font-[600] shadow-lg '>{data[imgIndex].title}</h1>
      </Link>
      <button className='see-more absolute bottom-[2%] right-0 z-20 w-[33.1%] h-[13%] text-[1.3vw] rounded-3xl flex justify-center items-center gap-3 bg-primary font-mono hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#264268] active:translate-y-1 transition-all ease-in-out duration-100' onClick={() => handleSeeMore}>
        See other upcoming events! <FaArrowRight className='inline' size={20} />
      </button>
    </div>
  );
};

export default MainGallery;
