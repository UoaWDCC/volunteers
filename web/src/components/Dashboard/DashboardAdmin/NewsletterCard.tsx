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
        <div className="flex w-full h-20 bg-white flex flex-row items-center justify-between">
            <div className="flex flex-row">
                <div>
                    <p className="text-heading1 mb-0 font-[450]">{newsletter.title}</p>
                    <p className="text-[12px] font-light m-0 leading-[1.2]">{newsletter.date}</p>
                    <p className="text-[12px] font-light m-0 leading-[1.2]">{newsletter.time}</p>
                </div>
                <div className=" ml-2">
                    <p key={1} className="text-[9px] m-1 leading-[1.2] bg-gray-100 px-2 py-1 rounded-xl font-light">
                        {newsletter.type}
                    </p>
                </div>
            </div>


            <button className="p-2 rounded-full">
                <BsChevronRight size={12}  />
            </button>
        </div>
    )
}

export default NewsletterCard;