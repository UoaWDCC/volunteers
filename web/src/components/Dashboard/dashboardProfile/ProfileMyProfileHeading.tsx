import PlaceholderPFP from "@components/Dashboard/placeholderPfp";

interface ProfileHeadingProps {
  img?: string;
  name?: string;
}

const ProfileMyProfileHeading = ({ img, name}: ProfileHeadingProps) => {
  return (
    <div className="dashboard shadow-lg rounded-xl overflow-hidden w-full h-full flex flex-col relative">
      {/* Blue header section */}
      <div className="dashboard bg-primary h-[62.5%] w-full"></div>

      {/* White bottom section */}
      <div className="bg-white h-[37.5%] flex items-center pl-6">
        {/* Profile name */}
        <span className="text-heading1 font-bold text-black ml-[180px]">{name}</span>
      </div>
    
      <div className="absolute bottom-[15%] left-10">
        <PlaceholderPFP size="w-28 aspect-square" name={`${name}`} imageSource={img}/>
      </div>
    </div>
  );
};

export default ProfileMyProfileHeading;
