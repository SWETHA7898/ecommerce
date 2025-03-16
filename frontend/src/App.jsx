import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart";
import ShopCategory from "./pages/shopcategory/ShopCategory";
import LoginSignUp from "./pages/loginsignup/LoginSignUp";
import Footer from "./components/footer/footer";
import Login from "./pages/login/login";
import PlaceOrder from "./pages/place order/order";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<ShopCategory category="Dog" />} />
        <Route path="/cats" element={<ShopCategory category="Cat" />} />
        <Route path="/avians" element={<ShopCategory category="Avian" />} />
        <Route path="/fishes" element={<ShopCategory category="Fish" />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:productID" element={<Products />} />
        <Route path="/loginsignup" element={<LoginSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<PlaceOrder></PlaceOrder>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
