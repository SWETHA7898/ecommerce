import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assests } from "../../assets/assets/assests";
import "./Navbar.css";
import { StoreContext } from "../../context/store";
import auth from "../../config/firebase";
import { signOut } from "firebase/auth";
import axios from "axios";

function Navbar() {
    const navigate = useNavigate();
    const [menu, setMenu] = useState("");
    const { totalcartitems, cartitem, setCart } = useContext(StoreContext);
    const [cartCount, setCartCount] = useState(0);
    const [log, setLog] = useState(false);
    const menuref = useRef();

   

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("✅ User logged in");
                setLog(true)
            } else {
                console.log("❌ User logged out");
                setLog(false)
            }
        });
    }, []);

    function Logout() {
        signOut(auth).then(() => {
            localStorage.removeItem("authToken"); 
            console.log("removed authToken");
            window.location.replace("/")
         
    
        }).catch((error) => {
            console.error("Logout error:", error);
        });
    }
    
    const dropdown_toggle=(e)=>{
        menuref.current.classList.toggle("navmenu-visible")
        e.target.classList.toggle("open")

    }
    

    return (
        <div className="navbar">
            <div className="header"> 
                Paws<span>&Co</span>
            </div>
            <img onClick={dropdown_toggle} src={assests.nav} alt="" className="nav-dropdown" />

            <ul className="navmenu" ref={menuref}>
                <li className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>
                    <Link to="/">Home</Link>
                </li>
                <li className={menu === "dogs" ? "active" : ""} onClick={() => setMenu("dogs")}>
                    <Link to="/dogs">Dogs</Link>
                </li>
                <li className={menu === "cats" ? "active" : ""} onClick={() => setMenu("cats")}>
                    <Link to="/cats">Cats</Link>
                </li>
                <li className={menu === "avians" ? "active" : ""} onClick={() => setMenu("avians")}>
                    <Link to="/avians">Avians</Link>
                </li>
                <li className={menu === "fishes" ? "active" : ""} onClick={() => setMenu("fishes")}>
                    <Link to="/fishes">Fishes</Link>
                </li>
            </ul>

            <div className="navright">
                <div className="cart">
                    <Link to="/cart">
                    <i class="fa-solid fa-cart-shopping" style={{fontSize:'25px'}}></i>
                    </Link>
                    <div className="dot">{totalcartitems()}</div> 
                </div>
                {
                    log?<button onClick={Logout}>LogOut</button>:<button onClick={() => navigate("/login")}>Login</button>
                }
               
               
                
                    
               
            </div>
        </div>
    );
}

export default Navbar;
