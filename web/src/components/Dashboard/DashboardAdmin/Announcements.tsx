import { useEffect, useState } from "react";
import AnnouncementsCard from "./AnnouncementsCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const Announcements: React.FC = () => {
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

    return (
        <div className="flex flex-col bg-white w-full shadow-lg rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center self-start justify-between">
                <h2 className="dashboard text-heading2 text-[#D2242490]">
                    Announcements
                </h2>
                <button
                    className="dashboard self-start text-body-heading text-primary underline bg-transparent"
                // onClick={show announcements modal or something}
                >
                    View All
                </button>
            </div>
            
            <hr className="border-t-2 border-gray-300 rounded-full my-2" />

            {/* Notification cards */}
            <div className="flex flex-col gap-6 h-[25vh] overflow-y-scroll">
                {announcements.map((announcement) => (
                    <AnnouncementsCard announcement={announcement} key={announcement.id} />
                ))}
            </div>
        </div>
    )
};

export default Announcements;