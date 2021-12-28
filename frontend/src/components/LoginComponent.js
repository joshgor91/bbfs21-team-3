import {Form, Button} from 'react-bootstrap'
import {useState} from 'react'
import {initiateLogin} from "../modules/user"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


function LoginComponent({initiateLogin, loginPending}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        initiateLogin({username, password})
    }

    return<>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder='Enter Username' onChange={event => setUsername(event.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' onChange={event => setPassword(event.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Button type='submit' disabled={loginPending}>Login</Button>
            </Form.Group>
        </Form>
    </>
}

function mapStateToProps(state) {
    return {
        loginPending: state.loginPending // is it state.loginPending or state.userReducer.loginPending due to multiple modules
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateLogin}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

