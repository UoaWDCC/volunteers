import LeaderboardEntry from "./LeaderboardEntry";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthenticationContext from "../../context/AuthenticationContext";

function Leaderboard() {
  const authContext = useContext(AuthenticationContext);
  const { firestoreUserDetails } = authContext as unknown as {firestoreUserDetails: any};

  const [users, setUsers] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    const appUrl = import.meta.env.VITE_API_URL;
    axios
      .get(`${appUrl}/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    
    axios
      .get(`${appUrl}/api/friends/${firestoreUserDetails.uid}`)
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  
  const [leaderboardFilter, setLeaderboardFilter] = useState("all"); // Filter for the leaderboard

  function changeLeaderboardFilter(filter: string) {
    setLeaderboardFilter(filter);
  }
  
  const leaderboardData = leaderboardFilter === "all" ? users : friends;
  //sort users by their hours
  const renderUsers = leaderboardData.sort((a, b) => b.hours - a.hours).slice(0, 10);

  return (
    <div className="w-full h-full pt-7 pb-2 flex flex-col items-center bg-white rounded-xl shadow-lg ">
      <h2 className="text-primary text-section-header font-semibold">
        Leaderboard
      </h2>

      {renderUsers.length > 0 ? (
        <>
          <img
            src={renderUsers[0].profile_picture}
            alt="profile"
            className="object-cover w-[90px] h-[90px] rounded-full m-2"
          />

          <h3 className="text-detail mb-1">
            {renderUsers[0].firstName} {renderUsers[0].lastName}
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
