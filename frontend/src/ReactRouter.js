import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Shopkeeper from "./pages/Shopkeeper";


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
        </Routes>
    </Router>

    )

}

export default ReactRouter;