import {Button, Stack, Table} from "react-bootstrap";
import {gettingUsers, initiateDeleteUser, initiateEditUser} from "../../modules/admin";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function AdminSeeUsers({ users, hide, initiateEditUser, initiateDeleteUser, setUserForm, loggedInUser, userToEdit}) {
    const tHead = ["ID", "First Name", "Last Name", "Role", "Email", "Auth Level", "Password", "Edit/Delete"]

    const handleEdit = user => event => {
        event.preventDefault()
        initiateEditUser(user)
        setUserForm(user)
    }
    return (

        <Table striped bordered responsive hidden={hide}>

            <thead>
            <tr>
                {tHead.map((tHead, index) => (
                    <th key={index}>{tHead}</th>
                ))}
            </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                    <td >{user.id}</td>
                    <td >{user.firstName}</td>
                    <td >{user.lastName}</td>
                    <td >{user.role}</td>
                    <td >{user.email}</td>
                    <td >{user.authLevel}</td>
                    <td >{user.password}</td>
                        <td>
                            <Stack>
                            <Button variant="info" onClick={handleEdit(user)} className={'m-1'}>Edit</Button>
                                {user.id !== loggedInUser.id ?
                                    <Button variant="danger" onClick={() => initiateDeleteUser(user.id)} className={'m-1'}>Delete</Button>
                                    : <></> }
                            </Stack>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

function mapStateToProps(state){
    return {
        hide: state.adminReducer.hideTable,
        users: state.adminReducer.users,
        loggedInUser: state.userReducer.loggedInUser,
        userToEdit: state.adminReducer.userToEdit

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ gettingUsers, initiateEditUser, initiateDeleteUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSeeUsers)