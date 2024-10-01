import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Developer from "./Developer";

const Developers = () => {
    const colref = collection(db, "developers-first-gen");
    const [leads, setLeads] = useState<any[]>([]);
    const [devs, setDevs] = useState<any[]>([]);

    const goToHome = () => {
        window.location.href = '/';
      }

    useEffect(() => {
        getDocs(colref)
        .then((snapshot) => {
            let getUsersFirst: any[] = [];
            snapshot.docs.forEach((doc) => {
                getUsersFirst.push({ ...doc.data(), id: doc.id });
            });
            getUsersFirst.sort((a, b) => {
                if (a.last_name < b.last_name) return -1;
                if (a.last_name > b.last_name) return 1;
                return 0;
            });
            setLeads(getUsersFirst.filter(user => user.role === 'Project Manager'))
            const combinedLeads = [
                ...getUsersFirst.filter(user => user.role === 'Project Manager'),
                ...getUsersFirst.filter(user => user.role === 'Tech Lead'),
                ...getUsersFirst.filter(user => user.role === 'Designer')
            ];
            setDevs(getUsersFirst.filter(user => 
                user.role !== 'Project Manager' &&
                user.role !== 'Tech Lead' &&
                user.role !== 'Designer'
            ));
            setLeads(combinedLeads)
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    return (
        <div>
            <div className="font-bold text-primary font-serif text-[3em] text-center mt-[1em]">Meet the Team!</div>
            <h1 className="font-bold text-primary font-serif text-[2em] text-center mt-[1em]">=== 2024 ===</h1>
            <div className="flex justify-center text-[1em] flex flex-wrap ml-[5em] mr-[5em] mb-[5em] max-w-[100vw] flex-wrap">
                    {leads.map((developer:any) => (
                    <Developer 
                        firstName={developer.first_name}
                        lastName={developer.last_name}
                        major={developer.major}
                        profilePic={developer.profile_pic}
                        role={developer.role}
                        yearLevel={developer.year_level}
                        linkedin={developer.linkedin}
                    />
                ))}
                {devs.map((developer:any) => (
                    <Developer 
                        firstName={developer.first_name}
                        lastName={developer.last_name}
                        major={developer.major}
                        profilePic={developer.profile_pic}
                        role={developer.role}
                        yearLevel={developer.year_level}
                        linkedin={developer.linkedin}
                    />
                ))}
                {/*Flower*/}
                <img
                    loading="lazy"
                    src="./assets/graphics/trophy.svg"
                    alt=""
                    className="absolute w-[20%] h-auto top-[-4%] right-[7%]"
                />
                <a onClick={goToHome} className="hover:cursor-pointer">
                    <img
                        loading="lazy"
                        src="./assets/header-logo.svg"
                        alt=""
                        className="absolute w-[20%] h-auto top-[7%] left-[7%] hover:shadow-lg z-10 rounded-[100px]"
                    />
                </a>
            </div>
        </div>
    )
}
export default Developers;