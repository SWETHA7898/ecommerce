import "./products.css";
import { useContext } from "react";
import { StoreContext } from "../../context/store";
import { useParams } from "react-router-dom";
import BreadCrum from "../../components/breadcrum/breadcrum";
import Display from "../../components/display/display";
import Description from "../../components/description/description";

function Products() {
    const { contextvalue } = useContext(StoreContext);
    const { productID } = useParams();
    
    console.log("Extracted Product ID:", productID);


    const product = contextvalue.find((e) => e.id === Number(productID));

    if (!product) {
        return <div>Product not found</div>; // Handles invalid product IDs
    }

    console.log("Found product:", product);

    return (
        <div>
            <BreadCrum product={product} />
            <Display product={product} />
            <Description />
        </div>
    );
}

export default Products;
