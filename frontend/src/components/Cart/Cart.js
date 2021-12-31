import {connect} from "react-redux"
import CartItems from "./CartItems";
import {Container} from "react-bootstrap";


function Cart({cartItems}) {
    console.log(cartItems)

    return <>
        <Container>
            {cartItems &&
            cartItems.map((cartItem, idx) =>
                <CartItems key={idx} cartItem={cartItem}/>)}
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