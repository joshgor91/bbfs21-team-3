import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";



function ReactRouter() {


    return (

    <Router>
        <div>
            <Link to="/">Home</Link>
        </div>
        <div>
            <Link to="/login">Login</Link>
        </div>
        <div>
            <Link to="/register">Register</Link>
        </div>

        <hr/>

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    </Router>

    )

}

export default ReactRouter;