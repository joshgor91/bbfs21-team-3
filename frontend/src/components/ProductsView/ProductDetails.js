import {Container, Row, Col, Card, Button, Form} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import {initiateAddCartItem, setCartPrices, setCartSale} from "../../modules/cart";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import moment from "moment";
import {useNavigate} from "react-router";
import {discountPrice, salePrice} from "../../utils/priceUtils";

function ProductDetails({product}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)

    console.log(discountPrice(product)[0])


    function addToCart(productToAdd) {
        dispatch(initiateAddCartItem(productToAdd, quantity))
        // dispatch(setCartPrices({
        //     originalTotal: currentPrice,
        //     totalSales: currentSale,
        //     total: saleAndPrice
        // }))
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
                                <Row>
                                    {!discountPrice(product).currentSale > 0 ?
                                        <Col>
                                            <Card.Title>{salePrice(product)}$</Card.Title>
                                        </Col>
                                        :
                                        <Col>
                                            <Card.Title>{discountPrice(product).discountPrice}$</Card.Title>
                                        </Col>
                                    }
                                </Row>
                                <Row>

                                    <Col>
                                        {discountPrice(product).currentSale > 0 &&
                                        <Card.Title style={{color: 'red'}}>Sale ${discountPrice(product).currentSale}!</Card.Title>}
                                    </Col>
                                    <Col xs='auto'>
                                        {discountPrice(product).currentSale > 0 &&
                                        <Card.Title style={{textDecoration: 'line-through', color: 'red'}}>
                                            {salePrice(product)}
                                        </Card.Title>}
                                    </Col>
                                </Row>
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
                                            {Array.from(Array(15), (_, i) => i + 1).map((quant, index) =>
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