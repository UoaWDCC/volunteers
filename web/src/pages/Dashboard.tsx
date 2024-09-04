import CommunityGalleryWhole from '@components/CommunityGalleryWhole';

function Dashboard() {
  return (
    <div className="bg-[#F7F7FB] primary-background overflow-hidden flex flex-row">
        <div className='bg-primary w-[15%] h-auto'> 
            {/* place thing component here and remove bg-primary */}
            <h1>side thing</h1>
        </div>

        <div className='flex flex-col w-[85%] marker:p-5'>
            <div className='bg-yellow-100'>
                {/* place searchbar component here and remove bg-yellow */}
                <h1>searchbar</h1>
            </div>

            <div className='flex flex-row'>
                    <div className='flex flex-col w-[70%] px-5'>
                        <CommunityGalleryWhole />
                    </div>
                <div className='bg-green-100 w-[30%] h-[40vw] px-5'>
                    {/* place thing component here and remove bg-green */}
                    <p>side thing</p>
                </div>
            
            </div>
        </div>
        
    </div>
  );
}

export default Dashboard;