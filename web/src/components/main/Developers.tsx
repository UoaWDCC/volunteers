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
        <div className="height-[100vh] bg-neutral">
            {/* Club Logo */}
            <a onClick={goToHome} className="hover:cursor-pointer flex flex-center">
                <img
                    loading="lazy"
                    src="./assets/club-logo.svg"
                    alt=""
                    className="hover:shadow-lg z-10 rounded-[100px] w-[6em] items-center pt-[0.9em]"
                />
            </a>
            <div className="font-bold text-primary font-serif text-[3em] text-center pt-[0.3em] flex justify-center">
                <h1 className="
                    border-4 border-primary w-[11em]
                    bg-primary rounded-[15px]
                    text-white text-[35px]
                ">Development Team 2024</h1>
            </div>
            <div className="flex justify-center text-[1em] flex flex-wrap ml-[5em] mr-[5em] max-w-[100vw] flex-wrap">
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
                {/*Trophy*/}
                <img
                    loading="lazy"
                    src="./assets/graphics/trophy.svg"
                    alt=""
                    className="absolute w-[30%] h-auto top-[-4%] left-[-6.5%]"
                />
                {/*Blue Wheel*/}
                <img
                    loading="lazy"
                    src="./assets/graphics/wheelLBlue.svg"
                    alt=""
                    className="absolute w-[30%] h-auto top-[-10%] right-[0%]"
                />
            </div>
            <h6 className="break-words text-primary text-[15px] mb-[1em] text-center">Click profile to see LinkedIn</h6>
        </div>
    )
}
export default Developers;