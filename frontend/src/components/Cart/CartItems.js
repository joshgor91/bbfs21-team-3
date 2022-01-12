import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {initiateDeleteCartItem, initiateEditCart} from "../../modules/cart";
import {connect, useDispatch} from "react-redux";
import {useState} from "react";

function CartItems({cartItem, isLoggedIn, currentSale, discountPrice, sellPrice}) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(cartItem.quantity)
    function handleQuantity(e) {
        setQuantity(Number(e.target.value))
    }


    function editCart() {
        if (isLoggedIn) {
            dispatch(initiateEditCart(quantity, cartItem.productId))
        } else {
            dispatch(initiateEditCart(quantity, cartItem.id))
        }
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
        <Card className="card-in-cart"
              style={{marginBottom: '1.5rem', width: 'auto', height: '12.5rem'}}
        >
            <Row>
                <Col xs='3' style={{margin: 'auto'}}>
                    <Card.Img variant="top" className={'m-3'} style={{width: '8em', height: '8em'}} src="holder.js/100px180"/>
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
                                <Button variant="primary" className={'m-1'} size="sm" onClick={editCart}>Save</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {currentSale > 0 ?
                                    <Card.Text>${discountPrice}</Card.Text>
                                    :
                                    <Card.Text>${sellPrice}</Card.Text>}
                            </Col>
                            {currentSale > 0 &&
                            <Col>
                                <Card.Text style={{color: 'red'}}>
                                   Savings ${currentSale}
                                </Card.Text>
                            </Col>}
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
    }
}

export default connect(mapStateToProps)(CartItems);