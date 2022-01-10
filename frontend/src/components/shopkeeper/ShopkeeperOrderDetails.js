import {Card, Col, Modal, Row} from "react-bootstrap";


function ShopkeeperOrderDetails({order, showOrderDetails, setShowOrderDetails}) {
    return (
        <Modal size='lg' show={showOrderDetails} onHide={() => setShowOrderDetails(false)}>
            <Modal.Header closeButton>Order {order.orderDetails.orderDetailsId}</Modal.Header>
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
            </Modal.Body>
        </Modal>
    )

}

export default ShopkeeperOrderDetails