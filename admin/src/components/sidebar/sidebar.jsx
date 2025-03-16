import "./sidebar.css"
import { Link } from "react-router-dom"
import addproduct from "../../assets/Admin_Assets/Product_Cart.svg"
import listproduct from "../../assets/Admin_Assets/Product_list_icon.svg"

const Sidebar=()=>{
    return(
        <div className="sidebar">
            <Link to="/addproduct" style={{textDecoration:"none"}}>
            <div className="sideproduct">
                <img src={addproduct} alt=""></img>
                <p>Add Product</p>

            </div>
            </Link>
            <Link to="/listproduct" style={{textDecoration:"none"}}>
            <div className="sideproduct">
                <img src={listproduct} alt=""></img>
                <p>Product List</p>

            </div>
            </Link>


        </div>
    )
}
export default Sidebar