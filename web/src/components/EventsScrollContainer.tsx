import Event from "./Event.tsx"

export default function EventsScrollContainer() {
    return (
        <div className="w-3/5 h-96 overflow-y-scroll">
            <Event />
            <Event />
            <Event />
            <Event />
            <Event />

        </div>
    )
}