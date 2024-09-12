interface LeaderboardEntryProps {
    rank: number;
    img: string;
    name: string;
    hours: number;
}

function LeaderboardEntry({ rank, img, name, hours }: LeaderboardEntryProps) {
  return (
    <div className="w-full mb-1 bg-white flex flex-row items-center">
        <p className="w-[10%] text-detail text-primary-dark text-center">{rank}</p>
        <div className="w-[80%] flex flex-row items-center justify-start pl-[12%]">
            <img src={img} alt="profile" className="object-cover w-[30px] h-[30px] rounded-full mt-[-15px] mr-2" />
            <p className="text-[9pt] truncate">{name}</p>
        </div>
        <p className="w-[10%] text-[9pt] text-primary text-center">{hours}</p>
    </div>
  );
}

export default LeaderboardEntry;