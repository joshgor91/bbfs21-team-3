import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {clearReceipt} from "../../modules/order";


function CartSummary({cartItems}) {
    // console.log(cartItems)
    let originalPrice = 0
    let totalSavings = 0
    let total
    let now = new Date()
    let currentPrice = 0
    // if (cartItems) {
    //     cartItems.map(cartItem => {
    //         console.log(cartItem.ScheduledPrices)
    //         cartItem.ScheduledPrices.map(prices => {
    //             if (new Date(prices.effectiveDate) - now < 0) {
    //                 originalPrice += Number(prices.price)
    //             }
    //         })
    //     })
    //     console.log(Number(originalPrice.toFixed(2)))
    //     console.log(currentPrice)
    //
    //     // console.log(originalPrice)
    //     const salesPrices = cartItems.map(item => {
    //         let result = item.unitPrice * item.sale
    //         return Number(result.toFixed(2))
    //     })
    //     for (let sales of salesPrices) {
    //         totalSavings += Number(sales)
    //     }
    //     // console.log(totalSavings)
    // }
    //
    //     total = originalPrice.toFixed(2)


    return <>
        <Card>
            <Card.Body>
                <Card.Title>Order Summary</Card.Title>
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
                <Row>
                <Button variant="warning">
                    <Link id="checkout-button" to="checkout/">Checkout </Link>
                </Button></Row>
                <hr/>
                <Row>
                    <Button  variant="dark">
                        <Link id="paypal-checkout-button" to="checkout/">PayPal Checkout </Link>
                    </Button></Row><hr/>
                <div>Apply today, shop today.</div>
                <Image
                    style={{width: 85, height: 50, marginLeft:"5px"}}
                    alt="10% back in rewards on first day of purchases for new My Best Buy® Credit Card members"
                    src="https://www.bestbuy.com/~assets/bby/_com/MBBCC_MBBVC_2018_RGB-947585d1258e6806d8eeb072b8d2ad6a.png"/>
                <span id="span" to="text">
                    <strong >10% back in rewards </strong>
                    on first day of purchases for new My Best Buy® Credit Card members
                </span>
            </Card.Body>
        </Card>
    </>
}

export default CartSummary