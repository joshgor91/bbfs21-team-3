import {Badge, Button, Card, CloseButton, Col, Modal, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {editProduct, cancelViewProductDetails, viewProductDetails} from "../../modules/shopkeeper";
import {connect} from "react-redux";

function ShopkeeperProduct({show, product, cancelViewProductDetails, initiateDeleteProduct}) {
    console.log(product)

    return <Modal show={show} onHide={cancelViewProductDetails}>
        <Modal.Header closeButton>
            <Modal.Title>View Product</Modal.Title>
        </Modal.Header>
        <Col><Card >
        <Card.Header>
            <Card.Title>Brand</Card.Title>
            <Card.Text>{product.brand}</Card.Text>
            <Card.Subtitle>Product Name</Card.Subtitle>
            <Card.Text>{product.productName}</Card.Text>
            <Card.Subtitle>Categories</Card.Subtitle>
            <Card.Text>{product.categories.map((category, idx) => <Badge key="idx">{category.categoryName}</Badge>)}</Card.Text>
        </Card.Header>
        <Card.Body>
            <Card.Subtitle>Product Description</Card.Subtitle>
            <Card.Text>{product.productDescription}</Card.Text>
            <Card.Subtitle>Size</Card.Subtitle>
            <Card.Text>{product.size}</Card.Text>
            <Card.Subtitle>Color</Card.Subtitle>
            <Card.Text>{product.color}</Card.Text>
            <Card.Subtitle>Product Available</Card.Subtitle>
            <Card.Text>{product.productAvailable?.toString()}</Card.Text>
            <Card.Subtitle>Discontinued</Card.Subtitle>
            <Card.Text>{product.discontinued ? 'True' : 'False'}</Card.Text>
            <Card.Subtitle>Discount Available</Card.Subtitle>
            <Card.Text>{product.discountAvailable ? 'True' : 'False'}</Card.Text>
            <Card.Subtitle>Product Picture</Card.Subtitle>
            <Card.Text>{product.picture}</Card.Text>

            <Card.Subtitle>Unit Price</Card.Subtitle>
            <Card.Text>{product.unitPrice}</Card.Text>
            <Card.Subtitle>Units in Stock</Card.Subtitle>
            <Card.Text>{product.unitsInStock}</Card.Text>
            <Card.Subtitle>Date Received</Card.Subtitle>
            <Card.Text>{product.dateReceived?.toString()}</Card.Text>
            <Card.Subtitle>Units Received</Card.Subtitle>
            <Card.Text>{product.unitsReceived}</Card.Text>


            <Card.Subtitle>Effective Sales Date</Card.Subtitle>
            <Card.Text>{product.scheduledPrices.effectiveDate}</Card.Text> {/*product.scheduledPrices.effectiveDate*/}
            <Card.Subtitle>Sales Price</Card.Subtitle>
            <Card.Text>{product.scheduledPrices.price}</Card.Text> {/*product.scheduledPrices.price*/}

        </Card.Body>
    </Card></Col>
    </Modal>

}

function mapStateToProps(state) {
    return {
        show: state.shopkeeperReducer.showProductDetails,
        product: state.shopkeeperReducer.productToView,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ editProduct, cancelViewProductDetails, viewProductDetails}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopkeeperProduct)