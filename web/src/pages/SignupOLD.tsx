import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate()

  const goToNewPage=()=>{
    navigate("/SignupAdditional");
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
    <div className="text-xs text-slate-300">2. Additional Details</div>
    <div className="rounded-full w-[260px] h-[5px] bg-slate-300"></div>
    </div>
    <div className="inline-block">
    <div className="text-xs text-slate-300">3. Emergency Contact Details</div>
    <div className="rounded-full w-[260px] h-[5px] bg-slate-300"></div>
    </div>
  </div>

    <div className="font-bold text-3xl mb-5">Personal Details</div>
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
            <label htmlFor="email" className="inline-block text-sm font-medium text-black">Email</label>
            <p className="inline-block text-red-600">*</p>
            <input type="text" id="email" className="border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20" placeholder="johndoe@gmail.com" required />
        </div>  
        <div>
            <label htmlFor="phone" className="inline-block text-sm font-medium text-black">Mobile Number</label>
            <p className="inline-block text-red-600">*</p>
            <input type="tel" id="phone" className="border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
        </div>
        <div>
            <label htmlFor="upi" className="inline-block text-sm font-medium text-black">UPI</label>
            <p className="inline-block text-red-600">*</p>
            <input type="text" id="upi" className="border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20" placeholder="jye583" required />
        </div>
        <div>
            <label htmlFor="birthday" className="inline-blocktext-sm text-sm font-medium text-black">Date of Birth</label>
            <p className="inline-block text-white">*</p>
            <input type="text" id="birthday" className="border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20" placeholder="01/01/2000" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" />
        </div>
    </div>
    <div className="mb-6">
    <label htmlFor="gender" className="inline-block text-sm font-medium text-gray-900 text-black mt-4">Gender</label>
    <p className="inline-block text-red-600">*</p>
      <div className="flex space-x-3">
        <div>
        <input type="checkbox" id="male" className="peer hidden"/>
        <label htmlFor="male" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Male</label>
        </div>
        <div>
        <input type="checkbox" id="female" className="peer hidden"/>
        <label htmlFor="female" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Female</label>
        </div>
        <div>
        <input type="checkbox" id="non-binary" className="peer hidden"/>
        <label htmlFor="non-binary" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Non-binary</label>
        </div>
        <div>
        <input type="checkbox" id="other" className="peer hidden"/>
        <label htmlFor="other" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Other</label>
        </div>
        <div>
        <input type="checkbox" id="prefernottosay" className="peer hidden"/>
        <label htmlFor="prefernottosay" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Prefer not to say</label>
        </div>
      </div>
    </div> 
</form>
<div className="bg-slate-100 py-5 rounded-b-[1rem] flex space-x-2 -mt-[40px]">
    <button type="submit" className="cursor-default ml-[717.5px] inline-block border border-slate-100 border-solid text-slate-100 bg-slate-100 hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Back</button>
    <button type="submit" onClick={ goToNewPage } className="inline-block text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Next</button>
  </div>
</div>
</div>
</div>
    )
  }

export default Signup;
