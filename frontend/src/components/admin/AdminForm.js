import {Button, ButtonGroup, Col, Dropdown} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {logout} from "../../modules/user";
import {initiateGetUsers, startAddingUser} from '../../modules/admin'




function AdminForm({startAddingUser, initiateGetUsers, logout}){


    return <>
        <Col className={'m-5'}>
            <Dropdown as={ButtonGroup}>
                <Button variant="primary">Admin Stuff</Button>

                <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={startAddingUser}
                    >Create</Dropdown.Item>
                    <Dropdown.Item
                        onClick={initiateGetUsers}
                    >View all Users</Dropdown.Item>

                </Dropdown.Menu><br/>
                <Col><Button variant="primary" style={{ marginLeft: "1000px"}} onClick={logout}>Logout</Button></Col>
            </Dropdown>
            </Col></>


}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({startAddingUser, initiateGetUsers, logout}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(AdminForm)


