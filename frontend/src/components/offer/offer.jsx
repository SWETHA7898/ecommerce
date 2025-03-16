 import "./offer.css"
 import { assests} from "../../assets/assets/assests"
import { Link } from "react-router-dom"
import { useScrollAnimation } from "../../hooks/hooks.js";

function Offer() {
    const [offerRef, isVisible] = useScrollAnimation();

    const handleScroll = () => {
        const section = document.getElementById("new-collection");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div ref={offerRef} className={`offers ${isVisible ? "fade-in" : "fade"}`}>
            <div className="animated-overlay"></div>
            <div className="offers-left">
                <h1>Exclusive Offers for You</h1>
                <p>ONLY ON BEST SELLERS PRODUCT</p>
                <button onClick={handleScroll}>Check Now</button>
            </div>
        </div>
    );
}

 
 
  export default Offer