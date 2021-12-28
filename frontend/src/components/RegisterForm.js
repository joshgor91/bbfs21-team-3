import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {connect} from "react-redux";
import {initiateCreateUser} from "../modules/register";
import {bindActionCreators} from "redux";


function RegisterForm({initiateCreateUser}){

    const [email, setEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');

    function onSignUp(event){
        event.preventDefault()
        console.log('register working')
        initiateCreateUser({email, username: newUsername, password: newUserPassword})
    }

    return<>
        <Form onSubmit={onSignUp}>
            <div>REGISTER NEW USER</div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={event => setEmail(event.target.value)} required />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type='username'  placeholder="Enter Username" onChange={event => setNewUsername(event.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder="Password" onChange={event => setNewUserPassword(event.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            </Form.Group>
            <Button variant="dark" type="submit">Sign Up</Button>
        </Form>
    </>

}


// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({initiateCreateUser}, dispatch)
// }
//
//
// export default connect(undefined, mapDispatchToProps)(RegisterForm)

export default RegisterForm