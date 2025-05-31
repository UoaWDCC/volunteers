import { getDateString, getTimeString } from "@utils/FormatDate";
import { Timestamp } from "firebase/firestore";
import { BsChevronRight } from "react-icons/bs";

type announcement = {
    id: number,
    title: string,
    message: string,
    tags: string[] | null,
    start_date_time: Timestamp,
    end_date_time: Timestamp,
}

interface AnnouncementsProps {
    announcement: announcement;
}

const AnnouncementsCard: React.FC<AnnouncementsProps> = ({ announcement }: AnnouncementsProps) => {

    return (
        <div className="flex w-full bg-white flex flex-row items-center justify-between">
            <div className="flex flex-row">
                <div>
                    <p className="text-heading1 mb-0 font-[450]">{announcement.title}</p>
                    <p className="text-[12px] font-light m-0 leading-[1.2]">{getDateString(announcement.start_date_time)}</p>
                    <p className="text-[12px] font-light m-0 leading-[1.2]">
                        {getTimeString(announcement.start_date_time)} - {getTimeString(announcement.end_date_time)}
                    </p>
                </div>
                <div>
                    {announcement.tags?.map(tag =>
                        <p key={1} className="text-[9px] m-1 leading-[1.2] bg-gray-100 px-2 py-1 rounded-xl font-light text-nowrap">
                            {tag}
                        </p>
                    )}
                </div>
            </div>


            <button className="p-2 rounded-full">
                <BsChevronRight size={12} strokeWidth={1} />
            </button>
        </div>
    )
}

export default AnnouncementsCard;