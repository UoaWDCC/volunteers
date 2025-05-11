import { Timestamp } from "firebase/firestore";

export function getDateString(timestamp: Timestamp) {
    const date = timestamp.toDate();
    const day = date.getDate();
    
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    const suffix =
        day >= 11 && day <= 13
            ? "th"
            : { 1: "st", 2: "nd", 3: "rd" }[day % 10] || "th";

    return `${weekday} ${day}${suffix} ${month} ${year}`;
}

export function getTimeString(timestamp: Timestamp) {
    const date = timestamp.toDate();
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}