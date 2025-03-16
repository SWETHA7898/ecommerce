import "./display.css"
import { assests } from "../../assets/assets/assests"
import { useContext } from "react"
import { StoreContext } from "../../context/store"
import { useNavigate } from "react-router-dom"

function Display(props) {
    const navigate=useNavigate()
    const { product } = props
    const {addcart} =useContext(StoreContext)
    return (
        <div className="productdisplay">
            <div className="product-left">
                <div className="product-img">
                    <img src={product.image} alt=""></img>
                    <img src={product.image} alt=""></img>
                    <img src={product.image} alt=""></img>


                    <img src={product.image} alt=""></img>


                </div>
                <div className="productimage">
                    <img src={product.image} alt="" className="mainimage"></img>

                </div>

            </div>
            <div className="product-right">
                <h1>{product.name}</h1>
                <div className="product-right-start">
                <img src={assests.starticon} alt=""></img>
                <img src={assests.starticon} alt=""></img>
                <img src={assests.starticon} alt=""></img>
                <img src={assests.starticon} alt=""></img>
                <img src={assests.dullicon} alt=""></img>
                <p>(122)</p>


                </div>
                <div className="product-right-prices">
                <div className="product-right-newprice">
                    {`\u20B9${product.newprice}`}</div>
                <div className="product-right-oldprice">
                    {`\u20B9${product.oldprice}`}

                </div>
                
            </div>
            <div className="product-right-description">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo itaque fugiat dolore eius adipisci necessitatibus, aliquam ut saepe molestiae eos perspiciatis odio aut, reprehenderit corrupti delectus iure nemo deserunt cum.</p>

                </div>
               
                
            <button onClick={
                ()=>
                {
                    addcart(product.id)
                    window.scroll(0,0)

                }}>ADD TO CART</button>
                


            </div>
            

        </div>
    )
}
export default Display