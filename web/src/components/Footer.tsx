function Footer() {
  return (
    <footer className="flex justify-center h-auto">
      <div className="flex flex-wrap justify-between items-center max-w-[1208px] w-full mx-auto px-5">
        <div className="p-4 flex-1">
          <img loading="lazy" src="/assets/Volunteers-logo-footer.jpg" alt="Volunteers Club Logo" className="footer-logo" />
          <p className = "text-detail text-grey mt-5 ">© 2020 University of Auckland Volunteers Club</p>
        </div>
        
        <div className="p-4 flex-1 flex justify-end mr-[30px]">
          <div>
            <h3 className = "text-detail text-grey font-sans">Community</h3>
            <ul className ="text-detail font-sans">
              <li><a href="#" className="text-black">Instagram</a></li>
              <li><a href="#" className="text-black">Facebook</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
