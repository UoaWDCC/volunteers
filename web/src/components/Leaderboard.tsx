function Leaderboard() {
    const profileImg = "assets/gallery/events/sample1.png"; // Temporary image for the leaderboard

    return (
        <div className="h-full w-4/5 pt-7 flex flex-col items-center bg-white rounded-2xl">
            <h2 className="text-primary text-section-header font-semibold">Leaderboard</h2>
            <img src={profileImg} alt="profile" className="w-[90px] h-[90px] rounded-full" />
        </div>
    );
}

export default Leaderboard;