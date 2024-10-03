
type SideBarTabProps = {
  unselected: string;
  selected: string;
  tabName: string;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  switchPage: () => void
};

const SideBarTab: React.FC<SideBarTabProps> = ({ unselected, selected, tabName, selectedTab, setSelectedTab, switchPage }) => {
  const tRCorner = " before:content-[''] before:absolute before:h-[40px] before:w-[20px] before:bg-transparent before:top-[-40px] before:right-0 before:rounded-br-full before:shadow-invTR before:duration-[500ms] before:ease-in"
  const bRCorner = " after:content-[''] after:absolute after:h-[40px] after:w-[20px] after:bg-transparent after:bottom-[-40px] after:right-0 after:rounded-tr-full after:shadow-invBR after:z-50 after:duration-[500ms] after:ease-in"
  const baseTabStyle = "dashboard hover:no-underline w-[210px] h-[70px] transition-colors duration-[400ms] rounded-l-full relative sm:max-2xl:w-[90px]" + tRCorner + bRCorner

  return (
    <button className={selectedTab === tabName ? baseTabStyle + " bg-[#F7F7FB] text-primary": baseTabStyle + " bg-primary hover:bg-[#ffffff40] text-white rounded-r-lg after:opacity-0 before:opacity-0 before:transition-none after:transition-none"} onClick={() => {
      setSelectedTab(tabName)
      switchPage()
    }}>
      <div className="flex flex-row gap-2 items-center ml-4">
        <img className="w-[25px] h-[25px]" src={selectedTab === tabName ? selected : unselected} alt={tabName + " icon"} />
        <h3 className="font-sans text-[14px] m-0 capitalize text-nowrap mt-[6px] sm:max-2xl:hidden">{tabName}</h3>
      </div>

    </button>
  );
};

export default SideBarTab;

