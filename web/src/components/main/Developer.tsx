import linkedinLogo from "../../../public/assets/linkedin_logo.png"
const Developer = ({firstName, lastName, major, profilePic, role, yearLevel, linkedin}:any) => {
    return (
        <div className="
            z-10
            flex flex-col pt-[1em]
            items-center text-center
            border-2 rounded-[5%] border-primary-light hover:border-primary-dark
            m-[0.5em] p-0 w-[15em] h-[19em] font-mono">
            <h6 className="font-bold text-[1.3em]">{role}</h6>
            <img className="object-cover w-[5em] h-[5em] rounded-full mb-2 mt-[5px]" src={profilePic} alt="Profile Picture"/>
            <h6 className="break-words text-primary text-[19px] font-bold">{firstName} {lastName}</h6>
            <h6 className="break-words">{yearLevel}</h6>
            <h6 className="break-words p-[5px] leading-[1.2em]">{major}</h6>
            <div className="mt-auto pb-[1em]">
                <a href={linkedin} target="_blank" className="relative flex">
                    <img className="w-[2em]" src={linkedinLogo} alt="LinkedIn Logo"/>
                    <span className="absolute text-[0.8em] bottom-[-10px] right-[-5px]">&trade;</span>
                </a>
            </div>
        </div>
    )
}
export default Developer;