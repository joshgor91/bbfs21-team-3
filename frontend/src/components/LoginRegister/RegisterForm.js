import {Alert, Button, Col, Form, Toast, ToastContainer} from "react-bootstrap";
import {useEffect, useState} from "react";
import {initiateRegisterUser} from "../../modules/user";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import './register.css'




function RegisterForm({initiateRegisterUser, registerErrorOccurred, addUserSuccess}) {


    const [email, setEmail] = useState('')
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleCloseTimed = () => setTimeout(() => {
        handleClose()
    }, 1000);


    function handleSubmitRegister(e) {
        e.preventDefault()

        initiateRegisterUser({
            firstName: fname,
            lastName: lname,
            email: email,
            password: password
        })

        if(registerErrorOccurred) {
            handleShow()
            handleCloseTimed()
        }
    }


        return <>
            <Col>
                <Form className="general-form" onSubmit={handleSubmitRegister}>

                            <h1>Register</h1>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Group className="mb-3">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter first name"
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
                                <Form.Control required type="password" placeholder="Password"
                                              onChange={event => setPassword(event.target.value)}/>
                            </Form.Group>

                            <Button className="login-register-button" type="submit">
                                Register
                            </Button>


                    </Form>
                {show &&
                <Alert variant="danger"> Register error occurred </Alert>
                }
                {addUserSuccess &&
                <Alert variant="success"> You are registered! </Alert>
                }

            </Col>
        </>

}
function mapStateToProps(state){
    return {
        users: state.userReducer.users,
        registerErrorOccurred: state.userReducer.registerErrorOccurred,
        addUserSuccess: state.userReducer.addUserSuccess,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateRegisterUser}, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);
