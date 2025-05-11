import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const Notifications: React.FC = () => {
    const [notificaitonsFilter, setNotificationsFilter] = useState("all"); // Filter for the notifications view
    const [announcements, setAnnouncements] = useState<any[]>([]);

    const colRef = collection(db, "Announcements");

    useEffect(() => {
        getDocs(colRef)
            .then(snapshot => {
                let getAnnouncements: any[] = [];
                snapshot.docs.forEach(doc => {
                    getAnnouncements.push({ ...doc.data(), id: doc.id});
                })
                console.log(getAnnouncements)
                setAnnouncements(getAnnouncements)
            })
            .catch(err => {
                console.error(err.message)
            })
    }, [])

    function changeLeaderboardFilter(filter: string) {
        setNotificationsFilter(filter);
    }

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

            {/* Notification cards */}
            <div className="flex flex-col gap-6 h-[25vh] overflow-y-scroll">
                {announcements.map((announcement) => (
                    <NotificationCard notification={announcement} key={announcement.id} />
                ))}
            </div>
        </div>
    )
};

export default Notifications;