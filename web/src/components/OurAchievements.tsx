import MainPageButtonHeadings from "./MainPageButtonHeadings";

const OurAchievements = () => {
  return (
    <div className="flex flex-col items-center h-screen bg-neutral font-medium">
      <MainPageButtonHeadings heading="Our Achievements" />
      <div className="achievements flex flex-row gap-4 items-center mt-8">
        <img
          className="rounded-[30px] object-cover w-[150px] h-[200px]"
          src="/assets/gallery/events/sample1.png"
          title="img1"
          alt="img1"
        />

        <div className="w-[180px] h-[250px] bg-lightGrey font-semibold tracking-[-1px] rounded-[30px]">
          <p className="text-center text-lg leading-[8px] mt-12">
            Relay for life:
          </p>
          <p className="text-center text-lg leading-[8px]">Silver Award</p>
          <p className="text-center text-[2.3em] leading-[8px] mt-12 mb-10">
            $8,043
          </p>
          <p className="text-center text-lg leading-[8px]">raised</p>
        </div>

        <img
          className="rounded-[30px] object-cover w-[300px] h-[350px]"
          src="/assets/gallery/events/sample3.png"
          title="img2"
          alt="img2"
        />

        <div className="w-[180px] h-[250px] bg-lightGrey font-semibold tracking-[-1px] rounded-[30px]">
          <p className="text-center text-lg leading-[8px] mt-12">
            UoA Clubs Awards:
          </p>
          <p className="text-center text-lg leading-[8px]">Runner Up</p>
          <p className="text-center text-[2.3em] leading-[8px] mt-12 mb-10">
            2023
          </p>
          <p className="text-center text-lg leading-[8px]">Cause of the Year</p>
        </div>

        <img
          className="rounded-[30px] object-cover w-[150px] h-[200px]"
          src="/assets/gallery/events/sample4.png"
          title="img3"
          alt="img3"
        />
      </div>
    </div>
  );
};

export default OurAchievements;
