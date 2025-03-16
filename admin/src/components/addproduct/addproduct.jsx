import "./addproduct.css"
import uploadimage from "../../assets/Admin_Assets/upload_area.svg"
import { useState } from "react"
import axios from "axios";

const Addproduct=()=>{

    const[image,setImage]=useState(false)

    const[productdetails,setdetails]=useState({
        name:"",
        category:"dog",
        newprice:"",
        oldprice:"",
        image:""
    })

    const imagehandle=(e)=>{
        setImage(e.target.files[0])

        

    }

    const producthandler=(e)=>{
        setdetails({...productdetails,[e.target.name]:e.target.value})
    }
   

    const add = async () => {
        console.log(productdetails);
    
        let formData = new FormData();
        formData.append("product", image);
    
        axios.post("http://localhost:3000/upload",formData).
        then((response)=>{

            console.log(response)
            productdetails.image=response.data.image_url
             axios.post("http://localhost:3000/addproduct",productdetails)
            .then((data)=>{
                console.log(data)
                data.data.success?alert("Product added"):alert("Failed to add")
            })
        }).catch((err)=>{
            console.log("error")
        })
    };
    
    return(
        <div className="add-product">
            <div className="additemfields">
                <p>Product title</p>
                <input type="text" placeholder="type here" name="name" value={productdetails.name} onChange={producthandler}></input>
            </div>
            <div className="addprice">
                <div className="additemfields">
                    <p>Price</p>
                    <input type="text" name="oldprice" placeholder="Type here" value={productdetails.oldprice} onChange={producthandler}></input>
                </div>
                <div className="additemfields">
                    <p>NewPrice</p>
                    <input type="text" name="newprice" placeholder="Type here" value={productdetails.newprice} onChange={producthandler}></input>
                </div>
            </div>
            <div className="additemfields">
                <p>Product Category</p>
                <select name="category" className="additemselector" value={productdetails.category} onChange={producthandler}>Category
                    <option value="dog" >Dog</option>
                    <option value="cat" >Cat</option>
                    <option value="fish" >Fish</option>
                    <option value="avian" >Avian</option>
                   
                   
                </select>
            </div>
            <div className="additemfields">
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):uploadimage} className="addproduct" alt=""></img>
                    
                </label>
                <input type="file" name="image" id="file-input" hidden onChange={imagehandle}></input>
               

            </div>
            <button className="addbutton" onClick={()=>{add()}}>Add</button>

        </div>
    )
}
export default Addproduct