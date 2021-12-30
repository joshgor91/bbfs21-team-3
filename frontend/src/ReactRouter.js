import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import ProductPage from "./pages/ProductPage";



function ReactRouter() {


    return (

    <Router>

        <hr/>

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/product/:id' element={<ProductPage/>}/>
        </Routes>
    </Router>

    )

}

export default ReactRouter;