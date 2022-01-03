import {connect} from "react-redux"
import CartItems from "./CartItems";
import {Col, Container, Row} from "react-bootstrap";
import CartSummary from "./CartSummary";


function Cart({cartItems, isLoggedIn}) {

    const cart = JSON.parse(window.localStorage.getItem('cartItems'))

    return <>
        <Container>
            <Row>
                <Col xs={9}>
                    {isLoggedIn ?
                        cartItems.map((cartItem, idx) =>
                            <CartItems key={idx} cartItem={cartItem}/>)
                        : cart.map((cartItem, idx) =>
                            <CartItems key={idx} cartItem={cartItem}/>)}
                </Col>
                <Col xs={3}>
                    <CartSummary cartItems={cartItems}/>
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