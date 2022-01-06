import {Button, Card, Col, Row} from "react-bootstrap";
import {initiateDeleteCartItem} from "../../modules/cart";
import {connect, useDispatch} from "react-redux";

function CartItems({cartItem, isLoggedIn }) {

    const dispatch = useDispatch();
    console.log(cartItem.productName + "cartitem")
    console.log(cartItem.productId + "cartitem")


    function handleRemoveFromCart(cartItem) {


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
                        <Button variant="warning" onClick={() => handleRemoveFromCart(cartItem)}>Remove from Cart</Button>
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