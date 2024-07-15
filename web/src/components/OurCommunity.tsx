import MainPageButtonHeadings from "./MainPageButtonHeadings";
 
const OurCommunity = () => {
    return (
        <div className="flex flex-col items-center h-screen bg-neutral text-black font-medium">
            
            <div className="relative w-full h-screen">
                <div className="flex flex-col items-center">
                    <MainPageButtonHeadings heading="Our Community"/>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-center font-medium w-[36rem] leading-[1.2rem] mt-[4rem]">
                        Join our community to start tracking your efforts!
                        <br />
                        Create an account to log your hours, connect with others, and stay updated on our events.
                        With over:
                    </div>
                    <div className="text-center text-[5rem] leading-[150%] font-semibold mt-[3.5rem]">1,200</div>
                    <div className="text-center text-[1.4rem]">volunteers in our club</div>
                    <button className="text-white text-[0.7rem] py-[1rem] mt-[2.2rem] rounded-[30px] px-8 leading-[0.5rem] bg-primary">
                        Sign me up!
                    </button>
                </div>

                <div className="absolute top-0 left-0 right-0 flex flex-col items-center">
                    <div className="flex w-full h-1/2">
                        <img
                            className="object-cover rounded-[20px] ml-[10vw] mt-[5vh] h-[25vh] w-[19vh] transform rotate-[-15deg]"
                            src="/assets/gallery/events/sample1.png"
                            title="img1"
                            alt="img1"
                        />
                        <img
                            className="object-cover rounded-[20px] ml-[53vw] mt-[12vh] h-[35vh] w-[27vh] transform rotate-[17deg]"
                            src="/assets/gallery/events/sample3.png"
                            title="img2"
                            alt="img2"
                        />
                    </div>
                    <div className="flex w-full h-1/2">
                        <img
                            className="object-cover rounded-[20px] ml-[23vw] mt-[5vh] h-[35vh] w-[30vh] transform rotate-[7deg]"
                            src="/assets/gallery/events/sample3.png"
                            title="img3"
                            alt="img3"
                        />
                        <img
                            className="object-cover rounded-[20px] ml-[25vw] mt-[8vh] h-[25vh] w-[17vh] transform rotate-[-7deg]"
                            src="/assets/gallery/events/sample4.png"
                            title="img4"
                            alt="img4"
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
 };
 
 export default OurCommunity;
 