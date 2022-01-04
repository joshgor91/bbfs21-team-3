import {connect} from "react-redux"
import CartItems from "./CartItems";
import {Col, Container, Row} from "react-bootstrap";
import CartSummary from "./CartSummary";


function Cart({cartItems, isLoggedIn}) {
    const cart = JSON.parse(window.localStorage.getItem('cartItems'))
    console.log(cartItems)
    return <>
        <Container>
            <Row>
                <Col xs={9}>
                    {isLoggedIn && cartItems ?
                        cartItems.map((cartItem, idx) =>
                            <CartItems key={idx} cartItem={cartItem}/>)
                        : <h2>No Cart</h2>}

                        {!isLoggedIn && cart ?
                            cart.map((cartItem, idx) =>
                            <CartItems key={idx} cartItem={cartItem}/>)
                        : <h2>No Cart</h2>}
                </Col>
                <Col xs={3}>
                    {isLoggedIn ?
                        <CartSummary cartItems={cartItems}/>
                    : <CartSummary cartItems={cart}/>}
                </Col>
            </Row>
        </Container>
    </>
}

function mapStateToProps(state) {
    console.log(state)
    return {
        cartItems: state.cartReducer.cartItems,
        isLoggedIn: state.userReducer.isLoggedIn
    }
}

export default connect(mapStateToProps)(Cart)