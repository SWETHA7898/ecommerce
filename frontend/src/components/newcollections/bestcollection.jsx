import "./bestcollection.css"

import Item from "../item/item"
import { useEffect, useState } from "react"
import axios from "axios"
import { useScrollAnimation } from "../../hooks/hooks.js";


function NewCollection() {
    const [newCollections, setNewCollection] = useState([]);
    const [collectionRef, isVisible] = useScrollAnimation();

    useEffect(() => {
        axios
            .get("http://localhost:3000/bestsellers")
            .then((response) => setNewCollection(response.data))
            .catch((err) => console.log("error", err));
    }, []);

    return (
        <div ref={collectionRef} className={`new-collections ${isVisible ? "fade-in" : "fade"}`} id="new-collection">
            <h1>Best Sellers</h1>
            <hr className="styled-hr" />
            <div className="collections">
                {newCollections.map((item, index) => (
                    <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.newprice} old_price={item.oldprice} />
                ))}
            </div>
        </div>
    );
}
export default NewCollection