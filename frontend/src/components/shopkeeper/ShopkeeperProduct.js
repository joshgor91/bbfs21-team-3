import {Badge, Button, Card, CloseButton, Col, Modal, Row, Tab, Table} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {editProduct, cancelViewProductDetails, viewProductDetails} from "../../modules/shopkeeper";
import {connect} from "react-redux";
import moment from "moment";
import {useEffect, useState} from "react";
import {discountPrice, minAdPrice, sellPrice} from "../../utils/priceUtils";


function ShopkeeperProduct({show, product, cancelViewProductDetails}) {
    const [sellingPrice, setSellingPrice] = useState(0)
    const [theDiscountPrice, setTheDiscountPrice] = useState(0)
    const [minAdvPrice, setMinAdvPrice] = useState(0)
    console.log(minAdvPrice, theDiscountPrice, sellingPrice)

    useEffect(() => {
        setSellingPrice(sellPrice(product))
        setTheDiscountPrice(discountPrice(product).discountPrice)
        setMinAdvPrice(minAdPrice(product))

    }, [show]);



    return <Modal show={show} size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  onHide={cancelViewProductDetails}>
        <Modal.Header closeButton>
            <Modal.Title>View Product</Modal.Title>
        </Modal.Header>
        <Col><Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>Brand</Card.Title>
                        <Card.Text>{product.brand}</Card.Text>
                    </Col>
                    <Col xs='sm'>
                        {minAdvPrice > sellingPrice &&
                        <Card.Title style={{color: 'red'}}>CHECK ADVERTISED PRICE - SCHEDULED PRICE UNDER
                            MAP!</Card.Title>
                        }
                        {minAdvPrice > theDiscountPrice && theDiscountPrice !== 0 &&
                        <Card.Title style={{color: 'red'}}>CHECK SALE - SALE UNDER MAP!</Card.Title>
                        }
                        {product.unitPrice > sellingPrice &&
                        <Card.Title style={{color: 'red'}}>NO DUMPING! - CHECK PRICING - ADVERTISED PRICE WAY TO LOW</Card.Title>
                        }
                    </Col>
                </Row>
                <Card.Subtitle>Product Name</Card.Subtitle>
                <Card.Text>{product.productName}</Card.Text>
                <Card.Subtitle>Categories</Card.Subtitle>
                <Card.Text>{product.categories.map((category, idx) => <Badge className={'m-1'}
                    key={idx}>{category.categoryName}</Badge>)}</Card.Text>
<hr/>
                <Card.Subtitle>Product Description</Card.Subtitle>
                <Card.Text>{product.productDescription}</Card.Text>
                <hr  />
                <Card.Subtitle>Size</Card.Subtitle>
                <Card.Text>{product.size}</Card.Text>
                <hr  />
                <Card.Subtitle>Color</Card.Subtitle>
                <Card.Text>{product.color}</Card.Text>
                <hr  />
                <Card.Subtitle>Product Available</Card.Subtitle>
                <Card.Text>{moment(product.productAvailable).add(6, "hours").format('llll')}</Card.Text>
                <hr  />
                <Card.Subtitle>Discontinued</Card.Subtitle>
                <Card.Text>{product.discontinued ? 'True' : 'False'}</Card.Text>
                <hr  />
                <Card.Subtitle>Discount Available</Card.Subtitle>
                <Card.Text>{product.discountAvailable ? 'True' : 'False'}</Card.Text>
                <hr  />
                <Card.Subtitle>Product Picture</Card.Subtitle>
                <Card.Text>{product.picture}</Card.Text>
                <hr  />
                <Card.Subtitle>Unit Price</Card.Subtitle>
                <Card.Text>{product.unitPrice}</Card.Text>
                <hr  />
                <Card.Subtitle>Units in Stock</Card.Subtitle>
                <Card.Text>{product.unitsInStock}</Card.Text>
                <hr  />
                <Card.Subtitle>Date Received</Card.Subtitle>
                <Card.Text>{moment(product.dateReceived).add(6, "hours").format('llll')}</Card.Text>
                <hr  />
                <Card.Subtitle>Units Received</Card.Subtitle>
                <Card.Text>{product.unitsReceived}</Card.Text>
                <hr/>
                <Card.Subtitle>Scheduled Price(s)</Card.Subtitle>
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Price</th>
                            <th>Effective Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {product.scheduledPrices?.map((scheduledPrice, idx) =>
                            <tr key={idx}>
                                <td>{scheduledPrice.price}</td>
                                <td>{moment(scheduledPrice.effectiveDate).format('llll')}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </div>
                <hr/>
                <Card.Subtitle>Scheduled Sales Start Date</Card.Subtitle>
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Sale Start</th>
                            <th>Sale End</th>
                            <th>Discount</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {product.sales?.map((scheduledSale, idx) =>
                            <tr key={idx}>
                                <td>{moment(scheduledSale.saleStartDate).format('llll')}</td>
                                <td>{moment(scheduledSale.saleEndDate).format('llll')}</td>
                                <td>{scheduledSale.discount * 100}%</td>
                                <td>{scheduledSale.saleDescription}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </div>
                <hr/>
                <Card.Subtitle>Minimum Advertised Price</Card.Subtitle>
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Price</th>
                            <th>Effective Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {product.minimumAdvertisedPrice?.map((productMap, idx) =>
                            <tr key={idx}>
                                <td>{productMap.price}</td>
                                <td>{moment(productMap.effectiveDate).format('llll')}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
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