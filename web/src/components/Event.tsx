export default function Event() {
    return (
        <div className="flex bg-slate-50 items-center m-2"> {/* event-container */}
            <div className="inline m-3"> {/* image-container */}
                <img className="h-24 w-40 object-cover rounded-md" src="../../assets/gallery/events/sample1.png" />
            </div>
            <div className="inline p-1.5"> {/* event details on the right */}
                <p className="mb-0 font-bold text-xs">SAT, 11 MAY</p>
                <h2 className="inline font-bold m-0 text-xl">UoA Annual Volunteers Day</h2>
                <p className="mb-0">The University of Auckland</p>
                <div className="inline-block items-center py-1 pr-5"> {/* people */}
                    {/* profile image */}
                    <img className="h-7 w-7 object-cover rounded-full inline" src="../../assets/gallery/events/sample1.png" />
                    <p className="inline ml-2.5 text-sm">Eduardo is interested</p>
                </div>
                <div className="inline-block items-center py-1 pr-5"> {/* people */}
                    {/* profile image */}
                    <img className="h-7 w-7 object-cover rounded-full inline" src="../../assets/gallery/events/sample1.png" />
                    {/* profile image which overlaps */}
                    <img className="h-7 w-7 object-cover rounded-full inline -ml-2.5" src="../../assets/gallery/events/sample1.png" />
                    <p className="inline ml-2.5 text-sm">John, May, and 4 other friends are going</p>
                </div>
            </div>
            
        </div>
    )
}