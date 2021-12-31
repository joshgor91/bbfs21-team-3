import {Nav, Navbar} from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi";


function NavBar() {


    return (
        <>
            <Navbar variant="dark" id="navbar" expand="lg" sticky="top-0">

                <>
                    <Navbar.Brand href="/" id="logo">Better Buy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav"><span>
            menu
                </span></Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto pr-3 ">

                            <Nav.Item>
                                <Nav.Link className="nav-item" href="/" title="Home">
                                    Home
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link className="nav-item" href="/login" title="Login">
                                    Login
                                </Nav.Link>
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
                                <Nav.Link className='navitem' href='/cart' title='Cart'>
                                    <GiShoppingCart style={{width: '2em', height: '2em'}}/>
                                </Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Navbar.Collapse>
                </>

            </Navbar>
        </>
    )

}

export default NavBar