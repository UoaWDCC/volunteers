interface LeaderboardEntryProps {
    rank: number;
    img: string;
    name: string;
    hours: number;
}
 
function LeaderboardEntry({ img, fname, lname, hours }: any) {
  return (
    <div className="w-full mb-5 bg-white flex flex-row items-center">
        <div className="w-[80%] flex flex-row items-center justify-start pl-[12%]">
            <img src={img} alt="profile" className="object-cover w-[30px] h-[30px] rounded-full mt-[-15px] mr-2" />
            <p className="text-[9pt] truncate">{fname} {lname}</p>
        </div>
        <p className="w-[10%] text-[9pt] text-primary text-center">{hours}</p>
    </div>
  );
}

export default LeaderboardEntry;