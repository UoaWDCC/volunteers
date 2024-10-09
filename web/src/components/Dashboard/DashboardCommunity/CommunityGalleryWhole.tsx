//import axios from "axios";
//import { useState, useEffect } from "react";

import CommunityGallery from "./CommunityGallery";

//interface EventData {
//  title: string;
//  location: string;
//}

const CommunityGalleryWhole = () => {
  // TEMPORARY DATA passing down events into community gallery vvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // const [data, setData] = useState<EventData[]>([
  //   {
  //     title: "Quiz Night",
  //     location: "Uni",
  //   },
  //   {
  //     title: "Launch Night",
  //     location: "Somewhere",
  //   },
  //   {
  //     title: "C",
  //     location: "Somewhere",
  //   },
  //   {
  //     title: "Beach Cleanup",
  //     location: "Beach",
  //   },
  // ]);

  // useEffect(() => {
  //   // Fetch gallery data
  //   const appUrl = import.meta.env.VITE_API_URL;
  //   axios
  //     .get(`${appUrl}/api/homepage/highlights`)
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // TEMPORARY ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

 return (
    <div>
      {/* passing event data into community gallery*/}
      <CommunityGallery />
    </div>
  );
};

export default CommunityGalleryWhole;
