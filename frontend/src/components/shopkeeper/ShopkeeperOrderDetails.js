import {Card, Col, Modal, Row} from "react-bootstrap";
import moment from "moment";


function ShopkeeperOrderDetails({order, showOrderDetails, setShowOrderDetails}) {
    return (
        <Modal size='lg' show={showOrderDetails} onHide={() => setShowOrderDetails(false)}>
            <Modal.Header closeButton>Order no. {order.orderDetails.orderDetailsId}</Modal.Header>
            <Modal.Body>
                    {order.orderItems.map((item, i) => {
                        return (
                            <Row key={i}>
                                <Col>
                                    <Card>
                                        <Card.Img className='product-img' variant="top" src={item.picture}/>
                                    </Card>
                                </Col>
                                <Col>
                                    <Row>
                                        Quantity Ordered
                                    </Row>
                                    <Row>
                                        {item.quantity}
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        Item Cost
                                    </Row>
                                    <Row>
                                        {item.salePrice}
                                    </Row>
                                </Col>
                            </Row>
                        )
                    })}
                <hr />
                <Row>
                    <Col>Order date</Col>
                    <Col>{moment(order.orderDetails.dateCreated).format("MMM Do YYYY")}</Col>
                </Row>
                <Row>
                    <Col>
                        Customer Email Address:
                    </Col>
                    <Col>
                        {order.orderDetails.email}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Customer Address:
                    </Col>
                    <Col>
                        {/*Need to include to orderDetails*/}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Order total:
                    </Col>
                    <Col>
                        {/*Currently returning as 0*/}
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )

}

export default ShopkeeperOrderDetails