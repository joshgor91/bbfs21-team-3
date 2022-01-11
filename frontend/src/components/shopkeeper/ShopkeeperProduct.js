import {Badge, Button, Card, CloseButton, Col, Modal, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {editProduct, cancelViewProductDetails, viewProductDetails} from "../../modules/shopkeeper";
import {connect} from "react-redux";

function ShopkeeperProduct({show, product, sales, cancelViewProductDetails}) {
    console.log("inside shopkeeperProduct" + product)
    console.log({product})
    console.log(product.scheduledPrices[0].price)

    return <Modal show={show} onHide={cancelViewProductDetails}>
        <Modal.Header closeButton>
            <Modal.Title>View Product</Modal.Title>
        </Modal.Header>
        <Col><Card>
            <Card.Header>
                <Card.Title>Brand</Card.Title>
                <Card.Text>{product.brand}</Card.Text>
                <Card.Subtitle>Product Name</Card.Subtitle>
                <Card.Text>{product.productName}</Card.Text>
                <Card.Subtitle>Categories</Card.Subtitle>
                <Card.Text>{product.categories.map((category, idx) => <Badge
                    key="idx">{category.categoryName}</Badge>)}</Card.Text>
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

                <hr/>
                <Card.Subtitle>Scheduled Price Date</Card.Subtitle>
                <div>{product.scheduledPrices?.map(scheduledPrice =>
                    <Badge>price={scheduledPrice.price}
                    <br/>
                    Effective Date={scheduledPrice.effectiveDate}</Badge>
                )}</div>
                <hr/>
                <Card.Subtitle>Scheduled Sales Start Date</Card.Subtitle>
                <div>{
                    product.sales?.map(scheduledSale =>
                    <Badge>
                        sale start date={scheduledSale.saleStartDate}
                        <br/>
                        sale end date={scheduledSale.saleEndDate}<br/>
                        discount={scheduledSale.discount}<br/>
                        description of discount={scheduledSale.saleDescription}
                    </Badge>)
                }
                </div>

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
    return bindActionCreators({editProduct, cancelViewProductDetails, viewProductDetails}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopkeeperProduct)