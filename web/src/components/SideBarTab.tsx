import { Link } from "react-router-dom";

type SideBarTabProps = {
    image: string;
    tabName: string;
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
};

const SideBarTab: React.FC<SideBarTabProps> = ({ image, tabName, selectedTab, setSelectedTab }) => {
    return (
        <div className={selectedTab === tabName ? "selected" : "unselected-tab"}>
            <Link onClick={() => setSelectedTab(tabName)} to="/">
                <div className="image-div">
                    <img src={image} alt={tabName + " icon"} />
                </div>
                <h3>{tabName}</h3>
            </Link>
        </div>
    );
};
 
export default SideBarTab;

