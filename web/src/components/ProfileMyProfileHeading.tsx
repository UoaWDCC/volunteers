
const ProfileMyProfileHeading = ({ name }: { name: string }) => {
  return (
    <div className="dashboard shadow-lg rounded-lg overflow-hidden w-[1035px] h-[256px] relative">
      {/* Blue header section */}
      <div className="dashboard bg-primary h-[160px]"></div>

      {/* White bottom section */}
      <div className="bg-white h-[96px] flex items-center pl-6">
        {/* Profile name */}
        <span className="text-heading1 font-bold text-black ml-[150px]">{name}</span>
      </div>

      {/* Profile image placeholder (overlaying both blue and white sections) */}
      <div className="absolute top-[96px] left-6">
        <div className="bg-black w-[129px] h-[129px] rounded-full"></div>
      </div>
    </div>
  );
};

export default ProfileMyProfileHeading;
