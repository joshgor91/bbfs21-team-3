import {Container, Row, Col, Card, Button} from "react-bootstrap";
import {connect} from "react-redux";

function ProductDetails({product}) {

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
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Header>Sold by {product.brand}</Card.Header>
                                <Card.Text>{product.productDescription}</Card.Text>
                                {product.unitsInStock != 0 ?
                                    <Card.Text>Available</Card.Text>
                                    : <Card.Text>Out of Stock</Card.Text>}
                                <Button variant="primary">Add to Cart</Button>
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
    }
}

export default connect(mapStateToProps)(ProductDetails)