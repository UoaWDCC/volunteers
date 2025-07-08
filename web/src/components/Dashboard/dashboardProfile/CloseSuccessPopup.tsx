import React from 'react';

interface CloseSuccessPopupProps {
    onClose: () => void;
}

const CloseSuccessPopup: React.FC<CloseSuccessPopupProps> = ({ onClose }) => {

    return (
        <div
            className="
                fixed top-1/2 left-1/2 
                transform -translate-x-1/2 -translate-y-1/2 
                w-[238px] h-[46px] 
                bg-white shadow-[0px_4px_11.2px_rgba(0,0,0,0.25)] 
                rounded-[11px] flex items-center pr-3 
                z-[1000]
            "
        >

            <div
                className="
                    w-[10px] h-full 
                    rounded-l-[8px] 
                    bg-gradient-to-b from-[#F3F5F7] to-[#5F7FC3] 
                    mr-3
                "
            />

            <div className="flex flex-col flex-1 pt-[1px]">
                <div className="flex items-center">
                <img
                    src="/assets/dashboard/successIcon.png"
                    alt="success"
                    className="w-[15px] h-[15px] mr-[5px]"
                />
                <span className="font-semibold text-[13px] text-[#0034A1]">
                    Success!
                </span>
                </div>
                <div className="text-[10px] text-[#0034A1]/60 mt-[-2px]">
                    Submitted successfully.
                </div>
            </div>

            <img
                src="/assets/dashboard/closeButton.png"
                alt="close"
                onClick={onClose}
                className="
                    absolute top-[10px] right-[13px] 
                    w-[11px] h-[11px] cursor-pointer 
                    ml-2
                "
            />
        </div>
    );
};

export default CloseSuccessPopup;