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

const getFontSizeFromSize = (size: string): string => {
  const match = size.match(/w-(\d+)/);
  if (!match) return "1rem";
  const sizeNum = parseInt(match[1], 10);
  return `${sizeNum * 0.1}rem`; // 0.5x of width
};

const PlaceholderPFP: React.FC<PlaceholderPFPProps> = ({
  size = "w-12 aspect-square",
  name,
  imageSource,
}) => {
  return (
    <div className={`rounded-full bg-gray-200 flex items-center justify-center font-semibold text-sm tracking-wider ${size}`}>
      {
        imageSource ? (
          <img
            src={imageSource}
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <span style={{ fontSize: getFontSizeFromSize(size) }} className="text-black">
            {getInitials(name)}
          </span>
        )
      }
    </div>
  );
};

export default PlaceholderPFP;
