import {Card, Col, Row} from "react-bootstrap";


function CartSummary({cartItems}) {
    console.log(cartItems)
    let originalPrice = 0
    let totalSavings = 0
    for (let cartItem of cartItems) {
        originalPrice += Number(cartItem.unitPrice)
    }
    console.log(originalPrice)

    if (cartItems.sale !== null) {
        const salesPrices = cartItems.map(item => {
            let result = item.unitPrice * item.sale
            return Number(result.toFixed(2))
        })
        for (let sales of salesPrices) {
            totalSavings += Number(sales)
        }
        console.log(totalSavings)
    }
    const total = originalPrice - totalSavings

    return <>
        <Card>
            <Card.Body>
                <Card.Header>Order Summery</Card.Header>
                <Row>
                    <Col>
                        <Card.Text>Original Price: </Card.Text>
                    </Col>
                    <Col xs={'auto'}>
                        <Card.Text>{originalPrice}</Card.Text>
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
            </Card.Body>
        </Card>
    </>
}

export default CartSummary