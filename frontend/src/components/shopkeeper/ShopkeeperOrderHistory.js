import {connect} from "react-redux";
import {Button,Modal,Table} from "react-bootstrap";
import moment from "moment";
import {useState} from "react";
import ShopkeeperOrderDetails from "./ShopkeeperOrderDetails";

function ShopkeeperOrderHistory({orderList, hide, setHide}) {
    const [showOrderDetails, setShowOrderDetails] = useState(false)
    const [order, setOrder] = useState({})
    const tHead = ['Order Date', 'Order Total', 'Order Details']

    function handleSetOrder(order) {
        // console.log(`logging setOrder, order = ${order}`)
        setOrder(order)
        setShowOrderDetails(true)
    }

    return (
        <>
        <Table striped bordered responsive hover size='sm' hidden={hide}>
            <thead>
            <tr>
                {tHead.map((tHead, index) => (
                    <th key={index}>{tHead}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {orderList.map((order, i) => (
                <tr key={order.orderDetails.orderDetailsId}>
                    <td >{moment(order.orderDetails.dateCreated).format("MMM Do YYYY")}</td>
                    <td>${order.orderDetails.total}</td>
                    <td>
                        <Button size='xs' onClick={() => handleSetOrder(order)} >Details</Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
        <Button onClick={() => setHide(true)}>Close Table</Button>
            {Object.keys(order).length > 0 && <ShopkeeperOrderDetails order={order} showOrderDetails={showOrderDetails} setShowOrderDetails={setShowOrderDetails} />}
        </>
    );

}



function mapStateToProps(state) {
    return {
        orderList: state.orderReducer.orders
    }
}

export default connect(mapStateToProps)(ShopkeeperOrderHistory)