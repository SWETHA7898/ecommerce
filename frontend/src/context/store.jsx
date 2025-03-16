import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext();

const defaultCart = () => {
    let cart = {};
    for (let i = 0; i <= 300; i++) {
        cart[i] = 0;
    }
    return cart;
};

const StoreContextProvider = (props) => {
    const navigate=useNavigate()
   
    const [cartitem, setCart] = useState(defaultCart());
    const [contextvalue, setContextvalue] = useState([]);
   
    
   

    useEffect(() => {
        axios.get("http://localhost:3000/allproducts")
            .then((response) => {
                console.log("✅ Fetched data:", response.data);
                setContextvalue(response.data.map(item => ({ ...item, show: true })));
                
            })
            .catch((error) => {
                console.error("❌ Error fetching products:", error);
               
            });
    }, []);
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
                        fetch("http://localhost:3000/getcart", {
                            method: "POST",
                            headers: {
                                Accept: 'application/form-data',
                                "auth-token": `${localStorage.getItem("authToken")}`,
                                "Content-Type": "application/json",
                            },
                            body: ""
                        })
                            .then((response) => response.json())
                            .then((data) => setCart(data))
        } 
        
    
       
    }, []);
    

    const addcart = async (itemId) => {
       
      
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("You must be signed in to add items to the cart.");
            navigate("/login"); 
            return;
        }

       
        setCart((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        // Send request to backend
        try {
            const response = await fetch("http://localhost:3000/addcart", {
                method: "POST",
                headers: {
                    Accept: 'application/form-data',
                    "auth-token": authToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId })
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };


    const removecart = async (itemId) => {
        setCart((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
        }));
        if (localStorage.getItem("authToken")) {
            fetch("http://localhost:3000/removecart", {
                method: "POST",
                headers: {
                    Accept: 'application/form-data',
                    "auth-token": `${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "itemId": itemId })
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
        }


    };

    const amount = () => {
        let total = 0;
        for (const item in cartitem) {
            if (cartitem[item] > 0) {
                const iteminfo = contextvalue.find((product) => product.id === Number(item));
                if (iteminfo) {
                    total += iteminfo.newprice * cartitem[item];
                }
            }
        }
        console.log("💰 Total Amount:", total);
        return total;
    };

    const totalcartitems = () => {
        let item = 0;
        for (const i in cartitem) {
            if (cartitem[i] > 0) {
                item += cartitem[i];
            }
        }
        console.log("🛒 Total Cart Items:", item);
        return item;
    };

    const value = { contextvalue, setContextvalue, cartitem, addcart, removecart, amount, totalcartitems,setCart };

    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;