import {Button, Stack, Table} from "react-bootstrap";
import {gettingUsers, initiateDeleteUser, initiateEditUser} from "../../modules/user";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function AdminSeeUsers({ users, hide, initiateEditUser, initiateDeleteUser}) {
    const tHead = ["ID", "First Name", "Last Name", "Role", "Email", "Auth Level", "Password", "Edit/Delete"]
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
                    <tr>
                    <td key={index}>{user.id}</td>
                    <td key={index}>{user.firstName}</td>
                    <td key={index}>{user.lastName}</td>
                    <td key={index}>{user.role}</td>
                    <td key={index}>{user.email}</td>
                    <td key={index}>{user.authLevel}</td>
                    <td key={index}>{user.password}</td>
                        <td key={index}>
                            <Stack>
                            <Button onClick={() => initiateEditUser(user)}>edit</Button>
                            <Button onClick={() => initiateDeleteUser(user.id)}>Delete</Button>
                            </Stack>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

function mapStateToProps(state) {
    return {
        hide: state.userReducer.hideTable,
        users: state.userReducer.users

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ gettingUsers, initiateEditUser, initiateDeleteUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSeeUsers)