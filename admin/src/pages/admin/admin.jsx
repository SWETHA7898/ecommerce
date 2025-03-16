import "./admin.css"
import Sidebar from "../../components/sidebar/sidebar"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import Addproduct from "../../components/addproduct/addproduct"
import Listproduct from "../../components/listproduct/listproduct"

const Admin=()=>{
    return(
        <div className="admin">
            <Sidebar></Sidebar>
            <Routes>
                <Route path="/addproduct" element={<Addproduct></Addproduct>}></Route>
                <Route path="/listproduct" element={<Listproduct></Listproduct>}></Route>
                
            </Routes>

            

        </div>
    )
}
export default Admin