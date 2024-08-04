import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface AnnouncementFormProps {}

const AnnouncementForm: React.FC<AnnouncementFormProps> = () => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const tags = [
    "First Year",
    "All Volunteers",
    "Volunteering Opportunity",
    "Social Event",
  ];

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevState) =>
      prevState.includes(tag)
        ? prevState.filter((t) => t !== tag)
        : [...prevState, tag]
    );
  };

  const formatDateTime = (date: string, time: string): string => {
    const dateTime = new Date(`${date}T${time}`);
    return dateTime.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const startDateTime = formatDateTime(startDate, startTime);
    const endDateTime = formatDateTime(endDate, endTime);

    try {
      await addDoc(collection(db, "Announcements"), {
        title,
        message,
        tags: selectedTags,
        startDateTime,
        endDateTime,
      });

      setSuccess(true);
      setTitle("");
      setMessage("");
      setSelectedTags([]);
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
    } catch (error) {
      setError("Failed to post announcement.");
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-lightGrey min-h-screen flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="font-bold text-3xl mb-5">
          Create Announcement
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="text-detail text-black block mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-lightGrey rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="text-detail text-black block mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 border border-lightGrey rounded-lg h-32"
            />
          </div>
          <div className="mb-4">
            <label className="text-detail text-black block mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <label
                  key={tag}
                  className={`text-sm text-black border border-lightGrey rounded-2xl px-4 py-2 cursor-pointer ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-neutral"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    className="hidden"
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="text-detail text-black block mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full p-3 border border-lightGrey rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startTime"
              className="text-detail text-black block mb-2"
            >
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full p-3 border border-lightGrey rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="text-detail text-black block mb-2"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full p-3 border border-lightGrey rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endTime"
              className="text-detail text-black block mb-2"
            >
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full p-3 border border-lightGrey rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-neutral font-bold rounded-lg ${
              loading ? "bg-grey" : "bg-primary hover:bg-blueButtonHover"
            }`}
          >
            {loading ? "Posting..." : "Submit"}
          </button>
        </form>
        {error && <p className="text-secondary mt-4 text-center">{error}</p>}
        {success && (
          <p className="text-primary mt-4 text-center">
            Announcement posted successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default AnnouncementForm;
