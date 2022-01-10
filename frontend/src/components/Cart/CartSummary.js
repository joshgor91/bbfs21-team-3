import {Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {clearReceipt} from "../../modules/order";


function CartSummary({cartItems, cartSummery}) {

    let originalPrice = cartSummery.originalPrice
    let totalSavings = cartSummery.totalSavings
    let total = cartSummery.total

    return <>
        <Card>
            <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <Row>
                    <Col>
                        <Card.Text>Original Price: </Card.Text>
                    </Col>
                    <Col xs={'auto'}>
                        <Card.Text>${originalPrice.toFixed(2)}</Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Text>Total Savings: </Card.Text>
                    </Col>
                    <Col xs={'auto'}>
                        <Card.Text>${totalSavings}</Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Text>Total: </Card.Text>
                    </Col>
                    <Col xs={'auto'}>
                        <Card.Text>${total}</Card.Text>
                    </Col>
                </Row>
                <Button>
                    <Link id="checkout-button" to="checkout/">Checkout </Link>
                </Button>
            </Card.Body>
        </Card>
    </>
}

export default CartSummary