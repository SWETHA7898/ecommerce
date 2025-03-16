import "./breadcrum.css"
import { assests } from "../../assets/assets/assests"
function BreadCrum(props){
    const {product}=props
    return(
        <div className="breadcrum">
        HOME <img src={assests.breadcrum} alt="" /> SHOP 
        <img src={assests.breadcrum} alt="" /> 
        {product.category}
        <img src={assests.breadcrum} alt="" /> 
        {product?.name}
       
        
    </div>
    
    

    )
    
}
export default BreadCrum