import { useState } from "react";
import LeaderboardEntry from "./LeaderboardEntry";

interface LeaderboardEntryProps {
    rank: number;
    img: string;
    name: string;
    hours: number;
}

function Leaderboard() {
    const profileImg = "assets/EventHighlights/Events/BlindLowVision/imgA.png"; // Temporary image for the leaderboard
    const name = "John Doe"; // Temporary name for the leaderboard
    const ranking = "1st"; // Temporary ranking for the leaderboard
    const hours = 14; // Temporary hours for the leaderboard

    const all = [{
        rank: 1,
        img: profileImg,
        name: name,
        hours: hours
    },
    {
        rank: 2,
        img: profileImg,
        name: name,
        hours: hours
    },
    {
        rank: 3,
        img: profileImg,
        name: name,
        hours: hours
    },
    {
        rank: 4,
        img: profileImg,
        name: name,
        hours: hours
    },
    {
        rank: 5,
        img: profileImg,
        name: name,
        hours: hours
    },{
        rank: 6,
        img: profileImg,
        name: name,
        hours: hours
    },
    {
        rank: 7,
        img: profileImg,
        name: name,
        hours: hours
    },
    {
        rank: 8,
        img: profileImg,
        name: name,
        hours: hours
    },
    {
        rank: 9,
        img: profileImg,
        name: name,
        hours: hours
    }
    ]; // Temporary array for the leaderboard

    const friends = [{
        rank: 1,
        img: profileImg,
        name: "Jane Doe",
        hours: 12
    },
    {
        rank: 2,
        img: profileImg,
        name: "Jane Doe",
        hours: 12
    },
    {
        rank: 3,
        img: profileImg,
        name: "Jane Doe",
        hours: 12
    }
    ]; // Temporary array for the leaderboard

    const [leaderboardFilter, setLeaderboardFilter] = useState("all"); // Filter for the leaderboard
    const [leaderboardData, setLeaderboardData] = useState(all); // Data for the leaderboard

    function changeLeaderboardFilter(filter: string) {
        setLeaderboardFilter(filter);
        if (filter == "all") {
            setLeaderboardData(all);
        } else {
            setLeaderboardData(friends);
        }
    }

    return (
        <div className="h-full w-full pt-7 pb-2 flex flex-col items-center bg-white rounded-2xl">
            <h2 className="text-primary text-section-header font-semibold">Leaderboard</h2>

            <img src={profileImg} alt="profile" className="object-cover w-[90px] h-[90px] rounded-full m-2" />
            
            <h3 className="text-detail mb-1">{name}</h3>

            <div className="flex flex-row items-center justify-center">
                <p className="text-detail text-[10pt] text-primary-dark">{"Rank: " + ranking}</p>
                <p className="text-detail text-[10pt] text-primary-dark ml-3">{"Hours: " + hours}</p>
            </div>

            <div className="flex flex-row items-center justify-center">
                <button className={leaderboardFilter == "all" ? "bg-white text-black after:block after:h-1 after:rounded-lg after:bg-primary-dark" :"bg-white text-grey"} onClick={() => changeLeaderboardFilter("all")}>All</button>
                <button className={leaderboardFilter == "friends" ? "bg-white text-black after:block after:h-1 after:rounded-lg after:bg-primary-dark" :"bg-white text-grey"} onClick={() => changeLeaderboardFilter("friends")}>My Friends</button>
            </div>

            <div className="w-[90%] mt-3 h-8 flex flex-row items-center justify-between bg-primary rounded-xl pt-4 px-3">
                <h3 className="text-[7pt] text-white">Rank</h3>
                <h3 className="text-[7pt] text-white">Volunteer</h3>
                <h3 className="text-[7pt] text-white">Hours</h3>
            </div>

            <div className="w-[90%] h-full flex flex-col pt-4 px-3 scrollbar-none overflow-y-scroll">
                {leaderboardData.map((entry: LeaderboardEntryProps) => (
                    <LeaderboardEntry key={entry.rank} rank={entry.rank} img={entry.img} name={entry.name} hours={entry.hours} />
                ))}
            </div>
        </div>
    );
}

export default Leaderboard;