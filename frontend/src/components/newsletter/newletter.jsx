import { useScrollAnimation } from "../../hooks/hooks.js";
import "./newletter.css";

function Newletter() {
    const [newsletterRef, isVisible] = useScrollAnimation();

    return (
        <div ref={newsletterRef} className={`newsletter ${isVisible ? "fade-in" : "fade"}`}>
            <h1>Get Exclusive Offers On Email</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <div className="newsletter-input">
                <input type="email" placeholder="Your email ID" />
                <button>Subscribe</button>
            </div>
        </div>
    );
}

export default Newletter;


