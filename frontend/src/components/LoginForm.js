import { Alert, Button, Col, Form} from "react-bootstrap";
import {useState} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {initiateLogin, loginFailure} from "../modules/user";

function LoginForm({error, initiateLogin}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function handleSubmit(event) {
        event.preventDefault()
        initiateLogin({email, password})
    }

    if (error) {
        console.log(error)

        return <>
                    <Form className="login-register-form" onSubmit={handleSubmit}>

                            <h1> Login </h1>


                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username"
                                              onChange={event => setEmail(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                              onChange={event => setPassword(event.target.value)}/>
                            </Form.Group>

                            <Button variant="light" type="submit">
                                Submit
                            </Button>

                    </Form>
                    <Alert variant="danger"> Incorrect username or password! </Alert>

        </>
    } else {

        return <>
            <Col>
                    <Form className="login-register-form" onSubmit={handleSubmit}>
                            <h1> Login </h1>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username"
                                              onChange={event => setEmail(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                              onChange={event => setPassword(event.target.value)}/>
                            </Form.Group>

                            <Button className="login-register-button" type="submit">
                                Login
                            </Button>

                    </Form>

            </Col>
        </>
    }
}


function mapStateToProps(state) {
    return {
        error: state.userReducer.loginErrorOccurred,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateLogin, loginFailure}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)