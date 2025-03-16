import "./Exploreproducts.css"
import { menu } from "../../assets/assets/assests"
import { Link } from "react-router-dom"
import { useScrollAnimation } from "../../hooks/hooks.js";


function Explore({ category, setCategory }) {
  const [exploreRef, isVisible] = useScrollAnimation(); // Hook for animation

  return (
    <div 
      className={`explore-menu ${isVisible ? "fade-in" : ""}`} 
      id="explore-menu" 
      ref={exploreRef}
    >
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"}}>
      <h1 className="menu-text">Explore By Pets</h1>
      <hr style={{width:"200px",height:"6px",backgroundColor:"#A8DADC",}} />

      </div>
      

      <div className="explore-menu-list">
        {menu.map((item, index) => (
          <div key={index} className="explore-menu-list-item">
          <Link 
              to={item.pet_name.toLowerCase() === "dogs" ? "/dogs" : `/${item.pet_name.toLowerCase()}`} 
              onClick={() => {
                  setCategory(prev => prev === item.pet_name ? "All" : item.pet_name);
                  window.scrollTo(0, 0); // Scroll to top when clicked
              }}
              style={{ textDecoration: 'none', color: 'inherit' }}
          >
              <img 
                  src={item.pet_images} 
                  className={category === item.pet_name ? "active" : ""} 
                  alt={item.pet_name}
              />
              <p>{item.pet_name}</p>
          </Link>
      </div>
      
        ))}
      </div>

      <hr />
    </div>
  );
}
export  default Explore