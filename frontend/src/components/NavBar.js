import {Button, Col, Container, Form, FormControl, Nav, Navbar, Row} from "react-bootstrap";
import {GiShoppingCart} from "react-icons/gi";
import {BrowserRouter as Router, Link, Navigate, NavLink} from "react-router-dom";


function NavBar() {


    return (
        <>
            <Router>
                <Navbar variant="dark" id="navbar" expand="lg" sticky="top-0">

                    <>
                        <Navbar.Brand href="/" id="logo">Better Buy</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbar-nav"><span>
            menu
                </span></Navbar.Toggle>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto pr-3 ">

                                <Nav.Item>
                                    <NavLink to='/'> Home </NavLink>
                                </Nav.Item>


                                <Nav.Item>
                                    <NavLink to='/login'> Login </NavLink>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link className="navitem" href="/register" title="Register">
                                        Register
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link className="navitem" href="/admin" title="Admin">
                                        Admin
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link className='navitem' href='/shopkeeper' title='Shopkeeper'>
                                        Shopkeeper
                                    </Nav.Link>
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
                                    <NavLink to='/cart'>
                                        <GiShoppingCart style={{width: '2em', height: '2em', marginLeft: "10px"}}/>
                                    </NavLink>
                                </Nav.Item>


                            </Nav>
                        </Navbar.Collapse>
                    </>


                </Navbar>

            </Router>
        </>
    )

}

export default NavBar