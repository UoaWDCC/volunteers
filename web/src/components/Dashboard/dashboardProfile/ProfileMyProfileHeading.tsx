
const ProfileMyProfileHeading = ({ name }: { name: string }) => {
  return (
    <div className="dashboard shadow-lg rounded-2xl overflow-hidden w-full h-full flex flex-col relative">
      {/* Blue header section */}
      <div className="dashboard bg-primary h-[62.5%] w-full"></div>

      {/* White bottom section */}
      <div className="bg-white h-[37.5%] flex items-center pl-6">
        {/* Profile name */}
        <span className="text-heading1 font-bold text-black ml-[180px]">{name}</span>
      </div>

      {/* Profile image placeholder */}
      <div className="absolute top-[145px] left-10">
        <div className="bg-black w-[129px] h-[129px] rounded-full"></div>
      </div>
    </div>
  );
};

export default ProfileMyProfileHeading;
