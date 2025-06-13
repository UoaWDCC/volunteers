import LeaderboardEntry from "./LeaderboardEntry";
import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import PlaceholderPFP from "./placeholderPfp"; // Importing the PlaceholderPFP component

function Leaderboard() {
  const profileImg = "assets/EventHighlights/Events/BlindLowVision/imgA.png"; // Temporary image for the leaderboard
  const name = "John Doe"; // Temporary name for the leaderboard
  //const ranking = "1st"; // Temporary ranking for the leaderboard
  const hours = 14; // Temporary hours for the leaderboard

  const all = [
    {
      rank: 1,
      img: profileImg,
      name: name,
      hours: hours,
    },
    {
      rank: 2,
      img: profileImg,
      name: name,
      hours: hours,
    },
    {
      rank: 3,
      img: profileImg,
      name: name,
      hours: hours,
    },
    {
      rank: 4,
      img: profileImg,
      name: name,
      hours: hours,
    },
    {
      rank: 5,
      img: profileImg,
      name: name,
      hours: hours,
    },
    {
      rank: 6,
      img: profileImg,
      name: name,
      hours: hours,
    },
    {
      rank: 7,
      img: profileImg,
      name: name,
      hours: hours,
    },
    {
      rank: 8,
      img: profileImg,
      name: name,
      hours: hours,
    },
    {
      rank: 9,
      img: profileImg,
      name: name,
      hours: hours,
    },
  ]; // Temporary array for the leaderboard

  const friends = [
    {
      rank: 1,
      img: profileImg,
      name: "Jane Doe",
      hours: 12,
    },
    {
      rank: 2,
      img: profileImg,
      name: "Jane Doe",
      hours: 12,
    },
    {
      rank: 3,
      img: profileImg,
      name: "Jane Doe",
      hours: 12,
    },
  ]; // Temporary array for the leaderboard

  const colref = collection(db, "users");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getDocs(colref)
      .then((snapshot) => {
        let getUsers: any[] = [];
        snapshot.docs.forEach((doc) => {
          getUsers.push({ ...doc.data(), id: doc.id });
        });
        console.log(getUsers);
        setUsers(getUsers);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // helper function to get the name of the user 
  const getFullName = (user?: { firstName?: string; lastName?: string }) =>
  [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  //sort users by their hours
  const renderUsers = users.sort((a, b) => b.hours - a.hours).slice(0, 10);

  const [leaderboardFilter, setLeaderboardFilter] = useState("all"); // Filter for the leaderboard
  const [leaderboardData, setLeaderboardData] = useState(all); // Data for the leaderboard
  console.log(leaderboardData); // to satify the linter

  function changeLeaderboardFilter(filter: string) {
    setLeaderboardFilter(filter);
    if (filter == "all") {
      setLeaderboardData(all);
    } else {
      setLeaderboardData(friends);
    }
  }
  //   let rank = 1; // never used?

  return (
    <div className="w-full h-full pt-7 pb-2 flex flex-col items-center bg-white rounded-xl shadow-lg ">
      <h2 className="text-primary text-section-header font-semibold">
        Leaderboard
      </h2>

      {renderUsers.length > 0 ? (
        <>
          <PlaceholderPFP size="w-20 aspect-square" name= {getFullName(renderUsers[0])} imageSource= {renderUsers[0].profile_picture}/>

          <h3 className="text-detail my-2">
            {getFullName(renderUsers[0])}
          </h3>

          <div className="flex flex-row items-center justify-center">
            <p className="text-detail text-[10pt] text-primary-dark">
              {"Rank: 1st"}
            </p>
            <p className="text-detail text-[10pt] text-primary-dark ml-3">
              {"Hours: " + renderUsers[0].hours}
            </p>
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}


      <div className="flex flex-row items-center justify-center">
        <button
          className={
            leaderboardFilter == "all"
              ? "bg-white text-black after:block after:h-1 after:rounded-lg after:bg-primary-dark"
              : "bg-white text-grey"
          }
          onClick={() => changeLeaderboardFilter("all")}
        >
          All
        </button>
        <button
          className={
            leaderboardFilter == "friends"
              ? "bg-white text-black after:block after:h-1 after:rounded-lg after:bg-primary-dark"
              : "bg-white text-grey"
          }
          onClick={() => changeLeaderboardFilter("friends")}
        >
          My Friends
        </button>
      </div>
 
      <div className="w-[90%] mt-3 h-8 flex flex-row items-center justify-between bg-primary rounded-xl pt-4 px-3">
        <h3 className="text-[7pt] text-white">Rank</h3>
        <h3 className="text-[7pt] text-white">Volunteer</h3>
        <h3 className="text-[7pt] text-white">Hours</h3>
      </div>

      <div className="w-[90%] h-full flex flex-col pt-4 px-3 scrollbar-none overflow-y-scroll">
        {renderUsers.map((user: any, index: number) => (
          <LeaderboardEntry
            key={user.rank}
            rank={index + 1}
            img={user.profile_picture}
            fname={user.firstName}
            lname={user.lastName}
            hours={user.hours}
          />
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
