import {Card, Col, Row} from "react-bootstrap";


function CartSummary({cartItems}) {

    // unit price will change to MSRP or Sell price - Full Price
    const originalPrice = cartItems.reduce((previousVal, currentVal) => previousVal.unitPrice + currentVal.unitPrice)
    // Sale Price will need to change to decimal
    const salesPrices = cartItems.map(item => {
        let result = item.unitPrice * item.sale
        return Number(result.toFixed(2))
    })
    const totalSavings = salesPrices.reduce((prevVal, currVal) => prevVal + currVal)
    // shows total after savings
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