import { Link } from "react-router-dom";

type SideBarTabProps = {
    image: string;
    tabName: string;
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
};

const SideBarTab: React.FC<SideBarTabProps> = ({ image, tabName, selectedTab, setSelectedTab }) => {
    const baseTabStyle = "flex flex-row items-center hover:no-underline w-[190px] h-[84px] my-[-5px] transition-all duration-[400]"

    return (
        <Link className={selectedTab === tabName ? baseTabStyle + " bg-white text-[#5AB7F1]" : baseTabStyle + " hover:bg-[#ffffff40] text-white"} onClick={() => setSelectedTab(tabName)} to="/">
            <div className="w-[65px] h-[65px]">
                <img className="w-[52px] h-[52px]" src={image} alt={tabName + " icon"} />
            </div>
            <h3 className="h-[125px] w-[64px] content-center font-sans text-[17px] mb-0">{tabName}</h3>
        </Link>
    );
};
 
export default SideBarTab;

