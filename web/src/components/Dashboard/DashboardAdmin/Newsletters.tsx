import NewsletterCard from "./NewsletterCard";

const Newsletters: React.FC = () => {

    // Test data for notifications
    const newsletters = [
        {
            title:'Launch Night',
            date: 'Monday 8th April 2024',
            time: '6:00pm - 8:00pm',
            type: 'Club Event'
        },
        {
            title:'Another notification',
            date: 'Monday 8th April 2024',
            time: '6:00pm - 8:00pm',
            type: 'Club Event'
        }
    ]

    return (
        <div className="flex flex-col bg-white w-full shadow-lg rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center self-start justify-between mb-4">
                <h2 className="dashboard text-heading2 text-primary">
                    Newsletters
                </h2>
                <button
                    className="dashboard self-start text-body-heading text-primary underline bg-transparent"
                    // onClick={show notifications modal or something}
                >
                    View All
                </button>
            </div>

            <hr></hr>

            {/* Notification cards*/}
            {newsletters.map((newsletter) => (
                <NewsletterCard newsletter={newsletter} />
            ))}
        </div>
    )
};

export default Newsletters;