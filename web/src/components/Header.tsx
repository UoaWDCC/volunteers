import { useContext } from "react";
import LoginModalContext from "../context/LoginModalContext.tsx";

function Header() {
  const {setShowModal} = useContext(LoginModalContext);

  return (
    <header className="flex justify-center bg-neutral-tan">
      <div className="flex flex-grow justify-between items-center min-w-min px-44 py-3">
        <div>
          <img loading="lazy" src="/assets/header-logo.svg" alt="Volunteers Club Logo" className="h-auto min-w-[150px]"/>
        </div>

        <div>
          <ul className="flex flex-row text-sm text-white font-mono m-0 gap-5">
            <li onClick={ () => {setShowModal(true)} } className="px-[30px] py-[10px] bg-primary rounded-[2rem] hover:underline cursor-pointer">Login</li>
            <li onClick={ () => {setShowModal(true)} } className="px-[30px] py-[10px] bg-primary rounded-[2rem] hover:underline cursor-pointer">Register</li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header;