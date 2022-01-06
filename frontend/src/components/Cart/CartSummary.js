import {Button, Card, Col, Row} from "react-bootstrap";
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
    if (cartItems) {
        cartItems.map(cartItem => {
            console.log(cartItem.ScheduledPrices)
            cartItem.ScheduledPrices.map(prices => {
                if (new Date(prices.effectiveDate) - now < 0) {
                    originalPrice += Number(prices.price)
                }
            })
        })
        console.log(Number(originalPrice.toFixed(2)))
        console.log(currentPrice)

        // console.log(originalPrice)
        const salesPrices = cartItems.map(item => {
            let result = item.unitPrice * item.sale
            return Number(result.toFixed(2))
        })
        for (let sales of salesPrices) {
            totalSavings += Number(sales)
        }
        // console.log(totalSavings)
    }

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