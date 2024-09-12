import Event from "./Event.tsx"

export default function EventsScrollContainer() {
    return (
        <div className="dashboard bg-white-background h-96 overflow-y-scroll">
            <Event />
            <Event />
            <Event />
            <Event />
            <Event />

        </div>
    )
}