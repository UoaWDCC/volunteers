function Leaderboard() {
    const profileImg = "assets/gallery/events/sample1.png"; // Temporary image for the leaderboard
    const name = "John Doe"; // Temporary name for the leaderboard
    const ranking = "1st"; // Temporary ranking for the leaderboard
    const hours = "14"; // Temporary hours for the leaderboard

    return (
        <div className="h-full w-4/5 pt-7 flex flex-col items-center bg-white rounded-2xl">
            <h2 className="text-primary text-section-header font-semibold">Leaderboard</h2>

            <img src={profileImg} alt="profile" className="w-[90px] h-[90px] rounded-full m-2" />
            
            <h3 className="text-detail mb-1">{name}</h3>

            <div className="flex flex-row items-center justify-center">
                <p className="text-detail text-[10pt] text-primary-dark">{"Rank: " + ranking}</p>
                <p className="text-detail text-[10pt] text-primary-dark ml-5">{"Hours: " + hours}</p>
            </div>
        </div>
    );
}

export default Leaderboard;