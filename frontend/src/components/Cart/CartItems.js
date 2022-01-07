import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {initiateDeleteCartItem, initiateEditCart} from "../../modules/cart";
import {connect, useDispatch} from "react-redux";
import {useState} from "react";

function CartItems({cartItem, isLoggedIn }) {

    const dispatch = useDispatch();
    console.log(cartItem.productName + "cartitem")
    console.log(cartItem.productId + "cartitem")

    const [quantity, setQuantity] = useState(cartItem.quantity)

    function handleQuantity(e) {
        setQuantity(Number(e.target.value))
    }

    function editCart(){
        console.log(quantity, " quantity")
        console.log(cartItem.productId)
        dispatch(initiateEditCart(quantity, cartItem.productId))
    }

    function handleRemoveFromCart(cartItem) {
        // localStorage.clear()

        if(isLoggedIn) {
            dispatch(initiateDeleteCartItem(cartItem.productId))
        }
        else {
            // console.log(cartItem)
            let cartStorage = JSON.parse(window.localStorage.getItem('cartItems'))
            // console.log(cartStorage)
            const updatedCart = cartStorage.filter(item => item.id !== cartItem.id)
            // console.log(updatedCart)
            localStorage.setItem('cartItems', JSON.stringify(updatedCart))
            window.location.reload(false)
        }
    }
    return <>
        <Card style={{marginBottom: '1.5rem', width: 'auto', height: '16.5rem'}}>
            <Row>
                <Col style={{margin: 'auto'}} >
                    <Card.Img variant="top" style={{ width: '8em', height: '8em'}} src="holder.js/100px180"/>
                </Col>
                <Col >
                    <Card.Body>
                        <Card.Title>{cartItem.productName}</Card.Title>
                        <Card.Text>{cartItem.size}</Card.Text>
                        <Card.Text>{cartItem.unitPrice}</Card.Text>
                        <Card.Text>{cartItem.productDescription}</Card.Text>
                        <Form.Select defaultValue={quantity} onChange={handleQuantity}>
                            {[1, 2, 3, 4, 5].map((quant, index) =>
                                <option key={index}
                                        value={quant}>
                                    {quant}
                                </option>)}
                        </Form.Select>
                        <Button variant="primary" size="sm"  onClick={editCart}>Save</Button>
                        <Button variant="warning" size="sm" onClick={() => handleRemoveFromCart(cartItem)}>Delete all</Button>
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