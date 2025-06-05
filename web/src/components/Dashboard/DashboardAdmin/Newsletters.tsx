import { useState } from 'react';
import NewsletterCard from "./NewsletterCard";

const Newsletters: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState("Club Event");
    const [files, setFiles] = useState<File[]>([]);
    const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4>(1); // 1 = Intro, 2 = Events, 3 = Review, 4 = Submit
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
    const handleCreateNewsletter = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = (ignoreValidation = false) => {
        if(!ignoreValidation && (title || date || time)){
            if (!confirm("You have unsaved changes. Close anyway?")){
                return; //dont close if user cancels
            }
        }
        setIsPopupOpen(false);
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault(); // Only call if event exists

        if (!title || !date || !time) {
            alert("Please fill in all required fields");
            return;
        }

        console.log("Creating newsletter:", { title, date, time, type });
        setIsPopupOpen(false);

        // Reset form
        setTitle("");
        setDate("");
        setTime("");
        setType("Club Event");
    };

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
            <div className="h-[25vh] overflow-y-scroll">
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
                    {/* Popup Overlay */}
                    {isPopupOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            {/* Blurred background */}
                            <div
                                className="absolute inset-0 backdrop-blur-md bg-white/50"
                                onClick={() => handleClosePopup(false)}
                            />
                            
                            {/* Popup Content */}
                            <div
                                className="relative z-50 w-[464px] h-[668px] bg-white rounded-[25px] shadow-lg flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* progress bar */}
                                <div className="absolute left-[45px] top-[45px] right-[63px] h-[5px] flex items-center justify-between"> 
                                    {/*changed from 54 to 45 otherwise not centered*/}
                                    <div className="relative flex items-center w-full">
                                        {/* Stage 1: Intro */}
                                        <div className="relative mr-[15px] flex flex-col">
                                            <div className={`font-poppins text-[10px] leading-[120%] w-[38px] h-[12px] right-[-4px] relative ${
                                                currentStage >= 1 ? "text-[#3B87DD]" : "text-[#C5C5C5]"
                                            }`}>
                                                1. Intro
                                            </div>
                                            <div
                                                className={`rounded-[2.5px] w-[78px] h-[5px] ${
                                                    currentStage >= 1 ? "bg-[#3B87DD]" : "bg-[#D9D9D9]"
                                                }`}
                                                style={{
                                                    marginTop: "10px", // Ensuring 10px vertical space
                                                }}
                                            />
                                        </div>
                                        {/* Stage 2: Events */}
                                        <div className="relative mr-[15px] flex flex-col">
                                            <div 
                                                className={`font-poppins text-[10px] leading-[120%] w-[45px] h-[12px] right-[-4px] relative ${
                                                    currentStage >= 2 ? 'text-[#3B87DD]' : 'text-[#C5C5C5]'
                                                }`}
                                            >
                                                2. Events
                                            </div>
                                            <div
                                                className={`rounded-[2.5px] w-[78px] h-[5px] ${
                                                    currentStage >= 2 ? 'bg-[#3B87DD]' : 'bg-[#D9D9D9]'
                                                }`}
                                                style={{
                                                    marginTop: "10px", // Ensuring 10px vertical space
                                                }}
                                            />
                                        </div>

                                        {/* Stage 3: Review */}
                                        <div className="relative mr-[25px] flex flex-col">
                                            <div 
                                                className={`font-poppins text-[10px] leading-[120%] w-[50px] h-[12px] right-[-4px] relative ${
                                                    currentStage >= 3 ? 'text-[#3B87DD]' : 'text-[#C5C5C5]'
                                                }`}
                                            >
                                                3. Review
                                            </div>
                                            <div
                                                className={`rounded-[2.5px] w-[78px] h-[5px] ${
                                                    currentStage >= 3 ? 'bg-[#3B87DD]' : 'bg-[#D9D9D9]'
                                                }`}
                                                style={{
                                                    marginTop: "10px", // Ensuring 10px vertical space
                                                }}
                                            />
                                        </div>

                                        {/* Stage 4: Submit */}
                                        <div className="relative mr-[25px] flex flex-col">
                                            <div 
                                                className={`font-poppins text-[10px] leading-[120%] w-[45px] h-[12px] right-[-4px] relative whitespace-nowrap ${
                                                    currentStage >= 4 ? 'text-[#3B87DD]' : 'text-[#C5C5C5]'
                                                }`}
                                            >
                                                4. Submit
                                            </div>
                                            <div
                                                className={`rounded-[2.5px] w-[78px] h-[5px] ${
                                                    currentStage >= 4 ? 'bg-[#3B87DD]' : 'bg-[#D9D9D9]'
                                                }`}
                                                style={{
                                                    marginTop: "10px", // Ensuring 10px vertical space
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/*Dynamic heading based on stage*/}
                                <div className="absolute left-[45px] top-[98px] right-[52px] bottom-[529px] w-auto h-auto text-left font-bold text-[#33342E] text-[32px] leading-[120%]">
                                    {currentStage === 1 && "Intro Section"}
                                    {currentStage === 2 && "Events"}
                                    {currentStage === 3 && "Review"}
                                    {currentStage === 4 && "Submitted"}
                                </div>
                                
                                <div className="absolute left-[37px] top-[134px] w-[208px] h-[19px] font-poppins text-[13px] leading-[150%] text-[#33342E]">
                                    <span className="text-[#F93232]">*</span> Indicates required question
                                </div>
                                {/* form */}
                                <form className="flex flex-col h-full"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (!title || !date || !time) {
                                            alert("Please fill in all required fields");
                                            return;
                                        }
                                        handleSubmit(e);
                                    }}
                                >
                                    <div className="flex-grow p-8 overflow-y-auto">
                                        {currentStage == 1 && (
                                            <div className="absolute left-[48px] top-[189px]">
                                                <label className="block font-poppins font-medium text-[14px] leading-[120%] text-[#33342E] mb-2 text-left">Newsletter Title <span className="text-[#F93232]">*</span></label>
                                                <div className="relative mt-[10px]">
                                                    <input
                                                        type="text"
                                                        className="text-[#C7C9D9] w-[353px] h-[29px] bg-[#FBFBFB] border-[0.65px] border-[#DDE5E9] border-inset rounded-[11px] px-3 py-2 focus:outline-none"
                                                        placeholder="Text"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* attach files */}
                                        <div className="absolute left-[48px] top-[269px] w-[353px]">
                                            <label className="block font-poppins font-medium text-[14px] leading-[120%] text-[#33342E] mb-[10px] text-left">Attach Files</label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        if (e.target.files) {
                                                            setFiles([...files, ...Array.from(e.target.files)]);
                                                        }
                                                    }}
                                                    multiple
                                                />
                                                <label 
                                                    htmlFor="file-upload"
                                                    className="cursor-pointer w-[85px] h-[34px] bg-white flex items-center justify-center rounded-[11px] border-[1.5px] border-[#F7F7FB] hover:bg-gray-50 transition-colors"
                                                    style={{
                                                        boxShadow: "inset 0 0 0 1.5px #F7F7FB"
                                                    }}
                                                >
                                                    <span className="text-[#33342E] text-xs">Add File</span>
                                                </label> {/*could add no files attached to indicate?*/}
                                            </div>
                                            {/* file preview? */}
                                            <div className="mt-2 space-y-1 hidden">
                                                {/* not sure what to put here*/}
                                            </div>
                                        </div>

                                        {/* subheader */}
                                        <div className="absolute left-[48px] top-[343px]">
                                            <label className="block font-poppins font-medium text-[14px] leading-[120%] text-[#33342E] mb-2 text-left">Sub header</label>
                                            <div className="relative mt-[10px]">
                                                <input
                                                    type="text"
                                                    className="text-[#C7C9D9] w-[353px] h-[29px] bg-[#FBFBFB] border-[0.65px] border-[#DDE5E9] border-inset rounded-[11px] px-3 py-2 focus:outline-none"
                                                    placeholder="Text"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        {/*body text*/}
                                        <div className="absolute left-[48px] top-[423px]">
                                            <label className="block font-poppins font-medium text-[14px] leading-[120%] text-[#33342E] mb-2 text-left">Body Text</label>
                                            <div className="relative mt-[10px]">
                                                <input
                                                    type="text"
                                                    className="text-[#C7C9D9] w-[353px] h-[29px] bg-[#FBFBFB] border-[0.65px] border-[#DDE5E9] border-inset rounded-[11px] px-3 py-2 focus:outline-none"
                                                    placeholder="Text"
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        
                                        {/*add section*/}
                                        <div className="absolute left-[48px] top-[502px]">
                                            <label className="block font-poppins font-medium text-[14px] leading-[120%] text-[#33342E] mb-2 text-left">Body Text</label>
                                            <div className="relative mt-[10px]">
                                                <input
                                                    type="text"
                                                    className="text-[#C7C9D9] w-[353px] h-[29px] bg-[#FBFBFB] border-[0.65px] border-[#DDE5E9] border-inset rounded-[11px] px-3 py-2 focus:outline-none"
                                                    placeholder="Text"
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/* footer and button groups */}
                                    <div className="bg-[#F7F7FB] w-full h-[71px] flex items-center justify-end px-8 rounded-b-xl border-t border-gray-200">
                                        <div className="flex space-x-4">
                                            {/* back button*/}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (currentStage > 1) {
                                                    setCurrentStage((prev) => (prev - 1) as 1 | 2 | 3 | 4);
                                                    } else {
                                                    handleClosePopup(false);
                                                    }
                                                }}
                                                className="px-5 h-[29px] flex items-center justify-center rounded-full text-[#3B87DD] bg-[#F7F7FB] hover:bg-[#F0F4FF] transition-colors text-sm font-medium"
                                                style={{
                                                    padding: '6px 20px',
                                                    border: '2px solid #3B87DD'
                                                }}
                                            >
                                                {currentStage === 1 ? "Back" : "Previous"}
                                            </button>
                                            {/* next button */}
                                            <button
                                                type="button" // Changed from "submit" to handle multi-step
                                                onClick={() => {
                                                    if (currentStage < 4) {
                                                    setCurrentStage((prev) => (prev + 1) as 1 | 2 | 3 | 4);
                                                    } else {
                                                    handleSubmit(); // Final submission
                                                    }
                                                }}
                                                className="px-5 h-[29px] flex items-center justify-center rounded-full text-white bg-[#3B87DD] hover:bg-[#2A6EC8] transition-colors text-sm font-medium"
                                                style={{ padding: '6px 20px' }}
                                            >
                                                {currentStage === 4 ? "Submit" : "Next"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </button>
            </div>
        </div>
    )
};

export default Newsletters;