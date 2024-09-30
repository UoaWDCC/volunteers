/*
 * So like the purpose of this file is to have a container for every event, then for every event it will have x amount of profile cards shown
 */

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
    axios
      .get("http://localhost:3000/api/homepage/highlights")
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
