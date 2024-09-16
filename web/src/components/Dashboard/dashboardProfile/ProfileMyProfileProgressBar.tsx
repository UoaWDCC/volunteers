import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProfileMyProfileProgressBarProps {
  totalHours: number; // Total hours required for the next level
  completedHours: number; // Completed volunteering hours
}

const ProfileMyProfileProgressBar: React.FC<ProfileMyProfileProgressBarProps> = ({ totalHours, completedHours }) => {
  const percentage = (completedHours / totalHours) * 100;

  return (
    <div className="w-full h-full bg-white shadow-lg rounded-3xl p-6 flex flex-col justify-between items-center">
      {/* Title */}
      
      <h2 className="dashboard text-heading2 text-primary mb-0 mt-2">
        Volunteering Tracker
      </h2>
      

      {/* Circular Progress Bar */}
      <div className="w-[52.4%] relative">
        <CircularProgressbar
          value={percentage}
          strokeWidth={11}
          styles={buildStyles({
            pathColor: '#3B87DD', 
            trailColor: '#E0E0E0', 
          })}
        />

        {/* Custom Text Inside Progress Bar */}
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          {/* Number (Hours) */}
          <span className="dashboard text-heading1 font-bold text-black">{completedHours}</span>
          {/* Label (hours) */}
          <span className="dashboard text-heading3 font-semibold text-black">hours</span>
        </div>
      </div>

      {/* Bottom Text */}
      <p className="dashboard text-body-heading text-center mt-4 ">
        {totalHours - completedHours} more hours to reach Level 3!
      </p>
    </div>
  );
};

export default ProfileMyProfileProgressBar;
