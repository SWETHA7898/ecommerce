import { useEffect, useState } from "react";
import axios from "axios";
import "./listproduct.css";
import crossicon from "../../assets/Admin_Assets/cross_icon.png";

const Listproduct = () => {
    const [allproducts, setproducts] = useState([]);

    const fetchinfo = async () => {
        await axios.get("http://localhost:3000/allproducts")
            .then((res) => {
                console.log("Fetched Data:", res.data);
                setproducts(res.data); // Store products in state
            })
            .catch((err) => {
                console.log("Error fetching products:", err);
            });
    };

    useEffect(() => {
        fetchinfo();
    }, []);

    const remove = async (id) => {  
        console.log("Deleting product with ID:", id);
        axios.delete(`http://localhost:3000/removeproduct/${id}`)
        .then((res) => {
            console.log("Deleted:", res.data);
            fetchinfo(); 
        })
        .catch((err) => {
            console.error("Delete Error:", err);
        });
    };
    

    return (
        <div className="listproduct">
            <h1>All Products List</h1>
            <div className="list-products">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
           
           

            <div className="allproducts">
            
            {
                allproducts.map((item,index)=>{
                    return <>
                        <div className="list-products products" key={index}>
                            <img className="listproducticon" src={item.image} alt={item.name}/> 
                            <p>{item.name}</p>
                            <p>{item.oldprice }</p>
                            <p>{item.newprice}</p>
                            <p>{item.category }</p>
                            <img src={crossicon} className="removeicon" alt="Remove" onClick={() => remove(item._id)} />

                            </div>
                            
                            
                    </>
                    
                })
            }
                
            </div>
        </div>
    );
};

export default Listproduct;
