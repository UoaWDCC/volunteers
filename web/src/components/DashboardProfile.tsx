import { useContext } from "react";
import ProfileEditModal from "./ProfileEditModal";
import ProfileEditModalContext from "../context/ProfileEditModalContext";
import RegisterErrorModal from "./RegisterErrorModal";
import RegisterModalErrorContext from "../context/RegisterModalErrorContext";

function DashboardProfile() {
    const { showModal, setShowModal } = useContext(ProfileEditModalContext);
    // const { showModal, setShowModal } = useContext(RegisterModalErrorContext);

    function handleShowModal() {
        setShowModal(true);
    }
  return (
    <div className="overflow-hidden flex flex-col w-[100%] h-screen px-5">

                {showModal && (<ProfileEditModal/>)}
                {/* width of the gallery */}
                <div className='flex flex-col bg-red-100 mb-5 h-[40%]'>
                    <h1>top component</h1>
                    <button onClick={handleShowModal}>click</button>
                </div>
                    
                <div className='bg-green-100 flex flex-row justify-between gap-5 mb-5 h-[60%]'>
                    {/* adjust sizes and stuff as needed */}
                    <div className="bg-orange-100 w-[65%] h-[700px]">
                        <p>profile overview</p>
                    </div>

                    <div className="bg-purple-100 w-[35%] h-[500px]">
                        <p>hour tracker</p>
                    </div>
                </div>
            
        </div>
        
  );
}

export default DashboardProfile;