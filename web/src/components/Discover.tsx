
import DiscoverCard from "./DiscoverCard";
function Discover() {
  return (
  <div className="flex bg-neutral rounded-md m-auto items-center relative flex-col h-[503px] w-[779px] border-black">
     <div className = "flex p-[10px] flex-wrap justify-between absolute top-0 w-4/5 items-center">
      <div className="float-left">
        <h1 className="text-black font-medium text-[2.1vw] m-[100px] top-0 left-0">Discover</h1>
      </div>
      <div className="float-right">
        <button className="bg-[#3c9ddd] rounded-[18px] p-[1.8%_3.5%] text-white text-[0.6vw] transition-all duration-400 ease-out w-[67px] h-[24px] absolute bottom-[10px] right-[10px] float-right text-center">View all</button>
      </div>
    </div>
    <div className="p-[1px] flex flex-wrap justify-between absolute bottom-0 w-[80%]">
        <DiscoverCard/>
        <DiscoverCard/>
        <DiscoverCard/>
    </div>
  </div>
  );
}

export default Discover;
