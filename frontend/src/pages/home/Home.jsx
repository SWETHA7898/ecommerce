import "./Home.css"

import Header from "../../components/header/header"
import Explore from "../../components/exploreproducts/Exploreproducts"
import Popular from "../../components/popular/popular"
import Offer from "../../components/offer/offer"
import NewCollection from "../../components/newcollections/bestcollection"
import Newletter from "../../components/newsletter/newletter"
import { useState } from "react"
function Home(){
    const[category,setCategory]=useState("All")
   
    
    return(
       <div className="home">
       <Header></Header>
       <Explore category={category} setCategory={setCategory}></Explore>
       <Popular></Popular>
       <Offer></Offer>
       <NewCollection></NewCollection>
       <Newletter></Newletter>

       </div>
       
    )
}
export default Home
