import React from 'react';

interface CloseSuccessPopupProps {
    onClose: () => void;
}

const CloseSuccessPopup: React.FC<CloseSuccessPopupProps> = ({ onClose }) => {

    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '238px',
                height: '46px',
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 11.2px rgba(0, 0, 0, 0.25)',
                borderRadius: '11px',
                display: 'flex',
                alignItems: 'center',
                paddingRight: '12px',
                zIndex: 1000,
            }}
        >

            <div
                style={{
                    width: '10px',
                    height: '100%',
                    borderRadius: '8px 0px 0px 8px',
                    background: 'linear-gradient(180deg, #F3F5F7 0%, #5F7FC3 100%)',
                    marginRight: '12px',
                    }}
            ></div>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingTop: '1px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/assets/dashboard/successIcon.png"
                        alt="success"
                        style={{ width: '15px', height: '15px', marginRight: '5px' }}
                    />
                    <span style={{ fontWeight: 600, fontSize: '13px', color: '#0034A1' }}>
                        Success!
                    </span>
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(0, 52, 161, 0.63)', marginTop: '-2px' }}>
                    Submitted successfully.
                </div>
            </div>

            <img
                src="/assets/dashboard/closeButton.png"
                alt="close"
                style={{ position: 'absolute', top: '10px', right: '13px', width: '11px', height: '11px', cursor: 'pointer', marginLeft: '8px'}}
                onClick={onClose}
            />
        </div>
    );
};

export default CloseSuccessPopup;