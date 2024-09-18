/*
 * So like the purpose of this file is to have a container for every event, then for every event it will have x amount of profile cards shown
 * For now, we don't separate the events, we just show all the profile cards in one container
*/

import CommunityGallery from "./CommunityGallery";

interface EventData {
  title: string;
  location: string;
}

const CommunityGalleryWhole = () => {

    return ( 
          <div className="mb-5">
            <CommunityGallery />
        </div>
     );
}
 
export default CommunityGalleryWhole;