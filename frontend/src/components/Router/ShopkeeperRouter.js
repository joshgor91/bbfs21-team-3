import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Shopkeeper from "../../pages/Shopkeeper";
import ProductPage from "../../pages/ProductPage";
import CartPage from "../../pages/CartPage";
import {Badge, Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {GiShoppingCart} from "react-icons/gi";
import LogoutBtn from "../LoginRegister/LogoutBtn";
import Checkout from "../../pages/Checkout";
import UserPage from "../../pages/UserPage";
import OrderComplete from "../../pages/OrderComplete";



function ShopkeeperRouter({cartQuantity, themeToggler}) {
    return (

        <Router>
            <Navbar variant="dark" id="navbar" expand="lg" sticky="top-0">

                <>
                    <Link to="/"> <img className="logo" src="https://i.ibb.co/z6DF5XJ/betterbuy.png" alt="betterbuy"/></Link>
                    <Navbar.Toggle aria-controls="navbar-nav"><span>
            Menu
                </span></Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto pr-3 ">

                            <Nav.Item>
                                <Link className="link-item" to="/">Home </Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Link className="link-item" to="/myaccount">My Account</Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Link className="link-item" to="/shopkeeper">Shopkeeper</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Form className="d-flex">
                                    <FormControl
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="light">Search</Button>
                                </Form>
                            </Nav.Item>

                            <Nav.Item>
                                <Link className="link-item" to="/cart">
                                    <GiShoppingCart style={{width: '2em', height: '2em', marginLeft: "10px"}}/>
                                    <Badge pill bg="secondary">{cartQuantity}</Badge>
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Button onClick={themeToggler}>Switch Theme</Button>
                            </Nav.Item>
                            <Nav.Item>
                                <LogoutBtn/>
                            </Nav.Item>

                        </Nav>
                    </Navbar.Collapse>
                </>


            </Navbar>

            <hr/>

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Home/>}/>
                <Route path='/admin' element={<Home/>}/>
                <Route path='/shopkeeper' element={<Shopkeeper/>}/>
                <Route path='/product/:id' element={<ProductPage/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/myaccount' element={<UserPage/>} />
                <Route path='/cart/checkout' element={<Checkout/>}/>
                <Route path='/cart/orderconfirmation' element={<OrderComplete/>}/>
            </Routes>
        </Router>
    )


}
export default ShopkeeperRouter