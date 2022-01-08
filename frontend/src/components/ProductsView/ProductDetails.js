import {Container, Row, Col, Card, Button, Form, Alert, ToastContainer, Toast} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import {initiateAddCartItem} from "../../modules/cart";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import moment from "moment";

function ProductDetails({product}) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleCloseTimed = () => setTimeout(() => {handleClose()}, 2000);

    let now = new Date()
    let currentPrice = 0
    // product.ScheduledPrices.map(prices => {
    //     if (new Date(prices.effectiveDate) - now < 0) {
    //         currentPrice = prices.price
    //     }
    // })
    console.log(currentPrice)


    function addToCart(productToAdd) {
        dispatch(initiateAddCartItem(productToAdd, quantity))
        handleShow()
        handleCloseTimed()

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
                                        <Button variant="primary" size="sm" onClick={() => addToCart(product)}>
                                            Add to Cart
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Form.Select defaultValue={quantity} onChange={handleQuantity}>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((quant, index) =>
                                                <option key={index} value={quant}>
                                                    {quant}
                                                </option>)}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Button variant="secondary" size="sm" id="cont-shopping-btn">
                                        <Link className="link-item" to="/">Continue Shopping?</Link>
                                    </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        {show && <Alert variant="success" onClick={handleClose}> Added to Cart</Alert>}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

function mapStateToProps(state) {
    return {
        product: state.productsReducer.productToView,
        cartItems: state.cartReducer.cartItems,
        addCartItemSuccess: state.cartReducer.addCartItemSuccess,
    }
}

export default connect(mapStateToProps)(ProductDetails)