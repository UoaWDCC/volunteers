import axios from 'axios';
import { useState, useEffect } from 'react';
import NewsletterCard from "./NewsletterCard";
import { EditorState, convertToRaw } from 'draft-js';;
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Newsletters: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState("Club Event");
    const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4>(1); // 1 = Intro, 2 = Events, 3 = Review, 4 = Submit

    const [showIntro, setShowIntro] = useState(true);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [files, setFiles] = useState<File[]>([]);
    const [dropdownOpenStates, setDropdownOpenStates] = useState<boolean[]>([]); // Track open state for each dropdown
    const [dropdownCount, setDropdownCount] = useState(1); // Track how many dropdowns we have
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

    const [events, setEvents] = useState<{id: string, name: string}[]>([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState(false);
    const [eventsError, setEventsError] = useState('');
    const [showEvents, setShowEvents] = useState(false);
    const [draggedIndex] = useState<number | null>(null);

    const [showReview, setShowReview] = useState(false);
    const [showSubmit, setShowSubmit] = useState(false);
    const [emailPreview, setEmailPreview] = useState<string>('');

    useEffect(() => {
        const loadEvents = async () => {
            setIsLoadingEvents(true);
            setEventsError('');
            try {
                const response = await fetch('/api/events');
                const data = await response.json();

                console.log('Raw events data:', data);

                if (!Array.isArray(data)) {
                    throw new Error('Invalid data format received from server');
                }

                setEvents(data.map(event => ({
                    id: event.id,
                    name: event.event_title
                })));
            } catch (error) {
                console.error('Error fetching events:', error);
                setEventsError(
                    error instanceof Error 
                        ? error.message 
                        : 'Failed to load events. Please try again later.'
                );
            } finally {
                setIsLoadingEvents(false);
            }
        };

        if (isPopupOpen && currentStage === 2) {
            loadEvents();
        }
    }, [isPopupOpen, currentStage]);

    useEffect(() => {
        if (showReview) {
            const rawContent = convertToRaw(editorState.getCurrentContent());
            const htmlContent = draftToHtml(rawContent);
            setEmailPreview(htmlContent);
        }
    }, [showReview, editorState]);

    const allEventsSelected = () => {
        return dropdownCount >= events.length || events.length === 0;
    };

    const resetEventsSection = () => {
        setSelectedEvents([]);
        setDropdownOpenStates([]);
        setDropdownCount(1);
    };

    const goToIntro = () => {
        setShowIntro(true);
        setShowEvents(false);
        setShowReview(false);
        setShowSubmit(false);
        setCurrentStage(1);
        resetEventsSection();
    };

    const goToEvents = () => {
        setShowIntro(false);
        setShowEvents(true);
        setShowReview(false);
        setShowSubmit(false);
        setCurrentStage(2);
    };

    const goToReview = () => {
        generatePreview(); // Generate preview when entering review stage
        setShowIntro(false);
        setShowEvents(false);
        setShowReview(true);
        setShowSubmit(false);
        setCurrentStage(3);
    };

    const goToSubmit = () => {
        setShowIntro(false);
        setShowEvents(false);
        setShowReview(false);
        setShowSubmit(true);
        setCurrentStage(4);
    };

    const goToDashboard = () => {
        setIsPopupOpen(false);
        setCurrentStage(1);
        setTitle("");
        setDate("");
        setTime("");
        setType("Club Event");
        setEditorState(EditorState.createEmpty());
        setFiles([]);
        resetEventsSection();
    };

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
        goToIntro();
    };

    const handleNextClick = () => {
        if (currentStage === 1) {
            if (!title) {
                alert("Please fill in the newsletter title");
                return;
            }
            if (!date) {  // date is used for subheader
                alert("Please fill in the subheader");
                return;
            }
            const contentState = editorState.getCurrentContent();
            if (!contentState.hasText()) {
                alert("Please fill in the body text");
                return;
            }
        }

        if (currentStage === 2) {
            const hasSelectedEvent = selectedEvents.some(event => event && event.trim() !== '');
            if (!hasSelectedEvent) {
                alert("Please select at least one event");
                return;
            }
            setEventsError('');
        }

        switch(currentStage) {
            case 1: 
                goToEvents();
                break;
            case 2:
                goToReview();
                break;
            case 3:
                goToSubmit();
                break;
            case 4:
                goToDashboard();
                break;
        }
    };

    const handleBackClick = () => {
        if (currentStage > 1) {
            switch(currentStage) {
                case 2: 
                    goToIntro();
                    break;
                case 3:
                    goToEvents();
                    break;
                case 4:
                    goToReview();
                    break;
            }
        } else {
            handleClosePopup(false);
        }
    };

    const handleClosePopup = (ignoreValidation = false) => {
        if(!ignoreValidation && (title || date || time || selectedEvents.length > 0 || files.length > 0 || editorState.getCurrentContent().hasText())){
            if (!confirm("You have unsaved changes. Close anyway?")){
                return; //dont close if user cancels
            }
        }
        setIsPopupOpen(false);
        setCurrentStage(1);
        resetEventsSection();
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
            setFiles(prev => [...prev, ...imageFiles]);
        }
    };

    const generatePreview = async () => {
        try {
            const rawContent = convertToRaw(editorState.getCurrentContent());
            const htmlContent = draftToHtml(rawContent);
            const appUrl = import.meta.env.VITE_API_URL;

            const response = await axios.post(`${appUrl}/api/newsletter/preview`, {
                newsletterTitle: title,
                newsletterSubheader: date,
                newsletterDescription: htmlContent,
                newsletterEventIds: selectedEvents
            });

            if (response.data) {
                setEmailPreview(response.data);
            } else {
                throw new Error('No preview data received');
            }
        } catch (error) {
            console.error('Error generating preview:', error);
        }
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        console.log("Creating newsletter:", { 
            title, 
            date, 
            time, 
            type,
            content 
        });
        goToSubmit();
    };

    const handleAddEvent = (e: React.MouseEvent) => {
        e.preventDefault();
        if (dropdownCount < events.length) {
            setDropdownCount(prev => {
                setDropdownOpenStates(prevStates => [...prevStates, false]);
                return prev + 1;
            });
        }
    };

    const handleEventSelect = (eventName: string, index: number) => {
        setSelectedEvents(prev => {
            const newEvents = [...prev];
            newEvents[index] = newEvents[index] === eventName ? '' : eventName;
            return newEvents;
        });
        //clear error when event selected
        setEventsError('');
    };

    const toggleDropdown = (index: number) => {
        setDropdownOpenStates(prev => {
            const newStates = [...prev];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    const getAvailableEvents = (currentIndex: number) => {
        return events.filter(event => 
            !selectedEvents.includes(event.name) || 
            selectedEvents[currentIndex] === event.name
        );
    };

    return (
        <div className="flex flex-col bg-white w-full shadow-lg rounded-xl p-6">
            {/* Header */}

            <div className="flex items-center w-full self-start">
                <h2 className="dashboard text-heading2 text-primary">
                    Newsletters
                </h2>

                <button
                    className="dashboard self-start text-body-heading text-primary underline bg-transparent"
                    // onClick={show notifications modal or something}
                >
                    View All
                </button>

                {/* Spacer tp push items to the right */}
                <div className="flex-grow" />

                {/* Create button */}
                <div className="rounded-full ml-4 -mt-4 self-center" onClick={handleCreateNewsletter}>
                    <img src="/assets/dashboard/admin/plus.svg" alt="Create Newsletter" className="w-6 h-6" />
                </div>
            </div>

            <hr className="border-t-2 border-gray-300 rounded-full my-2" />

            {/* Notification cards*/}
            <div className="flex flex-col overflow-hidden overflow-y-scroll gap-6">
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

            {/* Popup Overlay */}
            {isPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Blurred background */}
                    <div
                        className="absolute inset-0 backdrop-blur-md bg-black/50"
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
                                        currentStage === 1 ? "text-[#3B87DD]" : "text-[#C5C5C5]"
                                    }`}>
                                        1. Intro
                                    </div>
                                    <div
                                        className={`rounded-[2.5px] w-[78px] h-[5px] ${
                                            currentStage === 1 ? "bg-[#3B87DD]" : "bg-[#D9D9D9]"
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
                                            currentStage === 2 ? 'text-[#3B87DD]' : 'text-[#C5C5C5]'
                                        }`}
                                    >
                                        2. Events
                                    </div>
                                    <div
                                        className={`rounded-[2.5px] w-[78px] h-[5px] ${
                                            currentStage === 2 ? 'bg-[#3B87DD]' : 'bg-[#D9D9D9]'
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
                                            currentStage === 3 ? 'text-[#3B87DD]' : 'text-[#C5C5C5]'
                                        }`}
                                    >
                                        3. Review
                                    </div>
                                    <div
                                        className={`rounded-[2.5px] w-[78px] h-[5px] ${
                                            currentStage === 3 ? 'bg-[#3B87DD]' : 'bg-[#D9D9D9]'
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
                                            currentStage === 4 ? 'text-[#3B87DD]' : 'text-[#C5C5C5]'
                                        }`}
                                    >
                                        4. Submit
                                    </div>
                                    <div
                                        className={`rounded-[2.5px] w-[78px] h-[5px] ${
                                            currentStage === 4 ? 'bg-[#3B87DD]' : 'bg-[#D9D9D9]'
                                        }`}
                                        style={{
                                            marginTop: "10px", 
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
                            {currentStage === 4 && <span className="text-[#0034a0]">Submitted</span>}
                        </div>
                        
                        {/* form */}
                        <form className="flex flex-col h-full"
                            onSubmit={(e) => {
                                if(currentStage === 4){
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                        >
                            <div className="flex-grow p-8 overflow-y-auto">
                                {showIntro && (
                                    <div className="space-y-6">
                                        <div className="absolute left-[52px] top-[134px] w-[200px] h-[19px] font-poppins text-[13px] leading-[150%] text-[#33342E] mb-4">
                                            <span className="text-[#F93232]">*</span> Indicates required field
                                        </div>
                                        <div className="absolute left-[48px] top-[160px]">
                                            <label className="block font-poppins font-medium text-[14px] leading-[120%] text-[#33342E] mb-2 text-left">Newsletter Title <span className="text-[#F93232]">*</span></label>
                                            <div className="relative mt-[10px]">
                                                <input
                                                    type="text"
                                                    className="text-[10px] text-[#C7C9D9] w-[353px] h-[29px] bg-[#FBFBFB] border-[0.65px] border-[#DDE5E9] border-inset rounded-[11px] px-3 py-2 focus:outline-none"
                                                    placeholder="Text"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* subheader */}
                                        <div className="absolute left-[48px] top-[245px]">
                                            <label className="block font-poppins font-medium text-[14px] leading-[120%] text-[#33342E] mb-2 text-left">Sub header <span className="text-[#F93232]">*</span></label>
                                            <div className="relative mt-[10px]">
                                                <input
                                                    type="text"
                                                    className="text-[10px] text-[#C7C9D9] w-[353px] h-[29px] bg-[#FBFBFB] border-[0.65px] border-[#DDE5E9] border-inset rounded-[11px] px-3 py-2 focus:outline-none"
                                                    placeholder="Text"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {/*body text*/}
                                        <div className="absolute left-[48px] top-[330px] w-[353px]">
                                            <label className="block font-poppins font-medium text-[14px] leading-[120%] text-[#33342E] mb-2 text-left">
                                                Body Text <span className="text-[#F93232]">*</span>
                                            </label>
                                            <div className="border-[0.65px] border-[#DDE5E9] rounded-[11px] overflow-hidden h-[100px]">
                                                <Editor
                                                    editorState={editorState}
                                                    onEditorStateChange={setEditorState}
                                                    toolbar={{
                                                        options: ['inline', 'list', 'textAlign', 'link'],
                                                        inline: {
                                                        options: ['bold', 'italic', 'underline'],
                                                        },
                                                    }}
                                                    wrapperClassName="wrapper-class"
                                                    editorClassName="editor-class"
                                                    toolbarClassName="toolbar-class"
                                                    placeholder=" Text"
                                                />
                                            </div>
                                        </div>

                                        {/*add images */}
                                        <div className="absolute left-[48px] top-[470px] w-[353px]">
                                            <label className="block font-poppins font-medium text-[14px] leading-[120%] text-[#33342E] mb-2 text-left">
                                                Add Images
                                            </label>

                                            <div className="mt-[10px]">
                                                <input 
                                                    type="file" 
                                                    id="file-upload" 
                                                    className="hidden" 
                                                    accept="image/*" 
                                                    multiple 
                                                    onChange={handleFileInput}
                                                />
                                                <button
                                                    type="button"
                                                    className="w-[97px] h-[29px] bg-[#FBFBFB] border-[0.65px] border-solid border-[#DDE5E9] rounded-[11px] flex items-center justify-center"
                                                    onClick={() => document.getElementById('file-upload')?.click()}
                                                >
                                                    <span className="font-poppins text-[10px] text-[#C7C9D9]">
                                                        Browse Files
                                                    </span>
                                                </button>
                                            </div>

                                            {/* preview uploaded files */}
                                            {files.length > 0 && (
                                                <div className="mt-3 grid grid-cols-3 gap-2">
                                                    {files.map((file, index) => (
                                                        <div key={index} className="relative group">
                                                            <img 
                                                                src={URL.createObjectURL(file)} 
                                                                alt={file.name}
                                                                className="w-full h-20 object-cover rounded-[5px]"
                                                            />
                                                            <button 
                                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setFiles(files.filter((_, i) => i !== index));
                                                                }}
                                                            >
                                                                x
                                                            </button>
                                                            <p className="text-[8px] text-ellipsis overflow-hidden whitespace-nowrap">
                                                                {file.name.length > 15 ? `${file.name.substring(0, 12)}...` : file.name}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {showEvents && (
                                    <>
                                        <div className="absolute left-[52px] top-[134px] w-[208px] h-[19px] font-poppins text-[13px] leading-[150%] text-[#33342E]">
                                            <span className="text-[#F93232]">*</span> Indicates required field
                                        </div>

                                        {isLoadingEvents ? (
                                            <div className="absolute left-[53px] top-[170px] w-[calc(100%-70px)] flex items-center justify-center">
                                                <p>Loading events...</p>
                                            </div>
                                        ) : eventsError ? (
                                            <div className="absolute left-[53px] top-[170px] w-[calc(100%-70px)] text-red-500">
                                                {eventsError}
                                            </div>
                                        ) : events.length === 0 ? (
                                            <div className="absolute left-[53px] top-[170px] w-[calc(100%-70px)]">
                                                <p>No events available</p>
                                            </div>
                                        ) : (
                                            <div 
                                                className={`absolute left-[52px] top-[170px] w-[calc(100%-70px)] ${
                                                    dropdownCount >= 3 ? 'max-h-[350px] overflow-y-auto' : ''
                                                }`}
                                                style={{ 
                                                    scrollbarWidth: 'thin'
                                                }}
                                            >
                                                {Array.from({ length: dropdownCount }).map((_, index) => {
                                                    const availableEvents = getAvailableEvents(index);
                                                    return (
                                                        <div key={index} 
                                                            id={`event-${index}`}
                                                            className={`relative ${dropdownCount > 1 ? "mb-[38px]" : "mb-[30px]"} transition-all duration-200 ${
                                                                draggedIndex === index ? 'opacity-50' : 'opacity-100'
                                                            }`}>
                                                            <div className="flex items-start">
                                                                <div className="relative mr-[15px] flex flex-col items-center" style={{ width: '11px' }}>
                                                                    {index < dropdownCount - 1 && (
                                                                        <div 
                                                                            className="absolute left-1/2 top-[9px] w-[3px] h-[calc(100%+78px)] -translate-x-1/2 bg-[#D9D9D9] z-0"
                                                                        />
                                                                    )}

                                                                    <div 
                                                                        className={`w-[11px] h-[11px] rounded-full group-hover:bg-[#3B87DD] ${
                                                                            index < dropdownCount - 1 ? 'bg-[#D9D9D9]' : 'bg-[#3B87DD]'
                                                                        } transition-colors duration-200 z-10`} />
                                                                        {/* three lines and dragging stuff for now not working too well
                                                                        style={{ zIndex: 10 }}
                                                                        draggable
                                                                        onDragStart={(e) => {
                                                                            handleDragStart(index);
                                                                            e.dataTransfer.setDragImage(new Image(), 0, 0);
                                                                        }}
                                                                        onDrag={(e) => {
                                                                            if (e.clientY > 0) {
                                                                                const container = e.currentTarget.parentElement?.parentElement;
                                                                                if (container) {
                                                                                    const containerRect = container.getBoundingClientRect();
                                                                                    const line = container.querySelector('[style*="z-index: 0"]') as HTMLElement;
                                                                                    
                                                                                    if (line) {
                                                                                        const lineRect = line.getBoundingClientRect();
                                                                                        const minY = lineRect.top;
                                                                                        const maxY = lineRect.bottom;
                                                                                        const newY = Math.min(Math.max(e.clientY, minY), maxY);
                                                                                        
                                                                                        const itemHeight = 60;
                                                                                        const newIndex = Math.round((newY - minY) / itemHeight);
                                                                                        
                                                                                        if (newIndex !== hoveredIndex && newIndex >= 0 && newIndex < dropdownCount) {
                                                                                            setHoveredIndex(newIndex);
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }}
                                                                        onDragOver={(e) => {
                                                                            e.preventDefault();
                                                                            if (hoveredIndex !== null && hoveredIndex !== index) {
                                                                                handleDragEvent(hoveredIndex);
                                                                            }
                                                                        }}
                                                                        onDrop={() => {
                                                                            handleDropEvent();
                                                                        }}
                                                                        onDragEnd={handleDragEnd}
                                                                    />
                                                                    
                                                                    {selectedEvents[index] && (
                                                                        <div className="absolute left-[-18px] top-[13.5px] flex flex-col gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-move">
                                                                            <div className="w-[12px] h-[1px] bg-[#3B87DD]"></div> 
                                                                            <div className="w-[12px] h-[1px] bg-[#3B87DD]"></div>
                                                                            <div className="w-[12px] h-[1px] bg-[#3B87DD]"></div>
                                                                        </div>
                                                                    )}
                                                                        */}
                                                                </div>

                                                                <div className="flex-1 flex items-center gap-2 relative">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center h-[27px]">
                                                                            <label className="font-poppins font-medium text-[14px] leading-[120%] text-[#33342E] w-[98px] h-[30px]">
                                                                                Select event <span className="text-[#F93232]">*</span>
                                                                            </label>
                                                                        </div>
                                                                        
                                                                        <div className="flex items-center gap-2 relative">
                                                                            {selectedEvents[index] ? (
                                                                                <div className="relative flex items-center">
                                                                                    <div className="text-[10px] text-[#C7C9D9] w-[190px] h-[29px] bg-[#FBFBFB] border-[0.65px] border-[#DDE5E9] rounded-[11px] px-3 py-2 flex items-center justify-center overflow-hidden">
                                                                                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                                                                                            {selectedEvents[index].length > 20 
                                                                                                ? `${selectedEvents[index].substring(0, 17)}...`
                                                                                                : selectedEvents[index]}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="w-[190px] mt-[-5px]">
                                                                                    <div 
                                                                                        className={`h-[29px] rounded-[11px] px-[15px] py-[5px] flex items-center justify-between cursor-pointer ${
                                                                                            dropdownOpenStates[index]
                                                                                                ? 'bg-white border-[2px] border-[#0034A1]/[63%]' 
                                                                                                : 'bg-[#FBFBFB] border-[0.65px] border-[#DDE5E9]'
                                                                                            }`}
                                                                                            onClick={() => toggleDropdown(index)}
                                                                                    >
                                                                                        <span className={`font-poppins ${
                                                                                            dropdownOpenStates[index]
                                                                                                ? 'font-semibold text-[10px] leading-[150%] tracking-[0.5%] text-[#0034A1]/[63%]'
                                                                                                : 'text-[10px] ' + (selectedEvents[index] ? 'text-[#33342E]' : 'text-[#C7C9D9]')
                                                                                            }`}>
                                                                                            {selectedEvents[index] || 'Select'}
                                                                                        </span>

                                                                                        <div 
                                                                                            className="w-[19px] h-[19px] rounded-[28.5px] bg-[#0034A1]/[63%] flex items-center justify-center ml-[16px]"
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                toggleDropdown(index);
                                                                                            }}
                                                                                        >
                                                                                            <svg 
                                                                                                width="8" 
                                                                                                height="6" 
                                                                                                viewBox="0 1 8 3"
                                                                                                fill="none"
                                                                                                className={`transition-transform duration-200 ${dropdownOpenStates[index] ? 'rotate-180' : ''}`}
                                                                                            >
                                                                                                <path
                                                                                                    d="M1 2L4 5L7 2"
                                                                                                    stroke="#FFFFFF"
                                                                                                    strokeWidth="1.2"
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"
                                                                                                />
                                                                                            </svg>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        
                                                                        {dropdownOpenStates[index] && (
                                                                            <div
                                                                                className="absolute z-10 w-[193px] bg-white rounded-[11px] overflow-hidden mt-1"
                                                                                style={{
                                                                                    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
                                                                                    height: 'fit-content',
                                                                                    filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.2))'
                                                                                }}
                                                                            >
                                                                                <div className="overflow-y-auto max-h-[350px]" style={{ scrollbarWidth: 'none' }}>
                                                                                    {availableEvents.map((event, i) => (
                                                                                        <div key={event.id} className="relative group"> 
                                                                                            <div
                                                                                                className="pl-[16px] pr-[12px] py-[8px] bg-[#F7F7FB] hover:bg-[#F0F4FF] cursor-pointer"
                                                                                                style={{
                                                                                                    fontFamily: 'Poppins, sans-serif',
                                                                                                    fontSize: '10px',
                                                                                                    fontWeight: '400',
                                                                                                    color: '#333333',
                                                                                                    borderBottom: i < availableEvents.length - 1 ? '0.5px solid #C5C5C5' : 'none'
                                                                                                }}
                                                                                                onClick={(e) => {
                                                                                                    e.stopPropagation();
                                                                                                    handleEventSelect(event.name, index);
                                                                                                    toggleDropdown(index);
                                                                                                }}
                                                                                            >
                                                                                                {event.name}
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    {dropdownCount > 1 && (
                                                                        <button
                                                                            type="button" //delete button
                                                                            onClick={() => { // make sure at least one event is there
                                                                                if (dropdownCount > 1) {
                                                                                    const newSelectedEvents = [...selectedEvents];
                                                                                    newSelectedEvents.splice(index, 1);
                                                                                    setSelectedEvents(newSelectedEvents);

                                                                                    const newDropdownStates = [...dropdownOpenStates];
                                                                                    newDropdownStates.splice(index, 1);
                                                                                    setDropdownOpenStates(newDropdownStates);
                                                                                    setDropdownCount(prev => prev - 1);
                                                                                }
                                                                            }}
                                                                            className="absolute right-[140px] w-[14px] h-[14px] rounded-full bg-[#C7C9D9] flex items-center justify-center p-0 border-none"
                                                                        >
                                                                            <svg 
                                                                                width="6" 
                                                                                height="6" 
                                                                                viewBox="0 0 6 6" 
                                                                                fill="none" 
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="flex-shrink-0"
                                                                            >
                                                                                <path 
                                                                                    d="M5 1L1 5M1 1L5 5" 
                                                                                    stroke="white" 
                                                                                    strokeWidth="1.2" 
                                                                                    strokeLinecap="round"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            
                                                {/* Add another event section */}
                                                {!allEventsSelected() && (
                                                    <div className="ml-[27.5px]" style={{ marginTop: dropdownCount > 1 ? '18.15px' : '10px' }}>
                                                        <div className="flex flex-col gap-2 w-[190px]">
                                                            <label className="font-poppins font-medium text-[14px] leading-[120%] text-[#33342E] whitespace-nowrap">
                                                                Add another event
                                                            </label>
                                                            <button 
                                                                type="button"
                                                                onClick={handleAddEvent}
                                                                className="relative w-[97px] h-[30.17px] flex items-center justify-center rounded-[11px] bg-[#FFFFFF] border-[0.65px] border-[#DDE5E9] border-solid"
                                                            >
                                                                <span className="font-poppins text-[10px] leading-[150%] tracking-[0.5%] text-[#C7C9D9]">
                                                                    Add
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}

                                {showReview && (
                                    <>
                                        <div className="absolute left-[47px] top-[134px] w-[208px] h-[19px] font-poppins text-[13px] leading-[150%] text-[#33342E]">
                                            Review form before submitting
                                        </div>
                                    
                                        <div 
                                            className="absolute left-[74px] top-[180px] w-[305px] h-[360px] rounded-[11px] border-[3px] border-[#3B87DD] border-inset"
                                            style={{ 
                                                boxSizing: 'border-box',
                                                borderStyle: 'inset',
                                            }}
                                        >
                                            {/* html content preview */}
                                            <div 
                                                className="w-full h-full overflow-y-auto min-h-[350px]"
                                                dangerouslySetInnerHTML={{ __html: emailPreview }}
                                            />
                                        </div>
                                        
                                        <div 
                                            className="absolute left-[172px] top-[549px] w-[121px] h-[20px] font-poppins italic text-[11px] leading-[150%] text-[#33342E]"
                                        >
                                            Preview of Newsletter
                                        </div>
                                    </>
                                )}
                                
                                {showSubmit && (
                                    <>
                                        <div className="absolute left-[47px] top-[134px] w-[208px] h-[19px] font-poppins text-[13px] leading-[150%] text-[#33342E]">
                                            Your Newsletter is live!
                                        </div>

                                        <div className="absolute left-[48%] top-[190px] transform -translate-x-1/2">
                                            <img 
                                                src="/assets/confetti-icon.svg"
                                                alt="Confetti"
                                                className="w-[300px] h-auto rounded-lg scale-[0.6]"
                                            />
                                        </div>

                                        <div className="absolute left-[138px] top-[461px]">
                                            <button
                                                onClick={goToDashboard}
                                                className="px-[20px] py-[6px] rounded-[11px] bg-[#3B87DD] hover:bg-[#2A6EC8] text-white text-[14px] text-sm font-medium transition-colors"
                                            >
                                                Return to Dashboard
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                            {/* footer and button groups */}
                            
                            <div className="bg-[#F7F7FB] w-full h-[71px] flex items-center justify-end px-8 rounded-b-xl border-t border-gray-200">
                                {currentStage < 4 && (    
                                    <div className="flex space-x-4">
                                        {/* back button*/}
                                        <button
                                            type="button"
                                            onClick={handleBackClick}
                                            className="px-5 h-[29px] flex items-center justify-center rounded-full text-[#3B87DD] bg-[#F7F7FB] hover:bg-[#F0F4FF] transition-colors text-sm font-medium"
                                            style={{
                                                padding: '6px 20px',
                                                border: '2px solid #3B87DD'
                                            }}
                                        >
                                            Back
                                        </button>
                                        {/* next button */}
                                        <button
                                            type={currentStage === 4 ? "submit" : "button"}
                                            onClick={handleNextClick}
                                            className="px-5 h-[29px] flex items-center justify-center rounded-full text-white bg-[#3B87DD] hover:bg-[#2A6EC8] transition-colors text-sm font-medium"
                                            style={{ padding: '6px 20px' }}
                                        >
                                            {currentStage === 4 ? "Submit" : "Next"}
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Newsletters;