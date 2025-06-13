import React from "react";

interface PlaceholderPFPProps {
  size?: string;           // Tailwind size classes (e.g. "w-10 h-10")
  name?: string;           // User name to extract initials
  imageSource?: string;       // Optional image URL (e.g. user-uploaded)
}

const getInitials = (name?: string): string => {
  if (!name) return "??";
  const parts = name.trim().split(" ");
  const initials = parts.map(p => p[0]?.toUpperCase()).slice(0, 2).join("");
  return initials || "??";
};

const PlaceholderPFP: React.FC<PlaceholderPFPProps> = ({
  size = "w-12 h-12",
  name,
  imageSource,
}) => {
  return (
    <div className={`${size}rounded-full bg-gray-200 flex items-center justify-center font-semibold text-sm tracking-wider`}>
      {
        imageSource ? (
          <img
            src={imageSource}
            className="object-contain rounded-full"
          />
        ) : (
          <span className="text-[2rem] text-black">{getInitials(name)}</span>
        )
      }
    </div>
  );
};

export default PlaceholderPFP;
