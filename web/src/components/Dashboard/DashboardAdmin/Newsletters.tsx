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
            <div className="flex flex-col gap-6 h-[25vh] overflow-y-scroll">
                {newsletters.map((newsletter) => (
                    <NewsletterCard newsletter={newsletter} key={newsletter.id} />
                ))}
            </div>

            {/* Create button */}
            <div className="flex bg-white mt-3 justify-center">
                <button className="bg-primary text-body text-xs rounded-full py-3 px-5 hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#264268] active:translate-y-0.5 transition-all ease-in-out duration-100 max-[1440px]:text-lg max-[1440px]:py-1 max-[1440px]:px-7 max-[1280px]:py-2 max-[1280px]:px-9 max-[1280px]:text-xl">
                    <div className="flex items-center gap-2">
                        <p className="m-0 max-[1440px]:text-[14px] max-[1280px]:text-[1rem]" onClick={ handleCreateNewsletter }>Create</p>
                    </div>
                </button>
            </div>
        </div>
    )
};

export default Newsletters;