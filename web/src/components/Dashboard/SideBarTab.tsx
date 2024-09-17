
type SideBarTabProps = {
    unselected: string;
    selected: string;
    tabName: string;
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
    switchPage: () => void
};

const SideBarTab: React.FC<SideBarTabProps> = ({ unselected, selected, tabName, selectedTab, setSelectedTab, switchPage }) => {
    const baseTabStyle = "flex flex-row gap-2 items-center hover:no-underline w-[190px] h-[84px] transition-all duration-[400] mask-tab my-[-3px]"

    return (
        <button className={selectedTab === tabName ? baseTabStyle + " bg-[#F7F7FB] text-primary" : baseTabStyle + " bg-primary hover:bg-[#ffffff40] text-white"} onClick={() => {
            setSelectedTab(tabName)
            switchPage()}}> 
            <div className="w-auto h-auto">
                <img className="w-[25px] h-[25px]" src={selectedTab === tabName ? selected : unselected} alt={tabName + " icon"} />
            </div>
            <h3 className="font-sans text-[14px] m-0 capitalize text-nowrap mt-[6px]">{tabName}</h3>
        </button>
    );
};
 
export default SideBarTab;

