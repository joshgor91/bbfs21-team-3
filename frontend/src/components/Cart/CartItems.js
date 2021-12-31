import {Button, Card, Col, Row} from "react-bootstrap";


function CartItems({cartItem}) {

    return <>
        <Card style={{margin: 'auto', marginTop: '1.5rem', width: 'auto'}}>
            <Row>
                <Col style={{margin: 'auto'}} >
                    <Card.Img variant="top" style={{ width: '8em', height: '8em'}} src="holder.js/100px180"/>
                </Col>
                <Col >
                    <Card.Body>
                        <Card.Title>{cartItem.productName}</Card.Title>
                        <Card.Text>{cartItem.unitPrice}</Card.Text>
                        <Card.Text>{cartItem.productDescription}</Card.Text>
                        <Button variant="warning">Remove from Cart</Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    </>
}

export default CartItems