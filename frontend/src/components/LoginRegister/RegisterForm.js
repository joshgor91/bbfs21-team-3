import {Accordion, Alert, Button, Col, Form} from "react-bootstrap";
import {useState} from "react";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import {initiateRegisterUser} from "../../modules/user";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import '../../styles/register.css'




function RegisterForm({initiateRegisterUser, registerErrorOccurred}) {


    const [email, setEmail] = useState('')
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [password, setPassword] = useState('')


    function handleSubmitRegister(e) {
        e.preventDefault()

        initiateRegisterUser({
            firstName: fname,
            lastName: lname,
            email: email,
            password: password
        })
        const registered = document.getElementById("registered")
        registered.classList.remove("hide")
    }

    if (registerErrorOccurred) {

        return <>
                <Alert variant="danger"> Register error occured </Alert>
        </>
    } else {

        return <>
            <Col>
                <Form className="login-register-form" onSubmit={handleSubmitRegister}>

                            <h1>Register</h1>

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

                            <Button className="login-register-button" type="submit">
                                Register
                            </Button>


                    </Form>

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
    return bindActionCreators({initiateRegisterUser}, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);