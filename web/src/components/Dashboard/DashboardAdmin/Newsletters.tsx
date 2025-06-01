import NewsletterCard from "./NewsletterCard";

const Newsletters: React.FC = () => {

    // Test data for notifications
    const newsletters = [
        {
            id: 1,
            title:'Launch Night',
            date: 'Monday 8th April 2024',
            time: '6:00pm - 8:00pm',
            type: 'Club Event'
        },
        {
            id: 2,
            title:'Another notification',
            date: 'Monday 8th April 2024',
            time: '6:00pm - 8:00pm',
            type: 'Club Event'
        }
    ]

    // Temp create button handler
    function handleCreateNewsletter() {
        console.log('Newsletter created');
    }

    return (
        <div className="flex flex-col bg-white w-full shadow-lg rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center self-start justify-between">
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

            <hr className="border-t-2 border-gray-300 rounded-full my-2" />

            {/* Notification cards*/}
            <div className="flex flex-col overflow-hidden overflow-y-scroll gap-6">
                {newsletters.map((newsletter) => (
                    <NewsletterCard newsletter={newsletter} key={newsletter.id} />
                ))}
            </div>

            {/* Create button */}
           <button className="rounded-full w-[40%] self-center"onClick={ handleCreateNewsletter }>Create</button>
        </div>
    )
};

export default Newsletters;