import UserView from "../components/UserView/UserView";
import OrderHistory from "../components/OrderHistory/OrderHistory";
import {Col, Row} from "react-bootstrap";


const UserPage = () => {
    return <>
        <Row>
            <Col sm="4">
        <UserView/>
            </Col>
            <Col sm="8">
        <OrderHistory/>
            </Col>
        </Row>
    </>
}



export default UserPage