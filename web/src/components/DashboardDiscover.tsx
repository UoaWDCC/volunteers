import EventsScrollContainer from "./Discover/EventsScrollContainer";

function DashboardDiscover() {
  return (
    <div className="overflow-hidden flex flex-col w-[100%] h-screen px-5">


                {/* width of the gallery */}
                <div className='flex flex-col bg-red-100 mb-5 h-[40%]'>
                    <h1>top component</h1>
                </div>
                    
                <div className='mb-5 h-[60%]'>
                    {/* adjust sizes and stuff as needed */}
                    <EventsScrollContainer/>
                </div>
            
        </div>
        
  );
}

export default DashboardDiscover;