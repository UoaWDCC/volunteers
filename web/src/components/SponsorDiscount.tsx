const SponsorDiscount = (props: any) => {
    return (
      <div className="flex flex-col items-center">
        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-[#D9D9D9] mt-2"></div>
        <div className="bg-[#D9D9D9] h-[70px] rounded-[10px] flex flex-col justify-center">
          <div className="ml-[0.7rem] mt-[-0.7rem] text-[0.6rem]">{props.name}</div>
          <div className="mx-auto px-[2.5rem] mt-[0.1rem]">{props.discount}</div>
        </div>
      </div>
    )
  }
  export default SponsorDiscount
  