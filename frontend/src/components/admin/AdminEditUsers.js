import {Button, Form, Modal} from "react-bootstrap";
import {cancelEditUser, submitEditUser, initiateAddUser, initiateGetUsers} from "../../modules/admin"
import {bindActionCreators} from "redux";
import {connect, useDispatch} from "react-redux";
import {useEffect} from "react";

const initialUserForm = {
    id: null,
    firstName: '',
    lastName: '',
    role: '',
    authLevel: '',
    email: '',
    password: '',
}

function AdminCreateUser({
                             userForm,
                             setUserForm,
                             show,
                             initiateAddUser,
                             initiateGetUsers,
                             cancelEditUser,
                             submitEditUser,
                             isEditing,
                             userToEdit,
                             loggedInUser
                         }) {


    function handleSubmitCreateUser(e) {
        // console.log("calling userFrom " + {userForm})
        e.preventDefault()
        // console.log(userForm)
        if (isEditing) {
            submitEditUser({...userForm})
        } else {
            initiateAddUser({...userForm})
            initiateGetUsers()
            console.log("authlevel", userForm.authLevel)
        }
        setUserForm(initialUserForm)
    }



    function onChange(e) {
        const {name, value} = e.target
        setUserForm({
            ...userForm,
            [name]: value
        })
    }


    function onHide() {
        cancelEditUser()
        setUserForm(initialUserForm)
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? "Edit User" : "Create User"} </Modal.Title>
            </Modal.Header>
            <Form className={'m-3'} onSubmit={handleSubmitCreateUser}>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter first name"
                                  value={userForm.firstName}
                                  name="firstName"
                                  onChange={onChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required type="text" placeholder="Enter last name"
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
                {(userToEdit === null || userToEdit.id !== loggedInUser.id) ?
                    <>
                        <Form.Label>Auth Level</Form.Label>
                        <Form.Control required type='text' as='select'
                                      defaultValue={isEditing ? userForm.authLevel : 1}
                                      name="authLevel"
                                      onChange={onChange}>
                    <option value="" selected >Select a level</option>
                            <option value={1} >1</option>
                            <option value={2}>2</option>
                            <option value={3} >3</option>
                        </Form.Control>
                        <Form.Text className="text-muted">
                            '1' for Consumer, '2' for Business Owner, '3' for Admin.
                        </Form.Text>
                    </>
                    : <></>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email"
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
                    <Form.Control required type="password" placeholder="Password"
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
        show: state.adminReducer.showEditUser,
        user: state.adminReducer.users,
        firstName: state.adminReducer.firstName,
        lastName: state.adminReducer.lastName,
        role: state.adminReducer.role,
        authLevel: state.adminReducer.authLevel,
        email: state.adminReducer.email,
        password: state.adminReducer.password,
        userToEdit: state.adminReducer.userToEdit,
        isEditing: state.adminReducer.isEditing,
        loggedInUser: state.userReducer.loggedInUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddUser, cancelEditUser, initiateGetUsers, submitEditUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCreateUser)
