import DashboardAnnouncement from "./DashboardAnnouncement"

function DashboardAnnouncements({ announcements }: any) {
  return (
    <div className="max-h-[60vh] overflow-hidden overflow-y-scroll">
      {announcements.map((announcement: any) => (
        <DashboardAnnouncement key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
}

export default DashboardAnnouncements;
