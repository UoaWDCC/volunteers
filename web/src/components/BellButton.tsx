import "../styles/componentStyles/BellButton.css";
import { useState } from 'react';
import NotificationTab from "./NotificationTab";

function BellButton() {
    const [showNoti,setShowNoti] = useState(false);
    const handleClick=() => {
        setShowNoti(!showNoti);
    }
    return(
        <div className='bellButtonContainer'>
            <button className='bellButton' onClick={handleClick}>
                <img src='src/assets/bell-icon.svg' alt='bell-icon' />
            </button>
            {showNoti && <NotificationTab/>}
        </div>
    );
}

export default BellButton