import "../styles/componentStyles/Sponsors.css";
import SponsorList from "../data/SponsorList.json";
import SponsorDiscount from "./SponsorDiscount";
import {useState} from "react";

function Sponsors() {
    const [kompass, setKompass] = useState(true)
    const [shelf, setShelf] = useState(true)
    const [sals, setSals] = useState(true)

    const bwImg = [
        SponsorList.sponsors[0].imageSrcBw,
        SponsorList.sponsors[1].imageSrcBw,
        SponsorList.sponsors[2].imageSrcBw
    ]
    const colourImg = [
        SponsorList.sponsors[0].imageSrcColour,
        SponsorList.sponsors[1].imageSrcColour,
        SponsorList.sponsors[2].imageSrcColour
    ]
    const altText = [
        SponsorList.sponsors[0].alt,
        SponsorList.sponsors[1].alt,
        SponsorList.sponsors[2].alt
    ]

    return (
        <div className="sponsors-section">
            <div className="sponsors-heading">
                <div className="sponsors-title">Our Sponsors</div>
                <div className="sponsors-text">Make sure to show the UoA Volunteers Club sticker on your student ID card!</div>
            </div>
            <div className="sponsors">
                <div className="sponsor-icons">
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
                    {/*
                    {
                        SponsorList.sponsors.map((sponsor) => {
                            return (
                                <div onMouseEnter={() => setHidden(false)}
                                onMouseLeave={() => setHidden(true)}>
                                    {hidden ? <img src={sponsor.imageSrcBw} alt={sponsor.alt} title={sponsor.alt}/> : <img src={sponsor.imageSrcColour} alt={sponsor.alt} title={sponsor.alt}/>}
                                </div>
                            )
                        })
                    }
                */}
                </div>
            </div>
        </div>
    );
}
export default Sponsors