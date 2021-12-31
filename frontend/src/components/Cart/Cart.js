import {connect} from "react-redux"
import CartItems from "./CartItems";
import {Col, Container, Row} from "react-bootstrap";
import CartSummary from "./CartSummary";


function Cart({cartItems}) {
    console.log(cartItems)

    return <>
        <Container>
            <Row>
                <Col xs={9}>
            {cartItems &&
            cartItems.map((cartItem, idx) =>
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
    }
}

export default connect(mapStateToProps)(Cart)