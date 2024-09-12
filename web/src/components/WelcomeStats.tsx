// WelcomeStats

function WelcomeStats() {
  const Data = {
    User: "John Doe",
    Hours: 40,
  };

  const { User, Hours } = Data;

  return (
    <div className="bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <div className="flex-1 p-6 ml-5">
        <h1 className="text-4xl font-bold text-primary">
          Welcome back {User}!
        </h1>
        <p className="text-black">Glad to see you're back in action!</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4 w-[100%]">
            <div className="flex justify-between text-sm font-semibold text-gray-500">
              <span>Level 2</span>
              <span>Level 3</span>
            </div>
            <div className="bg-gray-300 rounded-full h-4 mt-2 relative">
              <div className="bg-primary h-4 rounded-full w-[70%]" />
            </div>
            <p className="text-sm text-black mt-2">6 more hours to go!</p>
          </div>
          <div className="mt-6">
            <span className="text-4xl font-bold">{Hours}</span>
            <span className="text-black pl-1">hours</span>
          </div>
        </div>
      </div>

      <div className="ml-6">
        <img
          src="./public/assets/dashboard/welcomeHandHeart.png"
          alt="Heart Hands"
          className="w-[100%] h-[100] rounded-xl"
        />
      </div>
    </div>
  );
}

export default WelcomeStats;
