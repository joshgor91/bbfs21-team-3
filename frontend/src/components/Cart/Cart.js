import {connect, useDispatch} from "react-redux"
import CartItems from "./CartItems";
import {Col, Container, Row} from "react-bootstrap";
import CartSummary from "./CartSummary";
import {useEffect} from "react";
import {clearReceipt} from "../../modules/order";
import {cartSummery, discountPrice, salePrice} from "../../utils/priceUtils";


function Cart({cartItems, isLoggedIn, quantity}) {
    const dispatch = useDispatch()
    const cart = JSON.parse(window.localStorage.getItem('cartItems'))

    useEffect(() => {
        dispatch(clearReceipt())
    }, []);

    return <>
        <Container>
            <Row>
                <Col xs={9}>
                    {isLoggedIn && cartItems.length > 0 ?
                        cartItems.map((cartItem, idx) =>
                            <CartItems key={idx} cartItem={cartItem}
                                       salePrice={salePrice(cartItem)}
                                       currentSale={discountPrice(cartItem).currentSale}
                                       discountPrice={discountPrice(cartItem).discountPrice}
                            />)
                        : <h2>No Cart</h2>}

                        {!isLoggedIn && cart ?
                            cart.map((cartItem, idx) =>
                            <CartItems key={idx} cartItem={cartItem}
                                       salePrice={salePrice(cartItem)}
                                       currentSale={discountPrice(cartItem).currentSale}
                                       discountPrice={discountPrice(cartItem).discountPrice}
                            />)
                        : <h2>No Cart</h2>}
                </Col>
                <Col xs={3}>
                    {isLoggedIn ?
                        <CartSummary cartItems={cartItems}
                                     cartSummery={cartSummery(cartItems, quantity)}
                        />
                    : <CartSummary cartItems={cart}

                        />}
                </Col>
            </Row>
        </Container>
    </>
}

function mapStateToProps(state) {
    // console.log(state)
    return {
        cartItems: state.cartReducer.cartItems,
        isLoggedIn: state.userReducer.isLoggedIn,
        quantity: state.cartReducer.quantity
    }
}

export default connect(mapStateToProps)(Cart)