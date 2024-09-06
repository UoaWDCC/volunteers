import React from 'react';

type ProfileMyProfileHeadingProps = {
  name: string;
};

    
const ProfileMyProfileHeading: React.FC<ProfileMyProfileHeadingProps> = ({ name }) => {
  return (
    <div className="profile-card">
      <div className="header"></div>
      <div className="body">
        <div className="profile-image"></div>
        <span className="profile-name">{name}</span>
      </div>
    </div>
  );
};

export default ProfileMyProfileHeading;
