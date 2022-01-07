import {Container, Row, Col, Card, Button, Form} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import {initiateAddCartItem} from "../../modules/cart";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import moment from "moment";

function ProductDetails({product}) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)

    let now = new Date()
    let currentPrice = 0
    let currentSale = 0
    console.log(product)
    product.ScheduledPrices.map(prices => {
        if (new Date(prices.effectiveDate) - now < 0) {
            currentPrice = prices.price
        }
    })
    // console.log(currentPrice)


    function addToCart(productToAdd) {
        dispatch(initiateAddCartItem(productToAdd, quantity))

    }

    function handleQuantity(e) {
        setQuantity(Number(e.target.value))
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Card style={{width: '18rem'}}>
                            <Card.Img className='product-img' variant="top" src={product.picture}/>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{width: '30rem', height: '30rem'}}>
                            <Card.Body>
                                <Card.Title>{currentPrice}$</Card.Title>
                                <Card.Title>{product.brand}</Card.Title>
                                <Card.Header>{product.productName}</Card.Header>
                                <Card.Text>{product.productDescription}</Card.Text>
                                <Card.Text>{product.discontinued && 'Discontinued'}</Card.Text>
                                {product.unitsInStock !== 0 ?
                                    <Card.Text>Available</Card.Text>
                                    : <Card.Text>Out of Stock</Card.Text>}

                                <Row>
                                    <Col>
                                        <Button variant="primary"
                                                onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Form.Select defaultValue={quantity} onChange={handleQuantity}>
                                            {[1, 2, 3, 4, 5].map((quant, index) =>
                                                <option key={index}
                                                        value={quant}>
                                                    {quant}
                                                </option>)}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Button variant="primary">
                                        <Link className="link-item" to="/">Continue Shopping?</Link>
                                    </Button>
                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

function mapStateToProps(state) {
    return {
        product: state.productsReducer.productToView,
        cartItems: state.cartReducer.cartItems
    }
}

export default connect(mapStateToProps)(ProductDetails)