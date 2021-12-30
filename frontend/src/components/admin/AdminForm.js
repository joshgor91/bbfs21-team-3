import {Button, ButtonGroup, Col, Dropdown} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {startAddingUser, initiateGetUsers} from "../../modules/user";



function AdminForm({startAddingUser, initiateGetUsers}){
    // Toggle hidden inside table to true and/or false when clicked
    function handleView(e){
     e.preventDefault()
     initiateGetUsers()
 }

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
                        // onClick={() => editingUser}
                        //Need to view users first, then add edit button
                    >Edit</Dropdown.Item>
                    <Dropdown.Item
                        // onClick={() => deleteUser(user.id)}
                        //Need to see users first, then add delete button
                    >Delete</Dropdown.Item>
                    <Dropdown.Item
                        onClick={handleView}
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
// export default AdminForm


