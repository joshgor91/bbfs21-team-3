import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {initiateRegister} from "redux";
import {connect} from "react-redux";

function Register({initiateRegister}){

    const [email, setEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');

    function onSignUp(event){
        event.preventDefault()
        console.log('register working')
        createUser({email, username: newUsername, password: newUserPassword})
    }

    return<>
        <Form onSubmit={onSignUp}><br/><br/><br/>
            <div>REGISTER NEW USER</div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={event => setEmail(event.target.value)}required />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type='username'  placeholder="Enter Username" onChange={event => setNewUsername(event.target.value)}required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder="Password" onChange={event => setNewUserPassword(event.target.value)}required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            </Form.Group>
            <Button variant="dark" type="submit">Sign Up</Button>
        </Form>
    </>

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateLogin, createUser}, dispatch)
}


export default connect(undefined, mapDispatchToProps)(Login)