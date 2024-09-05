

function DashboardDashboard() {
  return (
    <div className="overflow-hidden flex flex-row w-[100%] h-screen px-5 gap-5">


                {/* width of the gallery */}
                <div className='w-[70%] flex flex-col gap-5'>
                    <div className="bg-blue-100 h-[30%]">
                        <h1>welcome stats</h1>
                    </div>

                    <div className="bg-orange-100 h-[70%]">
                        <h1>upcoming events</h1>
                    </div>
                </div>
                    
                <div className='bg-green-100 w-[30%] h-[40vw]'>
                    {/* adjust sizes and stuff as needed */}
                    <p>leaderboard</p>
                </div>
            
        </div>
        
  );
}

export default DashboardDashboard;