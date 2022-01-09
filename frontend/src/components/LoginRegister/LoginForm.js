import { Alert, Button, Col, Form} from "react-bootstrap";
import {useState} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {initiateLogin, loginFailure} from "../../modules/user";

function LoginForm({loginErrorOccurred, initiateLogin}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function handleSubmit(event) {
        event.preventDefault()
        initiateLogin({email, password})
    }


        return <>
                    <Form className="general-form" onSubmit={handleSubmit}>

                            <h1> Login </h1>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter email"
                                              onChange={event => setEmail(event.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                              onChange={event => setPassword(event.target.value)}/>
                            </Form.Group>

                            <Button className="login-register-button" type="submit">
                                Submit
                            </Button>

                    </Form>
            {loginErrorOccurred &&
            <Alert variant="danger"> Incorrect username or password! </Alert>
            }
        </>


}


function mapStateToProps(state) {
    return {
        loginErrorOccurred: state.userReducer.loginErrorOccurred,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateLogin, loginFailure}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)