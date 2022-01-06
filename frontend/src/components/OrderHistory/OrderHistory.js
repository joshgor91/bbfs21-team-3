import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Accordion, Button, Card} from "react-bootstrap";
import {initiateGetOrderHistory} from "../../modules/order";
import {useEffect} from "react";


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
                        {/*{order[0][0].productName}*/}
                    </Accordion.Header>
                    <Accordion.Body>
                        {order.map((product, idx) => {
                            return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
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