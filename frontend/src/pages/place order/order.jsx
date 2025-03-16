import "./order.css";
import { StoreContext } from "../../context/store";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PlaceOrder() {
    const navigate=useNavigate()
    const {amount,cartitem,setCart}=useContext(StoreContext)
    const [orderData, setOrderData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: ""
    });

    // Function to handle input changes
    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    // Function to submit the order
const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken"); // User token for authentication
    if (!authToken) {
        alert("You must be logged in to place an order.");
        return;
    }

    const orderPayload = {
        items: cartitem,  // Cart items from StoreContext
        amount: amount(),  // Total price
        address: {
            street: orderData.street,
            city: orderData.city,
            state: orderData.state,
            zipCode: orderData.zipCode,
            country: orderData.country
        },
        phone: orderData.phone
    };

    try {
        const response = await fetch("http://localhost:3000/placeorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            },
            body: JSON.stringify(orderPayload)
        });

        const data = await response.json();
        console.log("Order Response:", data);
        console.log("order id",data.data.id)

        if (response.ok) {
            razorPayment(data); // Call payment function with order details
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error placing order:", error);
        alert("Something went wrong.");
    }
};
const razorPayment = (order) => {
    const options = {
        key: "rzp_test_SmT3UOUcpyxz3T",
        amount: order.data.amount * 100,
        currency: order.data.currency,
        description: "Test payment",
        order_id: order.data.id,
        handler: async function (response) {
            console.log("Received Payment Response:", response); // Debugging
        
            try {
                const verifyResponse = await axios.post("http://localhost:3000/verify", {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id, // Ensure `order.id` is correct
                    razorpay_signature: response.razorpay_signature
                });
        
                console.log("Verification Response:", verifyResponse.data);
                
                if (verifyResponse.data.success) {
                    alert("Payment verified successfully!");
                    setCart({})
                    navigate("/")
                } else {
                    alert("Payment verification failed!");
                }
            } catch (error) {
                console.error("Error verifying payment:", error.response?.data || error);
                alert("Payment verification error");
            }
        }
        
    };

    const razorpop = new window.Razorpay(options);
    razorpop.open();
};



    return (
        <form className="placeorder" onSubmit={handleOrderSubmit}>
            <div className="placeorder-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                </div>
                <input type="email" name="email" placeholder="Enter your mail" onChange={handleChange} required />
                <input type="text" name="street" placeholder="Street" onChange={handleChange} required />
                <div className="multi-fields">
                    <input type="text" name="city" placeholder="City" onChange={handleChange} required />
                    <input type="text" name="state" placeholder="State" onChange={handleChange} required />
                </div>
                <div className="multi-fields">
                    <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleChange} required />
                    <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
                </div>
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
            </div>

            <div className="placeorder-right">
                <div className="items-total">
                    <h1> Cart Total</h1>
                    <div>
                        <div className="items">
                            <p>Subtotal</p>
                            <p>{`\u20B9${amount()}`}</p>
                        </div>
                        <hr />
                        <div className="items">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="items">
                            <p>Total</p>
                            <p>{`\u20B9${amount()}`}</p>
                        </div>
                    </div>
                    <button type="submit" onClick={handleOrderSubmit}>Proceed to Payment</button>
                </div>
            </div>
        </form>
    );
}

export default PlaceOrder;
