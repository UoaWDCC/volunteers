// WelcomeStats
import { Link } from "react-router-dom";

function WelcomeStats() {
  const Data = {
    User: "[placeholder]",
    Hours: 40,
  };

  const { User, Hours } = Data;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-blue-600">
          Welcome back {User}!
        </h1>
        <p className="text-gray-500">Glad to see you're back in action!</p>
        <div className="mt-4">
          <div className="flex justify-between text-sm font-semibold text-gray-500">
            <span>Level 2</span>
            <span>Level 3</span>
          </div>
          <div className="bg-gray-300 rounded-full h-2 mt-2 relative">
            <div className="bg-blue-500 h-2 rounded-full w-[70%]"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">6 more hours to go!</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold">{Hours}</span>
        <span className="text-gray-500">Hours</span>
      </div>

      <div className="ml-6">
        <img
          src="https://via.placeholder.com/100"
          alt="Heart Hands"
          className="w-20 h-20"
        />
      </div>
    </div>
  );
}

export default WelcomeStats;
