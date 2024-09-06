import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface VolunteeringTrackerProps {
  totalHours: number; // Total hours required for the next level
  completedHours: number; // Completed volunteering hours
}

const VolunteeringTracker: React.FC<VolunteeringTrackerProps> = ({ totalHours, completedHours }) => {
  const percentage = (completedHours / totalHours) * 100;

  return (
    <div className="w-[305px] h-[390px] bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between items-center">
      {/* Title */}
      <h2 className="dashboard text-heading2 font-bold text-heading text-center text-primary">
        Volunteering Tracker
      </h2>

      {/* Circular Progress Bar */}
      <div className="w-[150px] h-[150px] relative">
        <CircularProgressbar
          value={percentage}
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
      <p className="text-body text-center mt-4">
        {totalHours - completedHours} more hours to reach Level 3!
      </p>
    </div>
  );
};

export default VolunteeringTracker;
