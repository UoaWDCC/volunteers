import { BsChevronRight } from "react-icons/bs";

type newsletter = {
    title: string,
    date: string,
    time: string,
    type: string
}

interface NewsletterProps {
    newsletter: newsletter;
}

const NewsletterCard: React.FC<NewsletterProps> = ({newsletter}: NewsletterProps) => {
    
    return (
        <div className="flex w-full bg-white flex-row items-center justify-between">
            <div className="flex flex-row">
                <div>
                    <p className="text-heading1 mb-0 font-[450]">{newsletter.title}</p>
                    <p className="text-[12px] font-light m-0 leading-[1.2]">{newsletter.date}</p>
                    <p className="text-[12px] font-light m-0 leading-[1.2]">{newsletter.time}</p>
                </div>
                <div className=" ml-2">
                </div>
            </div>


            <button className="p-2 rounded-full">
                <BsChevronRight size={12} strokeWidth={1} />
            </button>
        </div>
    )
}

export default NewsletterCard;