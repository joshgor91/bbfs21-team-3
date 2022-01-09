import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {initiateDeleteCartItem, initiateEditCart} from "../../modules/cart";
import {connect, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {discountPrice, salePrice} from "../../utils/priceUtils";

function CartItems({cartItem, isLoggedIn, currentSale, salePrice}) {
    console.log(currentSale, salePrice)
    console.log(discountPrice(cartItem))
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(cartItem.quantity)

    function handleQuantity(e) {
        setQuantity(Number(e.target.value))
    }

    function editCart() {
        dispatch(initiateEditCart(quantity, cartItem.productId))
    }

    function handleRemoveFromCart(cartItem) {

        if (isLoggedIn) {
            dispatch(initiateDeleteCartItem(cartItem.productId))
        } else {
            let cartStorage = JSON.parse(window.localStorage.getItem('cartItems'))
            const updatedCart = cartStorage.filter(item => item.id !== cartItem.id)
            localStorage.setItem('cartItems', JSON.stringify(updatedCart))
            window.location.reload(false)
        }
    }

    return <>
        <Card style={{marginBottom: '1.5rem', width: 'auto', height: '16.5rem'}}>
            <Row>
                <Col xs='3' style={{margin: 'auto'}}>
                    <Card.Img variant="top" style={{width: '8em', height: '8em'}} src="holder.js/100px180"/>
                </Col>
                <Col>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title>{cartItem.productName}</Card.Title>
                            </Col>
                            <Col xs='auto'>
                                <Form.Select size='sm' style={{width: '4em'}} defaultValue={quantity}
                                             onChange={handleQuantity}>
                                    {Array.from(Array(15), (_, i) => i + 1).map((quant, index) =>
                                        <option key={index}
                                                value={quant}>
                                            {quant}
                                        </option>)}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Text>{cartItem.size}</Card.Text>
                            </Col>
                            <Col xs='auto' style={{marginTop: '.2em', width: 'auto'}}>
                                <Button variant="primary" size="sm" onClick={editCart}>Save</Button>
                            </Col>
                        </Row>
                        <Row>
                            {/*<Col>*/}
                            {/*    {discountPrice(cartItem).currentSale > 0 ?*/}
                            {/*        <Card.Text>${discountPrice(cartItem).discountedPrice}</Card.Text>*/}
                            {/*        :*/}
                            {/*        <Card.Text>${salePrice}</Card.Text>}*/}
                            {/*</Col>*/}
                        </Row>
                        <Card.Text>{cartItem.productDescription}</Card.Text>
                        <Row>
                            <Col></Col>
                            <Col xs='auto'>
                                <Button variant="warning" size="sm" onClick={() => handleRemoveFromCart(cartItem)}>
                                    Delete all
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    </>
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.userReducer.isLoggedIn,
        // total: state.cartReducer.total,
        // totalSales:
        // originalTotal
    }
}

export default connect(mapStateToProps)(CartItems);