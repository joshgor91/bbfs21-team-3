import {Button, Card, Col, Form, Image, Row} from "react-bootstrap";
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
                <Row>
                    <hr/>
                    <Form>

                        <Form.Group className="mb-3">
                            <Form.Label>Coupon Code</Form.Label>
                            <Row>
                                <Form.Control type="text" placeholder="Enter coupon code"
                                    // onChange={event => setCoupon(event.target.value)}
                                />
                                <hr/>
                                <Button className="login-register-button">
                                    Apply
                                </Button>
                            </Row>
                        </Form.Group>
                    </Form>
                    <hr/>
                    <Button variant="warning">
                        <Link id="checkout-button" to="checkout/">Checkout </Link>
                    </Button></Row>
                <div>Apply today, shop today.</div>
                <Image
                    style={{width: 85, height: 50, marginLeft: "5px"}}
                    alt="10% back in rewards on first day of purchases for new My Better Buy® Credit Card members"
                    src="https://www.bestbuy.com/~assets/bby/_com/MBBCC_MBBVC_2018_RGB-947585d1258e6806d8eeb072b8d2ad6a.png"/>
                <span id="span" to="text">
                    <strong>10% back in rewards </strong>
                    on first day of purchases for new My Better Buy® Credit Card members
                </span>
            </Card.Body>
        </Card>
    </>
}

export default CartSummary