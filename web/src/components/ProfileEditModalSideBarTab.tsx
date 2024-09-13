
type SideBarTabProps = {
    tabName: string;
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
    switchTab: () => void
};

const ProfileEditModalSideBarTab: React.FC<SideBarTabProps> = ({ tabName, selectedTab, setSelectedTab, switchTab }) => {
    const baseTabStyle = "flex flex-row gap-2 items-center hover:no-underline w-[190px] h-[84px] transition-all duration-[400] bg-primary mask-profile-tab my-[-5px]"
    return (
        <button className={selectedTab === tabName ? baseTabStyle + " bg-white text-primary" : baseTabStyle + " hover:bg-[#ffffff40] text-white"} onClick={() => {
            setSelectedTab(tabName)
            switchTab()}}> 

            {/* handle line breaks in tab names */}
            <h3 className="pl-5 font-sans text-[14px] font-normal m-0 capitalize text-nowrap mt-[6px] text-left">
                {tabName.split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        {index < tabName.split('\n').length - 1 && <br />}
                    </span>
                ))}
            </h3>
        </button>
    );
};
 
export default ProfileEditModalSideBarTab;

