import EventsScrollContainer from "./Dashboard/DashboardDiscover/EventsScrollContainer";

export default function TestingComponent() {
  return (
    <div>
      {" "}
      {/*try add className="dashboard" inside the div tag */}
      <h1 className="bg-primary text-number font-serif">
        Primary Number Lora (bold)
      </h1>
      <h1 className="bg-primary-dark  text-heading font-serif">
        Primary-dark Heading Lora (bold)
      </h1>
      <h1 className="bg-primary-light text-subheading font-mono">
        Primary-light Subheading Roboto Mono (semibold)
      </h1>
      <h1 className="bg-secondary text-subheading font-sans">
        Secondary Subheading Poppins (semibold)
      </h1>
      <h1 className="bg-secondary-light text-body font-sans">
        Secondary-light Body Poppins (medium)
      </h1>
      <h1 className="bg-neutral text-detail ">Neutral Poppins (semibold)</h1>
      <h1 className="bg-grey text-section-header font-serif">
        Grey Section Header Lora
      </h1>
      <EventsScrollContainer
        events={[]}
        setEventDetails={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
