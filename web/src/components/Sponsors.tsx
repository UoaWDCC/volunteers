import "../styles/componentStyles/Sponsors.css";
import SponsorDiscount from "./SponsorDiscount";
import {useState} from "react";


interface SponsorsProps {
    data: { imageSrcBw: string; imageSrcColour: string; alt: string; id: number }[]
  }

const Sponsors = ({ data }: SponsorsProps) => {

    // in future, have a more way to dynamically manage any number of hover-overs
    const [kompass, setKompass] = useState(true);
    const [shelf, setShelf] = useState(true);
    const [sals, setSals] = useState(true);

    const bwImg = [
        data[0].imageSrcBw,
        data[1].imageSrcBw,
        data[2].imageSrcBw
    ]
    const colourImg = [
        data[0].imageSrcColour,
        data[1].imageSrcColour,
        data[2].imageSrcColour
    ]
    const altText = [
        data[0].alt,
        data[1].alt,
        data[2].alt
    ]

    return (
        <div className="sponsors-section">
            <div className="sponsors-heading">
                <div className="sponsors-title">Our Sponsors</div>
                <div className="sponsors-text">Make sure to show the UoA Volunteers Club sticker on your student ID card!</div>
            </div>
            <div className="sponsors">
                <div className="sponsor-icons">

                    {/* In the future, have another sub component for each sponsor, and perhaps rather than changing image for colour, use styling */}
                    <div className="sponsor-icon" onMouseEnter={() => setShelf(false)}
                        onMouseLeave={() => setShelf(true)}>
                            {shelf ? <img src={bwImg[1]} alt={altText[1]} title={altText[1]}/> : <img src={colourImg[1]} alt={altText[1]} title={altText[1]}/>}
                            {shelf ? null : <SponsorDiscount name="The Shelf" discount="5% OFF"/>}
                    </div>
                    <div className="sponsor-icon" onMouseEnter={() => setSals(false)}
                        onMouseLeave={() => setSals(true)}>
                            {sals ? <img src={bwImg[2]} alt={altText[2]} title={altText[2]}/> : <img src={colourImg[2]} alt={altText[2]} title={altText[2]}/>}
                            {sals ? null : <SponsorDiscount name="Sal's Pizza" discount="15% OFF"/>}
                    </div>
                    <div className="sponsor-icon" onMouseEnter={() => setKompass(false)}
                        onMouseLeave={() => setKompass(true)}>
                            {kompass ? <img src={bwImg[0]} alt={altText[0]} title={altText[0]}/> : <img src={colourImg[0]} alt={altText[0]} title={altText[0]}/>}
                            {kompass ? null : <SponsorDiscount name="Kompass Coffee" discount="10% OFF"/>}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Sponsors;