import {Form, Button} from 'react-bootstrap'
import {useState} from 'react'

export default function LoginComponent({initiateLogin, loginPending}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        initiateLogin({username, password})// LoginComponent side effect from Emeka
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