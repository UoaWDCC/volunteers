
import axios from "axios";
import { useState, useEffect } from "react";

import CommunityGallery from "./CommunityGallery";

interface EventData {
  title: string;
  location: string;
}

const CommunityGalleryWhole = () => {
  // TEMPORARY DATA passing down events into community gallery vvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  const [data, setData] = useState<EventData[]>([
    {
      title: "Quiz Night",
      location: "Uni",
    },
    {
      title: "Launch Night",
      location: "Somewhere",
    },
    {
      title: "C",
      location: "Somewhere",
    },
    {
      title: "Beach Cleanup",
      location: "Beach",
    },
  ]);

  useEffect(() => {
    // Fetch gallery data
    const appUrl = import.meta.env.VITE_APP_URL;
    const port = import.meta.env.VITE_APP_PORT;
    axios
      .get(`${appUrl}:${port}/api/homepage/highlights`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // TEMPORARY ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  return (
    <div>
      {/* passing event data into community gallery*/}
      {data.map((event) => (
        <div className="mb-5">
          <CommunityGallery event={event.title} location={event.location} />
        </div>
      ))}
    </div>
  );
};

export default CommunityGalleryWhole;
