import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/store";
import { useScrollAnimation } from "../../hooks/hooks.js";
import Item from "../../components/item/item";
import "./ShopCategory.css";

function ShopCategory(props) {
    const { contextvalue } = useContext(StoreContext);
    const [search, setSearch] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [shopRef, isVisible] = useScrollAnimation(); // 🔥 Scroll Hook

    useEffect(() => {
        if (!contextvalue) return;

        // Convert props.category to lowercase for case-insensitive filtering
        const filterCategories = Array.isArray(props.category) 
            ? props.category.map(cat => cat.toLowerCase()) 
            : [props.category.toLowerCase()];

        const results = contextvalue.filter((item) => {
            const itemCategories = Array.isArray(item.category) 
                ? item.category.map(cat => cat.toLowerCase()) 
                : [item.category.toLowerCase()];

            const matchesCategory = itemCategories.some(category => filterCategories.includes(category));
            const matchesSearch = search 
                ? item.name.toLowerCase().includes(search.toLowerCase()) || 
                  itemCategories.some(cat => cat.includes(search.toLowerCase()))
                : true;

            return matchesCategory && matchesSearch;
        });

        setFilteredResults(results);
    }, [search, contextvalue, props.category]);

    return (
        <div ref={shopRef} className={`shop-category ${isVisible ? "fade-in slide-up" : "fade"}`}>
            <div className="sort">
                <input
                    type="text"
                    placeholder="Search your product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <i className="fa-solid fa-magnifying-glass" style={{ color: "#333333" }}></i>
            </div>

            {filteredResults.length === 0 && (
                <h1>No Items to Show, Try searching with a different value</h1>
            )}

            <div className="sort-category">
                {filteredResults.map((item) => (
                    <Item
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.newprice}
                        old_price={item.oldprice}
                    />
                ))}
            </div>
        </div>
    );
}

export default ShopCategory;
