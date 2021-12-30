import {Button, Card, CloseButton, Col, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {initiateDeleteProduct, editProduct} from "../../modules/shopkeeper";
import {connect} from "react-redux";

function ShopkeeperProduct({product, initiateDeleteProduct, editProduct}) {
    return<Col><Card>
        <Card.Title>{product.productName}</Card.Title>
        <Card.Text>{product.productDescription}</Card.Text>
        <Card.Text>{product.brand}</Card.Text>
        <Card.Text>{product.unitPrice}</Card.Text>
        <Card.Text>{product.unitsInStock}</Card.Text>
        <Card.Text>{product.size}</Card.Text>
        <Card.Text>{product.color}</Card.Text>
        <Card.Text>{product.productAvailable}</Card.Text>
        <Card.Text>{product.discontinued}</Card.Text>
        <Card.Text>{product.picture}</Card.Text>
        <Card.Text>{product.dateReceived}</Card.Text>
        <Card.Text>{product.unitsReceived}</Card.Text>
        <Row>
            <Col><Button variant='primary' onClick={() => editProduct(product)}>Edit Product</Button></Col>
            <Col xs='auto'><CloseButton onClick={() => initiateDeleteProduct(product.id)}/></Col>
        </Row>
    </Card></Col>
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateDeleteProduct, editProduct}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(ShopkeeperProduct)