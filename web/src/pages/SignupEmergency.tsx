import { useNavigate } from "react-router-dom";

function SignupEmergency() {
  const navigate = useNavigate()

  const goToPrevPage=()=>{
    navigate(-1);
  }
  const goToNewPage=()=>{
    navigate("/");
  }

  return (
<div className="bg-greybg h-screen w-screen">
  <div className="py-[60px]">
<div className="bg-white shadow-2xl rounded-t-[1rem] w-[940px] h-[560px] mx-[280px]">
<form className="px-[50px] py-[30px]">
  
  <div className="flex space-x-5">
    <div className="inline-block mb-5">
    <div className="text-xs text-primary">1. Personal Details</div>
    <div className="rounded-full w-[260px] h-[5px] bg-primary"></div>
    </div>
    <div className="inline-block">
    <div className="text-xs text-primary">2. Additional Details</div>
    <div className="rounded-full w-[260px] h-[5px] bg-primary"></div>
    </div>
    <div className="inline-block">
    <div className="text-xs text-primary">3. Emergency Contact Details</div>
    <div className="rounded-full w-[260px] h-[5px] bg-primary"></div>
    </div>
  </div>

    <div className="font-bold text-3xl mb-5">Emergency Contact Details</div>
    <div className="font-light">
      <p className="inline-block text-red-600">*</p>
      <p className="inline-block">‎ ‎ ‎ ‎ ‎‎ Indicates required question</p>
    </div>

    <div className="grid gap-3 md:grid-cols-2">
        <div>
            <label htmlFor="first_name" className="inline-block text-sm font-medium text-black">First name</label>
            <p className="inline-block text-red-600">*</p>
            <input type="text" id="first_name" className="border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20" placeholder="John" required />
        </div>
        <div>
            <label htmlFor="last_name" className="inline-block text-sm font-medium text-black">Last name</label>
            <p className="inline-block text-red-600">*</p>
            <input type="text" id="last_name" className="border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20" placeholder="Doe" required />
        </div>
        <div>
            <label htmlFor="phone" className="inline-block text-sm font-medium text-black">Mobile Number</label>
            <p className="inline-block text-red-600">*</p>
            <input type="tel" id="phone" className="border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
        </div>
        <div>
            <label htmlFor="relationship" className="inline-block text-sm font-medium text-black">Relationship</label>
            <p className="inline-block text-red-600">*</p>
            <input type="text" id="relationship" className="border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20" placeholder="Mother" required />
        </div>
    </div>
  </form>
  <div className="bg-slate-100 py-5 rounded-b-[1rem] flex space-x-2 mt-[173.5px]">
    <button type="submit" onClick={ goToPrevPage } className="ml-[717.5px] inline-block border border-primary border-solid text-primary bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Back</button>
    <button type="submit" onClick={ goToNewPage } className="inline-block text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Finish</button>
  </div>
</div>
</div>
</div>
    )
  }

export default SignupEmergency;
