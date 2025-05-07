import { useState } from "react";
import NotificationCard from "./NotificationCard";

const Notifications: React.FC = () => {
    const [notificaitonsFilter, setNotificationsFilter] = useState("all"); // Filter for the notifications view

    function changeLeaderboardFilter(filter: string) {
        setNotificationsFilter(filter);
    }

    // Test data for notifications
    const notifications = [
        {
            title:'Launch Night',
            date: 'Monday 8th April 2024',
            time: '6:00pm - 8:00pm',
            type: 'Club Event'
        },
        {
            title:'Another notification',
            date: 'Monday 8th April 2024',
            time: '6:00pm - 8:00pm',
            type: 'Club Event'
        },
        {
            title:'Another notification',
            date: 'Monday 8th April 2024',
            time: '6:00pm - 8:00pm',
            type: 'Club Event'
        },
        {
            title:'Another notification',
            date: 'Monday 8th April 2024',
            time: '6:00pm - 8:00pm',
            type: 'Club Event'
        }
    ]

    return (
        <div className="flex flex-col bg-white w-full shadow-lg rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center self-start justify-between">
                <h2 className="dashboard text-heading2 text-[#D2242490]">
                    Notifications
                </h2>
                <button
                    className="dashboard self-start text-body-heading text-primary underline bg-transparent"
                // onClick={show notifications modal or something}
                >
                    View All
                </button>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center">
                <button
                    className={
                        notificaitonsFilter == "all"
                            ? "bg-white text-black px-0 after:block after:h-1 after:rounded-lg after:bg-primary-dark"
                            : "bg-white text-grey px-0 after:block after:h-1"
                    }
                    onClick={() => changeLeaderboardFilter("all")}
                >
                    Inbox
                </button>
                <button
                    className={
                        notificaitonsFilter == "unread"
                            ? "bg-white text-black after:block after:h-1 after:rounded-lg after:bg-primary-dark"
                            : "bg-white text-grey after:block after:h-1"
                    }
                    onClick={() => changeLeaderboardFilter("unread")}
                >
                    Unread
                </button>
            </div>

            {/* Notification cards*/}
            <div className="h-[25vh] overflow-y-scroll">
                {notifications.map((notification) => (
                    <NotificationCard notification={notification} />
                ))}
            </div>
        </div>
    )
};

export default Notifications;