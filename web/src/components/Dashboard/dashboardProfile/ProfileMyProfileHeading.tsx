
const ProfileMyProfileHeading = ({ name }: { name: string }) => {
  return (
    <div className="dashboard shadow-lg rounded-xl overflow-hidden w-full h-full flex flex-col relative">
      {/* Blue header section */}
      <div className="dashboard bg-primary h-[62.5%] w-full"></div>

      {/* White bottom section */}
      <div className="bg-white h-[37.5%] flex items-center pl-6">
        {/* Profile name */}
        <span className="text-heading1 font-bold text-black ml-[180px]">{name}</span>
      </div>

      {/* Profile image placeholder */}
      <div className="absolute bottom-[15%] left-10">
        <div className="bg-black w-[8rem] h-[8rem] rounded-full"></div>
      </div>
    </div>
  );
};

export default ProfileMyProfileHeading;
