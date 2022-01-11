import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {
    clearUserInfo, initiateEditUserInfo,
    updateAddress1,
    updateAddress2,
    updateCity, updatePassword,
    updateState,
    updateZipcode
} from "../../modules/user";
import {useState} from "react";
import {connect, useDispatch} from "react-redux";

function UserInfo({user, userInfo, password, address1, address2, city, state, zipcode}) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [showPassword, setShowPassword] = useState(false)



    function submitEdit(event) {
        event.preventDefault()
        if (!password)
            password = userInfo.password
        if (!address1)
            address1 = userInfo.address1
        if (!address2)
            address2 = userInfo.address2
        if (!city)
            city = userInfo.city
        if (!state)
            state = userInfo.state
        if (!zipcode)
            zipcode = userInfo.zipcode

        dispatch(initiateEditUserInfo({
            ...userInfo,
            password,
            address1,
            address2,
            city,
            state,
            zipcode
        }))
        setShow(false)
        setShowPassword(false)
    }

    return <>
        <Card style={{width: '25rem'}}>

            <Card.Body>
                <Row>
                    <Col>
                        <Card.Text>{user.firstName} {user.lastName}</Card.Text>
                    </Col>
                    <Col xs='auto'>
                        {show ?
                            <Button size='sm' variant="outline-secondary" onClick={() => {
                                setShow(false)
                                setShowPassword(false)
                            }}>
                                Cancel Edit
                            </Button>
                            :
                            <Button size='sm' variant="outline-secondary" onClick={() => setShow(true)}>
                                Edit Info
                            </Button>}
                    </Col>
                </Row>
                <Card.Text>{user.email}</Card.Text>
                <Form onSubmit={submitEdit}>
                    <Row>
                        {!show && <Card.Text>Password ************</Card.Text>}
                        {show && <Button variant="info" onClick={() => setShowPassword(true)}>
                            Change Password
                        </Button>}
                        <hr/>
                        {showPassword &&
                            <Form.Group className="mb-3">
                                <Form.Control type="password"
                                              placeholder='Enter new password'
                                              value={password}
                                              name='password'
                                              onChange={event => dispatch(updatePassword(event.target.value))}
                                />
                            </Form.Group>}
                    </Row>
                    <Row>
                        {!show ? <Card.Text>{user.address1}</Card.Text>
                            :

                            <Form.Group className="mb-3">
                                <Form.Control type="text"
                                              placeholder={userInfo.address1 ? userInfo.address1 : "Address 1"}
                                              value={address1}
                                              name='address1'
                                              onChange={event => dispatch(updateAddress1(event.target.value))}
                                />
                            </Form.Group>}
                    </Row>
                    <Row>
                        {!show ? <Card.Text>{user.address2}</Card.Text>
                            :
                            <Form.Group className="mb-3">
                                <Form.Control type="text"
                                              placeholder={userInfo.address2 ? userInfo.address2 : "Address 2"}
                                              name='address2'
                                              value={address2}
                                              onChange={event => dispatch(updateAddress2(event.target.value))}
                                />
                            </Form.Group>}
                    </Row>
                    <Row>
                        {!show ? <Card.Text>{user.city} {user.state} {user.zipcode}</Card.Text>
                            :
                            <Form.Group className="mb-3">
                                <Form.Control type="text"
                                              placeholder={userInfo.city ? userInfo.city : "City"}
                                              name='city'
                                              value={city}
                                              onChange={event => dispatch(updateCity(event.target.value))}
                                />
                            </Form.Group>}
                    </Row>
                    <Row>
                        {show &&
                        <Form.Group className="mb-3">
                            <Form.Control type="text"
                                          placeholder={userInfo.state ? userInfo.state : "State"}
                                          name='state'
                                          value={state}
                                          onChange={event => dispatch(updateState(event.target.value))}
                            />
                        </Form.Group>}
                    </Row>
                    <Row>
                        <Col>
                            {show &&
                            <Form.Group className="mb-3">
                                <Form.Control type="text"
                                              placeholder={userInfo.zipcode ? userInfo.zipcode : "Zipcode"}
                                              name='zipcode'
                                              value={zipcode}
                                              onChange={event => dispatch(updateZipcode(event.target.value))}
                                />
                            </Form.Group>}
                        </Col>
                        <Col xs='auto'>
                            {show &&
                            <Button size='sm' variant="outline-warning" type="submit">
                                Save Edit
                            </Button>}
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    </>
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.loggedInUser,
        userInfo: state.userReducer.userInfo,
        password: state.userReducer.password,
        address1: state.userReducer.address1,
        address2: state.userReducer.address2,
        city: state.userReducer.city,
        state: state.userReducer.state,
        zipcode: state.userReducer.zipcode,
    }
}

export default connect(mapStateToProps)(UserInfo)