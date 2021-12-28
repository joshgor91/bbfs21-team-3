import {Accordion, Alert, Button, Col, Form} from "react-bootstrap";
import {useState} from "react";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import {initiateAddUser} from "../modules/user";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import '../styles/register.css'




function RegisterForm({initiateAddUser, registerErrorOccurred}) {


    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    function handleSubmitRegister(e) {
        e.preventDefault()

        initiateAddUser({
            email: email,
            username: username,
            password: password
        })
        const registered = document.getElementById("registered")
        registered.classList.remove("hide")
    }

    if (registerErrorOccurred) {

        return <>
            <Col sm={6}>
                <Alert variant="danger"> Username already exists! </Alert>
            </Col>
        </>
    } else {

        return <>
            <Col sm={6}>
                <Accordion>
                    <Form className="register-form" onSubmit={handleSubmitRegister}>
                        <AccordionHeader>
                            <h1>Register</h1>
                        </AccordionHeader>
                        <AccordionBody>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={event => setEmail(event.target.value)}required />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username"
                                              onChange={event => setUsername(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                              onChange={event => setPassword(event.target.value)}/>
                            </Form.Group>

                            <Button variant="light" type="submit">
                                Submit
                            </Button>
                        </AccordionBody>

                    </Form>
                </Accordion>
                <Alert className="hide" id="registered" variant="success"> You are registered! </Alert>
            </Col>
        </>
    }
}
function mapStateToProps(state){
    return {
        users: state.userReducer.users,
        registerErrorOccurred: state.registerReducer.registerErrorOccurred
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddUser}, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);
