import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import auth from "../../config/firebase";
import axios from "axios";
import { StoreContext } from "../../context/store";

function Login() {
    const navigate = useNavigate();
    const { setCart, setUser } = useContext(StoreContext);
    const [details, setDetails] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // 🔹 Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, details.email, details.password);
            const user = userCredential.user;
            const firebaseToken = await user.getIdToken();

            // 🔹 Send Token to Backend
            const response = await axios.post("https://ecommerce-cyei.onrender.com/login", {
                firebaseToken
            });

            console.log("Login Response:", response.data);  // Debugging log

            if (response.data.success) {
                if (response.data.token) {
                    // ✅ Store JWT in LocalStorage
                    localStorage.setItem("authToken", response.data.token);
                    console.log("Token Stored:", localStorage.getItem("authToken"));
                    console.log("added token") 
                  // Debugging log
                } else {
                    console.error("❌ Token missing in response!");
                }

                navigate("/");
                window.location.reload();

                
            } else {
                setError(response.data.error || "Login failed");
            }
        } catch (err) {
            console.error("Login Error:", err);
            if (err.code === "auth/user-not-found") {
                setError("No account found with this email. Please sign up.");
            } else if (err.code === "auth/wrong-password") {
                setError("Incorrect password. Try again.");
            } else {
                setError("Login failed.Try Again");
            }
        }
    };

    return (
        <div className="logins">
            <div className="logincontainer">
                <h1>Login</h1>
                <div className="loginfields">
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={details.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={details.password}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={handleLogin}>Login</button>
                {error && <p className="error">{error}</p>}
                <p className="loginp">
                    Create an account?
                    <Link to="/loginsignup">
                        <span> Click Here</span>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
