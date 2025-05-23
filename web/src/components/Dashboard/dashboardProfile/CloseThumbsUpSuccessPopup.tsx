import React from 'react';

interface CloseThumbsUpSuccessPopupProps {
    onClose: () => void;
}

const CloseThumbsUpSuccessPopup: React.FC<CloseThumbsUpSuccessPopupProps> = ({ onClose }) => {
  
    return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{ width: '238px', height: '308px', zIndex: 1000 }}
    >
      {/* Outer Container */}
      <div
        style={{
          width: '238px',
          height: '308px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0px 4px 11.2px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          padding: '0',
        }}
      >
        {/* Vector background shape */}
        <img
          src="/assets/dashboard/thumbs-up-vector.svg"
          alt="background vector"
          style={{
            position: 'absolute',
            width: '150px',
            height: '118px',
            left: '45px',
            top: '33px',
          }}
        />

        {/* Thumb image */}
        <img
          src="/assets/dashboard/thumbs-up.svg"
          alt="Thumbs up"
          style={{
            position: 'absolute',
            width: '109px',
            height: '99px',
            left: '65px',
            top: '42px',
          }}
        />

        {/* Success text */}
        <div
          style={{
            position: 'absolute',
            left: '66px',
            top: '159px',
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '36px',
            color: '#0034A0',
          }}
        >
          Success!
        </div>

        {/* Subtitle text */}
        <div
          style={{
            position: 'absolute',
            left: '49px',
            top: '190px',
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '18px',
            color: 'rgba(0, 52, 161, 0.63)',
          }}
        >
          Successfully submitted.
        </div>

        {/* Continue Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            width: '147px',
            height: '30px',
            left: '46px',
            top: '240px',
            borderRadius: '11px',
            background:
              'linear-gradient(95.59deg, rgba(253, 253, 248, 0.63) 0%, rgba(0, 52, 160, 0.63) 56.2%)',
            color: '#FFFFFF',
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: '18px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CloseThumbsUpSuccessPopup;
