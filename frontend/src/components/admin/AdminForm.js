import {Button, ButtonGroup, Col, Dropdown} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {startAddingUser} from "../../modules/user";



function AdminForm({startAddingUser}){


    return <>
        <Col>
            <Dropdown as={ButtonGroup}>
                <Button variant="success">Admin Stuff</Button>

                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={startAddingUser}
                    >Create</Dropdown.Item>
                    <Dropdown.Item
                        // onClick={() => editUser(user)}
                    >Edit</Dropdown.Item>
                    <Dropdown.Item
                        // onClick={() => deleteUser(user.id)}
                    >Delete</Dropdown.Item>
                    <Dropdown.Item
                        // onClick={() => existingUsers(user)}
                    >Users</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
                    {/*<Col><Button variant="dark" onClick={logout}>Logout</Button></Col>*/}
            </Col></>

}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({startAddingUser}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(AdminForm)
// export default AdminForm


