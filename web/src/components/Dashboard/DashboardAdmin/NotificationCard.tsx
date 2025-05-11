import { Timestamp } from "firebase/firestore";
import { BsChevronRight } from "react-icons/bs";

type notification = {
    id: number,
    title: string,
    message: string,
    tags: string[] | null,
    start_date_time: Timestamp,
    end_date_time: Timestamp,
}

interface NotificationProps {
    notification: notification;
}

const NotificationCard: React.FC<NotificationProps> = ({ notification }: NotificationProps) => {

    return (
        <div className="flex w-full h-20 bg-white flex flex-row items-center justify-between">
            <div className="flex flex-row">
                <div>
                    <p className="text-heading1 mb-0 font-[450]">{notification.title}</p>
                    <p className="text-[12px] font-light m-0 leading-[1.2]">{notification.start_date_time.toDate().toLocaleDateString()}</p>
                    <p className="text-[12px] font-light m-0 leading-[1.2]">{notification.end_date_time.toDate().toLocaleDateString()}</p>
                </div>
                {/* <div className=" ml-2">
                    {notification.tags?.map(tag =>
                        <p key={1} className="text-[9px] m-1 leading-[1.2] bg-gray-100 px-2 py-1 rounded-xl font-light">
                            {tag}
                        </p>
                    )}
                </div> */}
            </div>


            <button className="p-2 rounded-full">
                <BsChevronRight size={12} strokeWidth={1} />
            </button>
        </div>
    )
}

export default NotificationCard;