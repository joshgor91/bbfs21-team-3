import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Accordion, Button, Card, Row} from "react-bootstrap";
import {initiateGetOrderHistory} from "../../modules/order";
import {useEffect} from "react";
import moment from "moment";


function OrderHistory({initiateGetOrderHistory, orderlist}) {

    useEffect(() => {
        initiateGetOrderHistory()
    }, []);
    console.log(orderlist)

    return(
        <>

    {orderlist.map((order, idx) => {

        return (
            <Accordion>
                <Accordion.Item eventKey={idx}>
                    <Accordion.Header>
                        {moment(order.orderDetails.dateCreated).format("MMM Do YYYY")}
                    </Accordion.Header>
                    <Accordion.Body className="d-flex flex-row flex-wrap" >
                        {order.orderItems.map((product, idx) => {
                            return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={product.picture} />
                            <Card.Body>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text>
                                    {product.productDescription}
                                </Card.Text>
                                <Card.Text>
                                    {product.unitPrice}
                                </Card.Text>

                            </Card.Body>
                        </Card>
                            )
                        })}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    })
    }
        </>
    )

}



    function mapStateToProps(state) {
        return {
            orderlist: state.orderReducer.orders
        }
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({initiateGetOrderHistory}, dispatch)

    }

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)