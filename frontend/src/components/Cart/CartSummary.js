import {Button, Card, Col, Form, Image, Modal, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {clearReceipt, initiateValidateCoupon} from "../../modules/order";
import {setGuestState} from "../../modules/guest";

function CartSummary({cartItems, cartSummery, isLoggedIn, guestEmail}) {
    let originalPrice = cartSummery.originalPrice
    let totalSavings = cartSummery.totalSavings
    let total = cartSummery.total

    const dispatch = useDispatch()

    const [coupon, setCoupon] = useState()
    const [applyingCoupon, setApplyingCoupon] = useState(false)

    function validateCoupon(){
        console.log("validating coupon")
        if(!isLoggedIn) {
            setApplyingCoupon(true)
        } else {
            dispatch(initiateValidateCoupon(coupon))
        }
    }

    function submitGuestCoupon(e) {
        e.preventDefault()
        setApplyingCoupon(false)
        console.log(`this is their email ${guestEmail}`)
        console.log('applying guest coupon')
        dispatch(initiateValidateCoupon(coupon))
    }

    function onGuestEmailChange(e) {
        const {name, value} = e.target
        dispatch(setGuestState(name, value))
    }

    return <>
        <Card className="d-flex flex-row flex-wrap">
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
                                <Form.Control type="text" value={coupon} placeholder="Enter coupon code" onChange={event => setCoupon(event.target.value)}/>
                                <hr/>
                                <Button onClick={validateCoupon} className="login-register-button">
                                    Apply
                                </Button>
                            </Row>
                        </Form.Group>
                    </Form>
                    <hr/>
                    <Button variant="warning">
                        <Link id="checkout-button" to="checkout/">Checkout </Link>
                    </Button>
                </Row>
                <hr/>
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
        <Modal show={applyingCoupon} onHide={() => setApplyingCoupon(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Email To Redeem As Guest</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitGuestCoupon}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={guestEmail} name="guestEmail" onChange={onGuestEmailChange}/>
                    <Button type="submit">Apply</Button>
                </Form>
            </Modal.Body>
        </Modal>
    </>
}

function mapStateToProps(state) {
    return {
        guestEmail: state.guestReducer.guestEmail,
        discount: state.orderReducer.discount,

    }
}

export default connect(mapStateToProps)(CartSummary)