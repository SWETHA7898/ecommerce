import { useContext } from "react"
import "./cartitem.css"
import { StoreContext } from "../../context/store"
import { assests } from "../../assets/assets/assests"
import { useNavigate } from "react-router-dom"
function CartItem() {
    const { contextvalue, cartitem, removecart,amount } = useContext(StoreContext);
    console.log(contextvalue)
    console.log(cartitem)
    const navigate=useNavigate()
    return (
        <div className="cartitems">
            <div className="cartitems-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {contextvalue.map((e) => {
                if (cartitem[e.id] > 0) {
                    return (
                        <div>
                            <div className="cart-products cartitems-main" key={e.id}>
                                <img src={e.image} alt="" className="cartimg" />
                                <p>{e.name}</p>
                                <p>{`\u20B9${e.newprice}`}</p>
                                <button className="cart-quantity">{cartitem[e.id]}</button>
                                <p>{`\u20B9${e.newprice * cartitem[e.id]}`}</p>
                                <img
                                    className="remove-icon"
                                    src={assests.remove}
                                    alt="Remove"
                                    onClick={() => removecart(e.id)

                                    } // Pass item ID here
                                />
                            </div>
                            <hr />
                        </div>

                    );
                }
                return null; // Add a fallback return to avoid potential React warnings
            })}
            <div className="cart-items-down">
                <div className="cart-items-total">
                    <h1> Cart Total</h1>
               
                    <div>
                       <div className="cart-items">
                        <p>Subtotal</p>
                        <p>{`\u20B9${amount()}`}</p>
                       </div>
                       <hr />
                       <div className="cart-items">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                        </div>
                           <hr />
                        <div className="cart-items">
                        <p>Total</p>
                        <p>{`\u20B9${amount()}`}</p>
                         </div>
                    </div>
                    <button onClick={()=>navigate('/order')}>Procced to checkout</button>
             </div>



            </div>


        </div>
    );


}
export default CartItem