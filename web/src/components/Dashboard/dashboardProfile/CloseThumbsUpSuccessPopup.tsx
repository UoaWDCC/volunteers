import React from 'react';

interface CloseThumbsUpSuccessPopupProps {
    onClose: () => void;
}

const CloseThumbsUpSuccessPopup: React.FC<CloseThumbsUpSuccessPopupProps> = ({ onClose }) => {
  
    return (
    <div
      className="
        fixed top-1/2 left-1/2 
        transform -translate-x-1/2 -translate-y-1/2 
        w-[238px] h-[308px] 
        z-[1000]
      "
    >
      {/* Outer Container */}
      <div className="
        w-full h-full bg-white 
        rounded-[20px] 
        shadow-[0px_4px_11.2px_rgba(0,0,0,0.25)] 
        relative
      ">
        {/* Vector background shape */}
        <img
          src="/assets/dashboard/thumbs-up-vector.svg"
          alt="background"
          className="absolute w-[150px] h-[118px] left-[45px] top-[33px]"
        />

        {/* Thumb image */}
        <img
          src="/assets/dashboard/thumbs-up.svg"
          alt="Thumbs up"
          className="absolute w-[109px] h-[99px] left-[65px] top-[42px]"
        />

        {/* Success text */}
        <div className="
          absolute left-[66px] top-[159px] 
          font-poppins font-semibold 
          text-[24px] leading-[36px] 
          text-[#0034A0]
        ">
          Success!
        </div>

        {/* Subtitle text */}
        <div className="
          absolute left-[49px] top-[190px] 
          font-poppins font-normal 
          text-[12px] leading-[18px] 
          text-[#0034A1]/60
        ">
          Successfully submitted.
        </div>

        {/* Continue Button */}
        <button
          onClick={onClose}
          className="
            absolute left-[46px] top-[240px] 
            w-[147px] h-[30px]
            rounded-[11px] 
            bg-gradient-to-r from-[#FDFDF8]/90 to-[#0034A0]/50
            flex items-center justify-center 
            font-poppins font-semibold text-[12px] leading-[18px] 
            text-white
          "
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CloseThumbsUpSuccessPopup;