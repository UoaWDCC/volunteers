//import linkedinLogo from "../../../public/assets/linkedin_logo.png"
const Developer = ({firstName, lastName, major, profilePic, role, yearLevel, linkedin}:any) => {
    return (
        <div className="
            z-10
            flex flex-col pt-[1em]
            items-center text-center
            border-2 rounded-[15px] border-grey
            hover:shadow-md hover:shadow-lightGrey hover:bg-neutral hover:cursor-pointer
            m-[0.5em] p-0 w-[15em] h-[18.5em] font-mono"
            onClick={() => window.open(linkedin, "_blank")}
            >
            <div className="
                border-4 rounded-[10px] px-[0.5em] border-neutral
                bg-primary
            ">
                <h6 className="font-bold text-[1.3em] text-white">{role}</h6>
            </div>
            <img className="
                object-cover w-[5em] h-[5em] rounded-full mb-2 mt-[5px]
                border-4 border-neutral
            " src={profilePic} alt="Profile Picture"/>
            <h6 className="break-words text-primary text-[19px] font-bold">{firstName} {lastName}</h6>
            <h6 className="break-words">{yearLevel}</h6>
            <h6 className="break-words p-[5px] leading-[1.2em]">{major}</h6>
        </div>
    )
}
export default Developer;
