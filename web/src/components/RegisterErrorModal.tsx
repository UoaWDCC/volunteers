import { useContext } from 'react';
import RegisterModalErrorContext from '../context/RegisterModalErrorContext';

const RegisterErrorModal = () => {
    const { showModal, setShowModal, message, error } = useContext(RegisterModalErrorContext);
    const baseBackgroundStyle = 'fixed z-[500] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center transition-all duration-200 ';
    return ( 
    <div
      id='modalBackground'
      className={showModal ? baseBackgroundStyle + 'opacity-100 visible' : baseBackgroundStyle + 'opacity-0 invisible'}
      onClick={(e) => {
        if (e.target == document.getElementById('modalBackground')) {
          setShowModal(false);
        }
      }}
    >
      <div className='relative w-[600px] h-[350px] mt- m-0 rounded-3xl bg-white'>
        <img src='/assets/loginModal/closeButton.png' className='absolute top-[2%] right-[2%] mt-[20px] mr-[20px] transition-opacity cursor-pointer opacity-100 hover:opacity-80' onClick={() => setShowModal(false)} />
        
        <div className='flex flex-col justify-between h-[100%] pt-[10%]'>
            <div className='px-8'>
            <h1>{error}</h1>
            <p>{message}</p>
        </div>
        <div className='w-full flex justify-center pb-[10%]'>
            <button className='text-white bg-red-500 hover:bg-red-600 active:translate-y-0.5 transition-all ease-in-out duration-100 font-medium rounded-full text-sm sm:w-auto px-32 py-2.5 text-center' onClick={() => setShowModal(false)}>
                Okay
            </button>
        </div>
        </div>
      </div>


    </div>
     );
}
 
export default RegisterErrorModal;