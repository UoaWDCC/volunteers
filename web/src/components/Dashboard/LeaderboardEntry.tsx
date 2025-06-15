import PlaceholderPFP from "./placeholderPfp";

interface LeaderboardEntryProps {
  rank: number;
  img?: string;
  fname?: string;
  lname?: string;
  hours?: number;
}

function LeaderboardEntry({ rank, img, fname, lname, hours }: LeaderboardEntryProps) {
  return (
    <div className="w-full mb-5 bg-white flex flex-row items-center">
      <p className="w-[10%] text-detail text-primary-dark justify-center text-center ">{rank}</p>

      <div className="w-[80%] flex flex-row items-center justify-start pl-[12%] gap-2">
        <PlaceholderPFP
          size="w-10 aspect-square"
          name={`${fname ?? ""} ${lname ?? ""}`}
          imageSource={img}
        />

        <p className="text-[9pt] truncate">
          {fname} {lname}
        </p>
      </div>

      <p className="w-[10%] text-[9pt] text-primary text-center">
        {hours ?? 0}
      </p>
    </div>
  );
}

export default LeaderboardEntry;
