import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProfileMyProfileProgressBarProps {
  totalHours: number; // Total hours required for the next level
  completedHours: number; // Completed volunteering hours
}

const ProfileMyProfileProgressBar: React.FC<ProfileMyProfileProgressBarProps> = ({ totalHours, completedHours }) => {
  const percentage = ((completedHours / totalHours) / totalHours) * 100;

  return (
    <div className="w-full bg-white p-6 flex flex-col justify-between items-center rounded-lg shadow-lg">
      {/* Title */}
      
      <h2 className="dashboard self-start text-heading2 text-primary mb-6 mt-2">
        Volunteering<br></br>Tracker
      </h2>
      

      {/* Circular Progress Bar */}
      <div className="w-[10rem] relative mb-6">
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
          <span className="dashboard text-heading1 font-bold text-black">{completedHours % 5}</span>
          {/* Label (hours) */}
          <span className="dashboard text-heading3 font-semibold text-black">hours</span>
        </div>
      </div>

      {/* Bottom Text */}
      <p className="dashboard text-body-heading text-center mt-4 ">
        {totalHours % completedHours} more hours to reach Level {Math.floor(completedHours / 5) + 2}!
      </p>
    </div>
  );
};

export default ProfileMyProfileProgressBar;
