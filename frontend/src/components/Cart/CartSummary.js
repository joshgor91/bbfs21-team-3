import {Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {clearReceipt} from "../../modules/order";


function CartSummary({cartItems, cartSummery}) {
    // console.log(cartItems)
    let originalPrice = cartSummery.originalPrice
    let totalSavings = 0
    let total
    let now = new Date()
    let currentPrice = 0


        total = originalPrice.toFixed(2)


    return <>
        <Card>
            <Card.Body>
                <Card.Header>Order Summery</Card.Header>
                <Row>
                    <Col>
                        <Card.Text>Original Price: </Card.Text>
                    </Col>
                    <Col xs={'auto'}>
                        <Card.Text>{originalPrice.toFixed(2)}</Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Text>Total Savings: </Card.Text>
                    </Col>
                    <Col xs={'auto'}>
                        <Card.Text>{totalSavings}</Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Text>Total: </Card.Text>
                    </Col>
                    <Col xs={'auto'}>
                        <Card.Text>{total}</Card.Text>
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