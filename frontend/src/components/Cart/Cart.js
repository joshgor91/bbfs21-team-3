import {connect, useDispatch} from "react-redux"
import CartItems from "./CartItems";
import {Col, Container, Row} from "react-bootstrap";
import CartSummary from "./CartSummary";
import {useEffect} from "react";
import {clearReceipt} from "../../modules/order";
import {cartSummery, discountPrice, sellPrice} from "../../utils/priceUtils";


function Cart({cartItems, isLoggedIn, quantity}) {
    const dispatch = useDispatch()
    const cart = JSON.parse(window.localStorage.getItem('cartItems'))

    useEffect(() => {
        dispatch(clearReceipt())
    }, []);

    return <>
        <Container>
            <Row className="checkout-cart-summary">
                <Col lg={9}>
                    {isLoggedIn && cartItems.length > 0 ?
                        cartItems.map((cartItem, idx) =>
                            <CartItems key={idx} cartItem={cartItem}
                                       sellPrice={sellPrice(cartItem)}
                                       currentSale={discountPrice(cartItem).currentSale}
                                       discountPrice={discountPrice(cartItem).discountPrice}
                            />)
                        : ''}

                    {!isLoggedIn && cart ?
                        cart.map((cartItem, idx) =>
                            <CartItems key={idx} cartItem={cartItem}
                                       sellPrice={sellPrice(cartItem)}
                                       currentSale={discountPrice(cartItem).currentSale}
                                       discountPrice={discountPrice(cartItem).discountPrice}
                            />)
                        : ''}
                </Col>
                <Col lg={3}>
                    {isLoggedIn ?
                        <CartSummary cartItems={cartItems}
                                     cartSummery={cartSummery(cartItems)}
                                     isLoggedIn={isLoggedIn}/>
                        : <CartSummary cartItems={cartItems}
                                       cartSummery={cartSummery(cart)}
                                       isLoggedIn={isLoggedIn}/>}
                </Col>
            </Row>
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        cartItems: state.cartReducer.cartItems,
        isLoggedIn: state.userReducer.isLoggedIn,
        quantity: state.cartReducer.quantity
    }
}

export default connect(mapStateToProps)(Cart)