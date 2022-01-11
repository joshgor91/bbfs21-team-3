import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ProductPage from "../../pages/ProductPage";
import CartPage from "../../pages/CartPage";
import {Badge, Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {GiShoppingCart} from "react-icons/gi";
import Checkout from "../../pages/Checkout";
import UserPage from "../../pages/UserPage";
import OrderComplete from "../../pages/OrderComplete";
import ProductDetails from "../ProductsView/ProductDetails";




function GuestRouter({cartQuantity, themeToggler}) {

        return (

            <Router>
                <Navbar variant="dark" id="navbar" expand="lg" sticky="top-0">

                    <>
                        <Link to="/"> <img className="logo ms-3 me-5" src="https://i.ibb.co/z6DF5XJ/betterbuy.png" alt="betterbuy"/></Link>
                        <Navbar.Toggle aria-controls="navbar-nav"><span>
            Menu
                </span></Navbar.Toggle>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="m-2 ">

                                <Nav.Item>
                                    <Link className="link-item" to="/">Home </Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Link className="link-item" to="/login">Login </Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Link className="link-item" to="/register">Register </Link>
                                </Nav.Item>


                            </Nav>
                            <Nav className='ms-auto'>
                                <Nav.Item className={'m-1'}>
                                    <Link className="link-item" to="/cart">
                                        <GiShoppingCart style={{width: '2em', height: '2em', marginLeft: "10px"}}/>
                                        <Badge pill bg="secondary">{cartQuantity}</Badge>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className={'my-1 mx-2'}>
                                    <Button onClick={themeToggler}>Switch Theme</Button>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </>


                </Navbar>

                <hr/>

                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/admin' element={<Home/>}/>
                    <Route path='/shopkeeper' element={<Home/>}/>
                    <Route path='/product/:id' element={<ProductPage/>}/>
                    <Route path='/cart' element={<CartPage/>}/>
                    <Route path='/myaccount' element={<Home/>} />
                    <Route path='/cart/checkout' element={<Checkout/>}/>
                    <Route path='/cart/orderconfirmation' element={<OrderComplete/>}/>
                </Routes>
            </Router>


        )
    }

    export default GuestRouter