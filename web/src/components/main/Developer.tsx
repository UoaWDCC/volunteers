const Developer = ({firstName, lastName, major, profilePic, role, yearLevel}:any) => {
    return (
        <div>
            <h6>{firstName}</h6>
            <h6>{lastName}</h6>
            <h6>{major}</h6>
            <h6>{profilePic}</h6>
            <h6>{role}</h6>
            <h6>{yearLevel}</h6>
        </div>
    )
}
export default Developer;