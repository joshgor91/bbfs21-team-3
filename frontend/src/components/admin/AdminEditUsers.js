
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {bindActionCreators} from "redux";
import {initiateAddUser} from "../../modules/user";

    function EditUser({show, user, text, editUser, cancelCreateEditUser, updateUser}) {
        function handleSubmit(event) {
            event.preventDefault()

            if (user)
                initiateEditUser({...user, firstName, lastName, role, authLevel, email, password})


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
        }



    function handleSubmitCreateUser(e) {
        e.preventDefault()
        console.log("btn clicked")
    }
    return <Modal show={show}>
        <Form onSubmit={handleSubmit}>
            <Form.Label>Users</Form.Label>
            <Form.Control  type='text' value={text} onChange={event => updateUsers(event.target.value)}/>
            <Button  type='submit'>{user ? 'Apply' : 'Create'}</Button>
            <Button style={{marginLeft:"340px" }}  onClick={cancelCreateEditUsers}>Cancel</Button>
        </Form>
    </Modal>
}

function mapStateToProps(state) {
    return {
        show: state.showEditUser,
        user: state.userToEdit,
        text: state.text
        //firstname,
        // lastname
        //should we add initial state?
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({editUsers, cancelCreateEditIUsers, updateUsers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUsers)
