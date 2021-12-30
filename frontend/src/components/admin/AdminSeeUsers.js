import {Table} from "react-bootstrap";
import { gettingUsers} from "../../modules/user";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function AdminSeeUsers({ users, gettingUsers}) {
    const tHead = ["ID", "First Name", "Last Name", "Role", "Email", "Auth Level", "Password"]
    console.log(users)
    return (
    // Toggle hidden to true and false wil clicked on View all in AdminForm.js
        <Table striped bordered responsive >
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
                    </tr>
                ))}
            </tbody>
        </Table>

    );
}

function mapStateToProps(state) {
    return {
        users: state.userReducer.users
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ gettingUsers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSeeUsers)