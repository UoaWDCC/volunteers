function DashboardAnnouncement({announcement}:any) {
    const startTimestamp = announcement.start_date_time
    const startDate = startTimestamp.toDate()
    const endTimestamp = announcement.end_date_time
    const endDate = endTimestamp.toDate()

    return (
        <div className="max-w-[20vw] mt-[5px]">
            <p className="text-[12px] mb-0 font-[450]">{announcement.title}</p>
            <p className="text-[9px] m-0 leading-[1.2]">{announcement.message}</p>
            <p className="text-[9px] m-0 leading-[1.2]">Created: {startDate.toLocaleDateString("en-US")}</p>
            <p className="text-[9px] m-0 leading-[1.2]">Valid Until: {endDate.toLocaleDateString("en-US")}</p>
            <div className="flex flex-wrap gap-1">
                {announcement.tags && announcement.tags.map((tag: any, index: number) => (
                    <p key={index} className="text-[9px] m-1 leading-[1.2] bg-gray-100 px-2 py-1 rounded-xl font-light">
                    {tag}
                    </p>
                ))}
            </div>
          </div>
    )
}
export default DashboardAnnouncement