import "./popular.css"

import Item from "../item/item"
import { useEffect, useState } from "react"
import axios from "axios"
import { useScrollAnimation } from "../../hooks/hooks.js";

function Popular() {
    const [data, setData] = useState([]);
    const [popularRef, isVisible] = useScrollAnimation(); // Hook for animation
  
    useEffect(() => {
      axios
        .get("https://ecommerce-cyei.onrender.com/popular")
        .then((res) => setData(res.data))
        .catch((err) => console.log("err"));
    }, []);
  
    return (
      <div className={`popular ${isVisible ? "fade-in" : ""}`} ref={popularRef}>
        <h1>POPULAR IN DOGS</h1>
        <hr />
        <div className="popular-item">
          {data.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.newprice}
              old_price={item.oldprice}
            />
          ))}
        </div>
      </div>
    );
  }
  
export default Popular
