import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Shopkeeper from "./pages/Shopkeeper";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";


function ReactRouter() {


    return (

    <Router>

        <hr/>

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/shopkeeper' element={<Shopkeeper/>}/>
            <Route path='/product/:id' element={<ProductPage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
        </Routes>
    </Router>

    )

}

export default ReactRouter;