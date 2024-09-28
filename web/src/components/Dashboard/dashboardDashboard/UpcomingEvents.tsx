import UpcomingEvent from "./UpcomingEvent";

const event_test_one = {
  date: "Mon 11th May",
  time: "2pm",
  title: "Launch Night",
  location: "University of Auckland | General Library",
  img: "",
};

const event_test_two = {
  date: "Tue 12th May",
  time: "4pm",
  title: "Networking Mixer",
  location: "Auckland Town Hall",
  img: "",
};

const event_test_three = {
  date: "Wed 13th May",
  time: "6pm",
  title: "Coding Workshop",
  location: "SkyCity Convention Centre",
  img: "",
};

const event_test_four = {
  date: "Thu 14th May",
  time: "3pm",
  title: "Tech Expo",
  location: "ASB Showgrounds",
  img: "",
};

const event_test_five = {
  date: "Fri 15th May",
  time: "1pm",
  title: "Startup Pitch",
  location: "AUT Business School",
  img: "",
};

const event_test_six = {
  date: "Sat 16th May",
  time: "10am",
  title: "Hackathon",
  location: "The University of Waikato",
  img: "",
};

const UpcomingEvents = () => {
  return (
    <div className="flex flex-col h-full bg-white font-light">
      <div>
        <p className="text-primary text-[38px] leading-[1.15] pl-8 pt-2 m-0 font-semibold">
          Upcoming Events
        </p>
        <p className="text-black text-[14px] leading-[1.15] pl-8 pt-2 pb-5 m-0">
          See what's going on!
        </p>
      </div>
      <div className="overflow-auto mx-5 scrollbar-none">
        <div className="flex flex-row flex-wrap gap-5 justify-center">
          <UpcomingEvent event={event_test_one} />
          <UpcomingEvent event={event_test_six} />
          <UpcomingEvent event={event_test_three} />
          <UpcomingEvent event={event_test_four} />
          <UpcomingEvent event={event_test_five} />
          <UpcomingEvent event={event_test_two} />
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
