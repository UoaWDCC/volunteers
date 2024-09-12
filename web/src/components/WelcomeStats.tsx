// WelcomeStats
import { Link } from "react-router-dom";

function WelcomeStats() {
  // future fetch data from the server. (User, Hours, Shifts, etc.)
  // =========== TEMPORARY: hard code data ===========
  const Data = {
    User: "[placeholder]",
    Hours: 40,
    Shifts: 5,
  };

  const { User, Hours, Shifts } = Data;
  // =========== TEMPORARY: hard code data ===========

  return (
    <div className="theme-dashboard bg-white flex items-center rounded-[50px] px-[4%] py-[2%] w-[45%] gap-[2%]">
      <div className="text-gray mr-auto w-[50%] min-h-[0]">
        <h1 className="text-3xl">
          Welcome Back, <span className="user-on-new-line">{User}!</span>
        </h1>
        <h3 className="text-detail mb-[5%]">
          Glad to see you're back in action!
        </h3>
        <Link
          className="see-more bg-primary text-white text-[11px] m-0 px-[4%] py-[1.5%] rounded-[100px] hover:bg-primary-dark hover:no-underline"
          to="/"
        >
          See More
        </Link>
      </div>

      <div className="text-gray justify-between flex gap-[5px] ml-auto w-[50%]">
        <div className="bg-gray-100 flex justify-around flex-col rounded-[30px] px-[15%] py-[5%] text-center items-center">
          <h2 className="m-0 mt-[20%]">{Hours}</h2>
          <p className="m-0 my-[20%] font-medium">Hours</p>
        </div>
        <div className="bg-gray-100 flex justify-around flex-col rounded-[30px] px-[15%] py-[5%] text-center items-center">
          <h2 className="m-0 mt-[20%]">{Shifts}</h2>
          <p className="m-0 mb-[20%] font-medium">Shifts</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeStats;
