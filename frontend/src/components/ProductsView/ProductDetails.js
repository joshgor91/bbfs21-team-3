import {Container, Row, Col, Card, Button, Form, Alert, ToastContainer, Toast, Badge} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import {initiateAddCartItem} from "../../modules/cart";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import moment from "moment";
import {discountPrice, sellPrice} from "../../utils/priceUtils";

function ProductDetails({product}) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleCloseTimed = () => setTimeout(() => {
        handleClose()
    }, 1000);
    const [sellingPrice, setSellingPrice] = useState(0)
    const [theDiscountPrice, setTheDiscountPrice] = useState(0)
    const [currentSale, setCurrentSale] = useState(0)
    const [cartItemSoldPrice, setCartItemSoldPrice] = useState(0)
    // console.log(theDiscountPrice, 'theDiscountPrice', currentSale, 'currentSale', sellingPrice, 'sellingPrice')

    useEffect(() => {
        setTheDiscountPrice(discountPrice(product).discountPrice)
        setCurrentSale(discountPrice(product).currentSale)
        setSellingPrice(sellPrice(product))
    }, [])

    useEffect(() => {
        if (currentSale === 0) {
            setCartItemSoldPrice(sellingPrice)
        } else {
            setCartItemSoldPrice(theDiscountPrice)
        }
    }, [addToCart])

    // console.log(currentPrice)


    function addToCart(productToAdd) {

        handleShow()
        handleCloseTimed()
        dispatch(initiateAddCartItem(productToAdd, quantity, sellingPrice, cartItemSoldPrice))

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
                                    {!currentSale > 0 ?
                                        <Col>
                                            <Card.Title>${sellingPrice}</Card.Title>
                                        </Col>
                                        :
                                        <Col>
                                            <Card.Title>${theDiscountPrice}</Card.Title>
                                        </Col>
                                    }
                                </Row>
                                <Row>

                                    <Col>
                                        {currentSale > 0 &&
                                        <Card.Title style={{color: 'red'}}>Sale ${currentSale}!</Card.Title>}
                                    </Col>
                                    <Col xs='auto'>
                                        {currentSale > 0 &&
                                        <Card.Title style={{textDecoration: 'line-through', color: 'red'}}>
                                            {sellingPrice}
                                        </Card.Title>}
                                    </Col>
                                </Row>
                                <Card.Title>{product.brand}</Card.Title>
                                <Card.Subtitle>{product.productName}</Card.Subtitle>
                                <Card.Text>{product.productDescription}</Card.Text>
                                {product.categories.map(category => <Badge>{category.categoryName}</Badge>)}
                                <Card.Text>{product.discontinued && 'Discontinued'}</Card.Text>
                                {product.unitsInStock !== 0 ?
                                    <>
                                        <Card.Text>Available</Card.Text>
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
                                                {Array.from(Array(product.unitsInStock), (_, i) => i + 1).map((quant, index) =>
                                                    <option key={index}
                                                            value={quant}>
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
                                    </>
                                    : <Card.Text>Out of Stock</Card.Text>}

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