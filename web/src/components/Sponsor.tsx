import { useState } from "react";
import { Link } from "react-router-dom";

interface SponsorData {
    logo: string,
    name: string,
    discount: string, 
    website: string
  }

const Sponsor = ({logo, name, discount, website}: SponsorData) => {
    const [showDiscount, setShowDiscount] = useState(false);

    return (
        <Link to={website} className="flex flex-col items-center" onMouseEnter={() => {setShowDiscount(true)}} onMouseLeave={() => {setShowDiscount(false)}}>
            <img loading="lazy" src={logo} alt={name} className="max-w-[100px] rounded-full" />
            {showDiscount && <div className="flex flex-col items-center z-10 absolute mt-[95px]">
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-lightGrey mt-2"></div>
                <div className="bg-lightGrey h-[70px] rounded-[10px] flex flex-col justify-center">
                    <div className="ml-[0.7rem] mt-[-0.7rem] text-[0.6rem]">{name}</div>
                    <div className="mx-auto px-[2.5rem] mt-[0.1rem]">{discount}</div>
                </div>
            </div>}
        </Link>
    );
}

export default Sponsor;