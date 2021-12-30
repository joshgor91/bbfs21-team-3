import {connect} from "react-redux"
import CartItems from "./CartItems";


function Cart({cartItems}) {
    console.log(cartItems)

    return <>
        {cartItems &&
        cartItems.map((cartItem, idx) =>
            <CartItems key={idx} cartItem={cartItem}/>)}
    </>
}

function mapStateToProps(state) {
    console.log(state)
    return {
        cartItems: state.cartReducer.cartItems,
    }
}

export default connect(mapStateToProps)(Cart)