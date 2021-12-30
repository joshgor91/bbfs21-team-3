
import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {initiateAddUser, initiateEditUser, cancelEditUser} from "../../modules/user";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


function AdminCreateUser ({show, initiateAddUser, initiateEditUser, users, firstName, lastName, cancelEditUser
                              // role, authLevel, email, password
}) {
    const [email, setEmail] = useState('')
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [authLevel, setAuthLevel] = useState('')
    console.log("edit user")
    console.log(show)
    console.log(users)

    function handleSubmitCreateUser(e){
        e.preventDefault()
        console.log("btn clicked")

        if (users)
            initiateEditUser(...users, firstName, lastName, role, authLevel, email, password)
        else
         initiateAddUser({
            id: Math.floor(Math.random() * 9999),
            firstName: fname,
            lastName: lname,
            role: role,
            authLevel:authLevel,
            email: email,
            password: password
        })
        console.log(users)
    }
    return (
        <Modal show={show} onHide={cancelEditUser}>
        <Form className={'m-3'} onSubmit={handleSubmitCreateUser}>
            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name"
                              onChange={event => setFName(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name"
                              onChange={event => setLName(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" placeholder="Enter team member role"
                              onChange={event => setRole(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="authLevel">
                <Form.Label>Auth Level</Form.Label>
                <Form.Control type="text" placeholder="Enter their access level"
                              onChange={event => setAuthLevel(event.target.value)}/>
                <Form.Text className="text-muted">
                   '1' for Consumer, '2' for Business Owner, '3' for Admin.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                              onChange={event => setEmail(event.target.value)}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                              onChange={event => setPassword(event.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </Modal>
    );
}

function mapStateToProps(state) {
    return {
        show: state.userReducer.showEditUser,
        users: state.userReducer.users

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddUser, initiateEditUser, cancelEditUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCreateUser)
