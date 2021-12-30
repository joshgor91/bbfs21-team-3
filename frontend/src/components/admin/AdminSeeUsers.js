import {Button, Stack, Table} from "react-bootstrap";
import {gettingUsers, initiateDeleteUser, startEditingUser} from "../../modules/user";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function AdminSeeUsers({ users, hide, startEditingUser, initiateDeleteUser}) {
    const tHead = ["ID", "First Name", "Last Name", "Role", "Email", "Auth Level", "Password", "Edit/Delete"]
    return (
    // Toggle hidden to true and false wil clicked on View all in AdminForm.js
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
                            <Button onClick={startEditingUser}>edit</Button>
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
    return bindActionCreators({ gettingUsers, startEditingUser, initiateDeleteUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSeeUsers)