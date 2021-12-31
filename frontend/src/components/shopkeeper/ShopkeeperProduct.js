import {Button, Card, CloseButton, Col, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {initiateDeleteProduct, editProduct} from "../../modules/shopkeeper";
import {connect} from "react-redux";

function ShopkeeperProduct({product, initiateDeleteProduct, editProduct}) {
    return<Col><Card>
        <Card.Subtitle text={'danger'}>Product Name</Card.Subtitle>
        <Card.Text>{product.productName}</Card.Text>
        <Card.Subtitle>Product Description</Card.Subtitle>
        <Card.Text>{product.productDescription}</Card.Text>
        <Card.Subtitle>Brand</Card.Subtitle>
        <Card.Text>{product.brand}</Card.Text>
        <Card.Subtitle>Unit Price</Card.Subtitle>
        <Card.Text>{product.unitPrice}</Card.Text>
        <Card.Subtitle>Units in Stock</Card.Subtitle>
        <Card.Text>{product.unitsInStock}</Card.Text>
        <Card.Subtitle>Size</Card.Subtitle>
        <Card.Text>{product.size}</Card.Text>
        <Card.Subtitle>Color</Card.Subtitle>
        <Card.Text>{product.color}</Card.Text>
        <Card.Subtitle>Product Available</Card.Subtitle>
        <Card.Text>{product.productAvailable?.toString()}</Card.Text>
        <Card.Subtitle>Discontinued</Card.Subtitle>
        <Card.Text>{product.discontinued ? 'True' : 'False'}</Card.Text>
        <Card.Subtitle>Product Picture</Card.Subtitle>
        <Card.Text>{product.picture}</Card.Text>
        <Card.Subtitle>Date Received</Card.Subtitle>
        <Card.Text>{product.dateReceived?.toString()}</Card.Text>
        <Card.Subtitle>Units Received</Card.Subtitle>
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