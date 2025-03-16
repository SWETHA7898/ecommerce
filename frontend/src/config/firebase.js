

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDEjDJQr7IYMaT5anD6_J6XX6GHCrYg1MM",
  authDomain: "ecommerce-d9c3b.firebaseapp.com",
  projectId: "ecommerce-d9c3b",
  storageBucket: "ecommerce-d9c3b.firebasestorage.app",
  messagingSenderId: "355724692123",
  appId: "1:355724692123:web:e3a888567565d17a8b943e",
  measurementId: "G-81T6GGFNHE"
};



const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

export default auth