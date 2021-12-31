
import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {initiateAddUser, initiateEditUser, cancelEditUser, initiateGetUsers, submitEditUser} from "../../modules/user";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const initialUserForm = {
    id: null,
    firstName: '',
    lastName: '',
    role: '',
    authLevel: '',
    email: '',
    password: '',
}

function AdminCreateUser ({
                              userForm,
                              setUserForm,
                              show,
                              initiateAddUser,
                              initiateEditUser,
                              initiateGetUsers,
                              userToEdit,
                              user,
                              cancelEditUser,
                              submitEditUser
                              // role, authLevel, email, password
}) {

    function handleSubmitCreateUser(e){
        e.preventDefault()
        console.log("btn clicked")
        console.log(user)
        if (userToEdit){
            submitEditUser({...userForm})
        }
        else {
         initiateAddUser({
             ...userForm
        })
        console.log(userForm)
    }}

    function onChange(e) {
        const {name, value} = e.target
        setUserForm({
            ...userForm,
            [name]:value
        })
    }

    function onHide() {
        cancelEditUser()
        setUserForm(initialUserForm)
    }

    return (
        <Modal show={show} onHide={onHide}>
        <Form className={'m-3'} onSubmit={handleSubmitCreateUser}>
            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name"
                              value={userForm.firstName}
                              name="firstName"
                              onChange={onChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name"
                              value={userForm.lastName}
                              name="lastName"
                              onChange={onChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" placeholder="Enter team member role"
                              value={userForm.role}
                              name="role"
                              onChange={onChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="authLevel">
                <Form.Label>Auth Level</Form.Label>
                <Form.Control type="text" placeholder="Enter their access level"
                              value={userForm.authLevel}
                              name="authLevel"
                              onChange={onChange}/>
                <Form.Text className="text-muted">
                   '1' for Consumer, '2' for Business Owner, '3' for Admin.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                              value={userForm.email}
                              name="email"
                              onChange={onChange}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                              value={userForm.password}
                              name="password"
                              onChange={onChange}
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
    return bindActionCreators({initiateAddUser, initiateEditUser, cancelEditUser, initiateGetUsers, submitEditUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCreateUser)
