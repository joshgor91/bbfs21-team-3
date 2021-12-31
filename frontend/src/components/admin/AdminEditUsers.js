
import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {initiateAddUser, initiateEditUser, cancelEditUser, initiateGetUsers} from "../../modules/user";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


function AdminCreateUser ({show, initiateAddUser, initiateEditUser, initiateGetUsers, userToEdit, user, firstName, lastName, cancelEditUser
                              // role, authLevel, email, password
}) {
    useEffect(() => {
        if (userToEdit){
            // initiateEditUser({...user, firstName, lastName, role, authLevel, email, password})
            setEmail(userToEdit.email)
            setFName(userToEdit.firstName)
            setLName(userToEdit.lastName)
            setPassword(userToEdit.password)
            setRole(userToEdit.role)
            setAuthLevel(userToEdit.authLevel)
        }
    }, [])
    const [email, setEmail] = useState('')
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [authLevel, setAuthLevel] = useState('')
    console.log("edit user")
    console.log(show)
    console.log(user)

    function handleSubmitCreateUser(e){
        e.preventDefault()
        console.log("btn clicked")
        // console.log(user)
        // if (userToEdit){
        //     // initiateEditUser({...user, firstName, lastName, role, authLevel, email, password})
        //     setEmail(userToEdit.email)
        //     setFName(userToEdit.firstName)
        //     setLName(userToEdit.lastName)
        //     setPassword(userToEdit.password)
        //     setRole(userToEdit.role)
        //     setAuthLevel(userToEdit.authLevel)
        // }

        // else
         initiateAddUser({
            id: Math.floor(Math.random() * 9999),
            fname,
            lname,
            role,
            authLevel,
            email,
            password
        })
        console.log(user)

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
        user: state.userReducer.users,
        firstName: state.userReducer.firstName,
        lastName: state.userReducer.lastName,
        role: state.userReducer.role,
        authLevel: state.userReducer.authLevel,
        email: state.userReducer.email,
        password: state.userReducer.password,
        userToEdit: state.userReducer.userToEdit


    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddUser, initiateEditUser, cancelEditUser, initiateGetUsers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCreateUser)
