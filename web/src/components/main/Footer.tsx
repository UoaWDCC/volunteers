function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center h-auto bg-neutral p-16">
      <p className="m-0 p-0 font-bold">
        Make sure to show the UoA Volunteers Club Sticker on your student ID
        card!
      </p>
      <div className="flex flex-wrap justify-between items-center max-w-[1500px] w-full mx-auto px-5 py-8 bg-neutral-tan rounded-3xl">
        <div className="p-4 flex-1">
          <img
            loading="lazy"
            src="/assets/footer-logo.svg"
            alt="Volunteers Club Logo"
            className="footer-logo"
          />
          <p className="text-detail text-grey mt-5 ">
            © 2020 University of Auckland Volunteers Club
          </p>
        </div>

        <div className="p-4 flex-1 flex justify-end mr-[30px]">
          <div>
            <h3 className="text-detail text-grey font-sans">Community</h3>
            <ul className="text-detail font-sans">
              <li>
                <a
                  href="https://www.instagram.com/uoavolunteersclub/"
                  className="text-black"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/UoAVolunteersClub"
                  className="text-black"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
