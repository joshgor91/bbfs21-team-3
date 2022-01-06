import {Container, Row, Col, Card, Button, Form} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import {initiateAddCartItem} from "../../modules/cart";
import {useState} from "react";

function ProductDetails({product}) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)

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
                                <Card.Title>{product.unitPrice}$</Card.Title>
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