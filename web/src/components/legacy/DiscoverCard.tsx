
const DiscoverCard = () => {
    return ( 
        <div className="bg-white shadow-md rounded-[5px] p-[5px] w-[192px] h-[348px] bg-[url('https://via.placeholder.com/192x348')] flex items-center absolute">
            <div className="bg-[#f7f7fb] rounded-[10%] absolute bottom-[8px] text-left w-[179px] h-[110px]">
                <h2 className="text-[#323232] no-underline font-medium text-[15px] m-[5px] ml-[15px]">Produce Packer</h2>
                <p className="text-[#323232] no-underline font-medium text-[10px] m-0 ml-[15px]">Company</p>
                <p className="text-[#323232] no-underline font-medium text-[10px] m-0 ml-[15px]">Day</p>
                <p className="text-[#323232] no-underline font-medium text-[10px] m-0 ml-[15px]">Time</p>
                <p className="text-[#323232] no-underline font-medium text-[10px] m-0 ml-[15px]">Hours</p>
            </div>
            <button className="bg-[#3c9ddd] rounded-[18px] p-[1.8%_3.5%] no-underline text-white text-[0.6vw] transition-all duration-[400ms] ease w-[67px] h-[24px] absolute bottom-[10px] right-[10px] float-right hover:bg-[#307caf]">
                More info
            </button>
        </div>
     );
}
 
export default DiscoverCard;