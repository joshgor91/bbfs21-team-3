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
    const [currentPrice, setCurrentPrice] = useState(0)
    const [salePrice, setSalePrice] = useState(0)

    useEffect(() => {
        let now = new Date()
        let regularPrice = 0
        product.scheduledPrices?.map(prices => {
            let tempDate = new Date(prices.effectiveDate)
            if (new Date(prices.effectiveDate) - now < 0) {
                regularPrice = prices.price
                setCurrentPrice(prices.price)
            }
        })

        // sales is currently capitalized in redux
        // if there isn't any sales set, saleprice is regular price
        // still need logic for in between sales
        if (product.Sales.length > 0) {
            product.Sales?.map(sale => {
                let tempDate = new Date(sale.effectiveDate)
                if (new Date(sale.effectiveDate) - now < 0) {
                    setSalePrice(sale.price)
                }}

        )} else {
                setSalePrice(regularPrice)
        }
    },[])

    console.log(currentPrice)


    function addToCart(productToAdd) {
        handleShow()
        handleCloseTimed()
        dispatch(initiateAddCartItem(productToAdd, quantity, currentPrice, salePrice))
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
                                {salePrice !== currentPrice && <Card.Title>{salePrice}</Card.Title>}
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