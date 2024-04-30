import "../styles/componentStyles/Sponsors.css";

const SponsorDiscount = (props: any) => {
    return (
        <div className="sponsor-discount">
            <div className="arrow-up"></div>
            <div className="discount">
                <div className="sponsorName">{props.name}</div>
                <div className="sponsorDiscount">{props.discount}</div>
            </div>
        </div>
    )
}
export default SponsorDiscount