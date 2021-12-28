import {Button, ButtonGroup, Col, Dropdown} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";



function AdminForm({createUser, deleteUser, editUser, existingUsers}) {



    return <>
        <Col>
            <Dropdown as={ButtonGroup}>
                <Button variant="success">Admin Stuff</Button>

                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                <Dropdown.Menu>
                    <Dropdown.Item  onClick={() => createUser(user)}>Create</Dropdown.Item>
                    <Dropdown.Item onClick={() => editUser(user)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => deleteUser(user.id)}>Delete</Dropdown.Item>
                    <Dropdown.Item onClick={() => existingUsers(user)}>Users>Users</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
            </Col></>

}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({createUser, deleteUser, editUser, existingUsers}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(AdminForm)



