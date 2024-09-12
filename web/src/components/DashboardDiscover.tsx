

function DashboardDiscover() {
  return (
    <div className="overflow-hidden flex flex-col w-[100%] h-screen px-5">


                {/* width of the gallery */}
                <div className='flex flex-col bg-white mb-5 h-[33%] rounded-lg shadow-md'>
                    <div className='flex flex-row p-7'>
                    <div className='bg-slate-200 h-[200px] w-[680px] rounded-lg'></div>
                    <div className="flex flex-col">
                    <div className='pl-5 text-2xl font-medium text-primary pt-1'>This month's event...</div>
                    <div className='pl-5 pt-3'>Sat, 11 May</div>
                    <div className='pl-5 font-medium'>UoA Annual Volunteers Day</div>
                    <div className='pl-5 font-light'>The University of Auckland</div>
                    <div className="flex flex-row pt-2 pb-2">
                    <div className="ml-5 mt-1 rounded-full bg-slate-400 w-3 h-3"></div>
                    <div className='ml-2 font-light text-sm'>Eduardo is interested</div>
                    <div className="ml-5 mt-1 rounded-full bg-slate-400 w-3 h-3"></div>
                    <div className='ml-2 font-light text-sm'>John, and 4 other friends are going</div>
                    </div>
                    <div className='pl-5 text-primary hover:underline'>More Info</div>
                    </div>
                    </div>
                </div>
                    
                <div className='bg-green-100 mb-5 h-[60%]'>
                    {/* adjust sizes and stuff as needed */}
                    <p>bottom stuff</p>
                </div>
            
        </div>
        
  );
}

export default DashboardDiscover;