import { useNavigate } from "react-router-dom";

function SignupAdditional() {
  const navigate = useNavigate()

  const goToPrevPage=()=>{
    navigate(-1);
  }
  const goToNewPage=()=>{
    navigate("/SignupEmergency");
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
    <div className="text-xs text-slate-300">3. Emergency Contact Details</div>
    <div className="rounded-full w-[260px] h-[5px] bg-slate-300"></div>
    </div>
  </div>

    <div className="font-bold text-3xl mb-5">Additional Details</div>
    <div className="font-light">
      <p className="inline-block text-red-600">*</p>
      <p className="inline-block">‎ ‎ ‎ ‎ ‎‎ Indicates required question</p>
    </div>

    <div>
    <label htmlFor="gender" className="inline-block text-sm font-medium text-gray-900 text-black">Year Level</label>
    <p className="inline-block text-red-600">*</p>
      <ul className="flex space-x-3">
        <li><div>
        <input type="radio" id="first" className="peer hidden" name="yearlevel"/>
        <label htmlFor="first" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">1st Year</label>
        </div></li>
        
        <li><div>
        <input type="radio" id="second" className="peer hidden" name="yearlevel"/>
        <label htmlFor="second" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">2nd Year</label>
        </div></li>
        
        <li><div>
        <input type="radio" id="third" className="peer hidden" name="yearlevel"/>
        <label htmlFor="third" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">3rd Year</label>
        </div></li>
        
        <li><div>
        <input type="radio" id="fourth" className="peer hidden" name="yearlevel"/>
        <label htmlFor="fourth" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">4th Year</label>
        </div></li>
        
        <li><div>
        <input type="radio" id="postgraduate" className="peer hidden" name="yearlevel"/>
        <label htmlFor="postgraduate" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Postgraduate</label>
        </div></li>
        
        <li><div>
        <input type="radio" id="otheryear" className="peer hidden" name="yearlevel"/>
        <label htmlFor="otheryear" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 hover:bg-slate-300 hover:shadow-light-2">Other</label>
        </div></li>
      </ul>
    </div> 

    <div>
    <label htmlFor="gender" className="inline-block text-sm font-medium text-gray-900 text-black mt-4">Dietary Requirements</label>
    <p className="inline-block text-white">*</p>
    <p className="inline-block text-sm font-medium text-black">(If Other, please specify below)</p>
      <div className="flex space-x-3">
        <div>
        <input type="checkbox" id="vegan" className="peer hidden"/>
        <label htmlFor="vegan" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Vegan</label>
        </div>
        <div>
        <input type="checkbox" id="vegetarian" className="peer hidden"/>
        <label htmlFor="vegetarian" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Vegetarian</label>
        </div>
        <div>
        <input type="checkbox" id="dairyfree" className="peer hidden"/>
        <label htmlFor="dairyfree" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Dairy-free</label>
        </div>
        <div>
        <input type="checkbox" id="glutenfree" className="peer hidden"/>
        <label htmlFor="glutenfree" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Gluten-free</label>
        </div>
        <div>
        <input type="checkbox" id="halal" className="peer hidden"/>
        <label htmlFor="halal" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Halal</label>
        </div>
        <div>
        <input type="checkbox" id="otherrequirements" className="peer hidden"/>
        <label htmlFor="otherrequirements" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Other</label>
        </div>
      </div>
    </div> 

    <div>
    <label htmlFor="gender" className="inline-block text-sm font-medium text-gray-900 text-black mt-4">Driver's License</label>
    <p className="inline-block text-white">*</p>
      <ul className="flex space-x-3">
        <li><div>
        <input type="radio" id="none" className="peer hidden" name="license"/>
        <label htmlFor="none" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">None</label>
        </div></li>
        <li><div>
        <input type="radio" id="learners" className="peer hidden" name="license"/>
        <label htmlFor="learners" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Learners</label>
        </div></li>
        <li><div>
        <input type="radio" id="restricted" className="peer hidden" name="license"/>
        <label htmlFor="restricted" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Restricted</label>
        </div></li>
        <li><div>
        <input type="radio" id="full" className="peer hidden" name="license"/>
        <label htmlFor="full" className="select-none cursor-pointer peer-checked:bg-slate-300 border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none">Full</label>
        </div></li>
      </ul>
    </div> 

    <div>
          <label htmlFor="first_name" className="inline-block text-sm font-medium text-black mt-4">Accessibility/Other Dietary Needs</label>
          <p className="inline-block text-white">*</p>
          <input type="text" id="first_name" className="border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20" placeholder="Wheelchair access, seafood allergy" />
    </div>
</form>
  <div className="bg-slate-100 py-5 rounded-b-[1rem] flex space-x-2 -mt-[6.5px]">
    <button type="submit" onClick={ goToPrevPage } className="ml-[717.5px] inline-block border border-primary border-solid text-primary bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Back</button>
    <button type="submit" onClick={ goToNewPage } className="inline-block text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Next</button>
  </div>
</div>
</div>
</div>
    )
  }

export default SignupAdditional;
