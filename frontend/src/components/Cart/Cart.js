import {connect, useDispatch} from "react-redux"
import CartItems from "./CartItems";
import {Col, Container, Row} from "react-bootstrap";
import CartSummary from "./CartSummary";
import {useEffect} from "react";
import {clearReceipt} from "../../modules/order";
import {discountPrice, salePrice} from "../../utils/priceUtils";


function Cart({cartItems, isLoggedIn}) {
    const dispatch = useDispatch()
    const cart = JSON.parse(window.localStorage.getItem('cartItems'))

    useEffect(() => {
        dispatch(clearReceipt())
    }, []);

    return <>
        <Container>
            <Row>
                <Col xs={9}>
                    {isLoggedIn && cartItems ?
                        cartItems.map((cartItem, idx) =>
                            <CartItems key={idx} cartItem={cartItem}
                                       salePrice={salePrice(cartItem)}
                                       // currentSale={discountPrice(cartItem).currentSale}
                                       // discountPrice={discountPrice(cartItem).discountedPrice}
                            />)
                        : <h2>No Cart</h2>}

                        {!isLoggedIn && cart ?
                            cart.map((cartItem, idx) =>
                            <CartItems key={idx} cartItem={cartItem}
                                       salePrice={salePrice(cartItem)}
                            />)
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
    // console.log(state)
    return {
        cartItems: state.cartReducer.cartItems,
        isLoggedIn: state.userReducer.isLoggedIn,
        goToReceipt: state.orderReducer.goToReceipt
    }
}

export default connect(mapStateToProps)(Cart)