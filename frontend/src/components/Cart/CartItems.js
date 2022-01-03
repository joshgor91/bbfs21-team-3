import {Button, Card, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router";


function CartItems({cartItem}) {

    function handleRemoveFromCart(cartItem) {
        console.log(cartItem)
        let cartStorage = JSON.parse(window.localStorage.getItem('cartItems'))
        console.log(cartStorage)
        const updatedCart = cartStorage.filter(item => item.id !== cartItem.id)
        console.log(updatedCart)
        localStorage.setItem('cartItems', JSON.stringify(updatedCart))

    }
    return <>
        <Card style={{marginBottom: '1.5rem', width: 'auto', height: '13.5rem'}}>
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

export default CartItems