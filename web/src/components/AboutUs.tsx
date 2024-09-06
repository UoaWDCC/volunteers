const AboutUs = () => {
  return (
    <div className="flex flex-col items-center bg-primary pt-10 pb-36">
      <div className="text-white bg-primary-light font-serif py-3 px-8 rounded-3xl text-section-header shadow">About Us</div>
      <div className="flex flex-col items-center justify-center bg-neutral-tan font-sans p-20 mt-16 rounded-3xl gap-4 shadow">
        <p className="m-0 text-3xl font-semibold">Welcome to the <img src="./assets/graphics/wheelDBlue.svg" className="inline"/> Uoa Volunteers Club,</p>
        <p className="m-0 text-3xl font-semibold">where students like you made a <span className="text-primary">difference</span>!</p>
        <p className="m-0 text-3xl font-semibold">Join us to <img src="/assets/graphics/swirlRed.svg" className="inline" /> give back, connect, and <img src="/assets/graphics/flowerLBlue.svg" className="inline" /> make an <span className="text-secondary">impact</span>.</p>
        <p className="m-0 text-3xl font-semibold">Be a <span className="text-primary">catalyst</span> for change and create a</p>
        <p className="m-0 text-3xl font-semibold gap-1">brighter <img src="/assets/graphics/sparkleDRed.svg" className="inline" /> future with us!</p>
      </div>
    </div>
  );
}
 
export default AboutUs;