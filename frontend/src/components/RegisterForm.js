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
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [password, setPassword] = useState('')


    function handleSubmitRegister(e) {
        e.preventDefault()

        initiateAddUser({
            email: email,
            password: password
        })
        const registered = document.getElementById("registered")
        registered.classList.remove("hide")
    }

    if (registerErrorOccurred) {

        return <>
            <Col sm={6}>
                <Alert variant="danger"> An account with this email address already exists! </Alert>
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
                                <Form.Group className="mb-3">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter first name"
                                                  onChange={event => setFName(event.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name"
                                                  onChange={event => setLName(event.target.value)}/>
                                </Form.Group>

                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={event => setEmail(event.target.value)}required />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
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
        registerErrorOccurred: state.userReducer.registerErrorOccurred
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddUser}, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);
