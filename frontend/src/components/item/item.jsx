import { Link } from "react-router-dom"
import "./item.css"


function Item(props){
    return(
        <div className="item">
        <Link to={`/product/${props.id}`}><img src={props.image}  onClick={() => window.scrollTo(0,0)} ></img></Link>
         <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-new-price">
            {`\u20B9${props.new_price}`}

            </div>
            <div className="item-old-price">
            {`\u20B9${props.old_price}`}
            </div>
         </div>

        </div>
    )
}
export default Item