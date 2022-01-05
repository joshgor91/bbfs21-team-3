import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {
    clearUserInfo,
    updateAddress1,
    updateAddress2,
    updateCity,
    updateState,
    updateZipcode
} from "../../modules/user";
import {useState} from "react";
import {connect, useDispatch} from "react-redux";
import {submitEditUser} from "../../modules/admin";

function UserInfo({user, userInfo, address1, address2, city, state, zipcode}) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)

    function submitEdit(e) {
        e.preventDefault()
        dispatch(submitEditUser({
            ...userInfo,
            address1,
            address2,
            city,
            state,
            zipcode
        }))
    }
    console.log(userInfo)
    return <>
        <Card style={{width: '25rem'}}>

            <Card.Body>
                <Row>
                    <Col>
                        <Card.Text>{user.firstName} {user.lastName}</Card.Text>
                    </Col>
                    <Col xs='auto'>
                        <Button size='sm' variant="outline-secondary" onClick={() => setShow(true)}>
                            Edit Info
                        </Button>
                    </Col>
                </Row>
                <Card.Text>{user.email}</Card.Text>
                {!show ? <Card.Text>{user.address1}</Card.Text>
                    :
                    <Form onSubmit={submitEdit}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text"
                                          placeholder="Address 1"
                                          value={address1}
                                          name='address1'
                                          onChange={event => dispatch(updateAddress1(event.target.value))}
                            />
                        </Form.Group>
                    </Form>}
                {!show ? <Card.Text>{user.address2}</Card.Text>
                :
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text"
                                      placeholder="Address 2"
                                      name='address2'
                                      value={address2}
                                      onChange={event => dispatch(updateAddress2(event.target.value))}
                        />
                    </Form.Group>
                </Form>}
                {!show ? <Card.Text>{user.city}</Card.Text>
                    :
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="text"
                                          placeholder="City"
                                          name='city'
                                          value={city}
                                          onChange={event => dispatch(updateCity(event.target.value))}
                            />
                        </Form.Group>
                    </Form>}
                {!show ? <Card.Text>{user.state}</Card.Text>
                    :
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text"
                                          placeholder="State"
                                          name='state'
                                          value={state}
                                          onChange={event => dispatch(updateState(event.target.value))}
                            />
                        </Form.Group>
                    </Form>}
                {!show ? <Card.Text>{user.zipcode}</Card.Text>
                    :
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="text"
                                          placeholder="Zipcode"
                                          name='zipcode'
                                          value={zipcode}
                                          onChange={event => dispatch(updateZipcode(event.target.value))}
                            />
                        </Form.Group>
                    </Form>}

            </Card.Body>
        </Card>
    </>
}

function mapStateToProps(state) {
    console.log(state)
    return {
        user: state.userReducer.loggedInUser,
        userInfo: state.userReducer.userInfo,
        address1: state.userReducer.address1,
        address2: state.userReducer.address2,
        city: state.userReducer.city,
        state: state.userReducer.state,
        zipcode: state.userReducer.zipcode,
    }
}

export default connect(mapStateToProps)(UserInfo)