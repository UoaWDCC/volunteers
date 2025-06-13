// src/components/PlaceholderPFP.tsx

import React from "react";

interface PlaceholderPFPProps {
  size?: string; // e.g., "w-10 h-10"
}

const PlaceholderPFP: React.FC<PlaceholderPFPProps> = ({ size = "w-12 h-12" }) => {
  return (
    <img
      src="/images/default-pfp.png" // Or a remote placeholder if you want
      alt="User"
      className={`rounded-full object-cover ${size}`}
    />
  );
};

export default PlaceholderPFP;
