import "./navbar.css"
import navprofile from "../../assets/Admin_Assets/nav-profile.jpg"

const Navbar=()=>{
    return (
        <div className="navbar">
            <div>
            <div className="header"> 
           
               Paws<span>&Co</span>

           </div>
          
          
            </div>
            <img src={navprofile} alt="" style={{width:"50px"}}></img>

        </div>
    )
}
export default Navbar