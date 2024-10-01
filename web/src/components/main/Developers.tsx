import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Developer from "./Developer";

const Developers = () => {
    const colref = collection(db, "developers-first-gen");
    const [usersFirst, setUsersFirst] = useState<any[]>([]);

    useEffect(() => {
        getDocs(colref)
        .then((snapshot) => {
            let getUsersFirst: any[] = [];
            snapshot.docs.forEach((doc) => {
                getUsersFirst.push({ ...doc.data(), id: doc.id });
            });
            console.log(getUsersFirst);
            setUsersFirst(getUsersFirst);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    return (
        <div>
            <div className="font-bold text-primary font-serif text-[3.3vw] text-center mt-[1em]">Meet the Team!</div>
            <h1 className="font-bold text-primary-dark font-serif text-[2vw] text-center mt-[1em]">First Gen: 2024</h1>
            <div className="flex items-center">
                {usersFirst.map((developer:any) => (
                    <Developer 
                        firstName={developer.first_name}
                        lastName={developer.last_name}
                        major={developer.major}
                        profilePic={developer.profile_picture}
                        role={developer.role}
                        yearLevel={developer.year_level}
                    />
                ))}
            </div>
        </div>
    )
}
export default Developers;