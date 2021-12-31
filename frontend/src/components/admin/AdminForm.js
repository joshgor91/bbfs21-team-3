import {Button, ButtonGroup, Col, Dropdown} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {startAddingUser, initiateGetUsers} from "../../modules/user";



function AdminForm({startAddingUser, initiateGetUsers}){


    return <>
        <Col className={'m-5'}>
            <Dropdown as={ButtonGroup}>
                <Button variant="success">Admin Stuff</Button>

                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={startAddingUser}
                    >Create</Dropdown.Item>
                    <Dropdown.Item
                        onClick={initiateGetUsers}
                    >View all Users</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
                    {/*<Col><Button variant="dark" onClick={logout}>Logout</Button></Col>*/}
            </Col></>

}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({startAddingUser, initiateGetUsers}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(AdminForm)


