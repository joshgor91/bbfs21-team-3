import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import UserInfo from "./UserInfo";
import {clearUserInfo, initiateDeleteUser, setUserInfo} from "../../modules/user";

function UserView({user, showInfo, userIsAdmin}) {
    const dispatch = useDispatch()

    function handleDeleteUser() {
        dispatch(initiateDeleteUser(user.id))
        window.location.reload(false)
    }

    return <>
        <Container>
            <Row>
                <Card style={{width: '25rem', padding: '1px'}}>
                    <Card.Body>
                        <Card.Header style={{marginBottom: '.5em'}}><h2>Welcome back, {user.firstName}!</h2>
                        </Card.Header>
                        <Row>
                            <Col>
                                {!showInfo ?
                                    <Button size='sm' className={'m-1'} variant="outline-secondary"
                                            onClick={() => dispatch(setUserInfo(user))}>
                                        Manage My Account
                                    </Button>
                                    :
                                    <Button size='sm' className={'m-1'} variant="outline-secondary"
                                            onClick={() => dispatch(clearUserInfo())}>
                                        I'm Done
                                    </Button>}
                            </Col>
                            <Col xs='auto'>

                                {userIsAdmin ? "" :
                                    <Button size='sm' className={'m-1'} variant='outline-danger'
                                            onClick={handleDeleteUser}>
                                        Delete My Account
                                    </Button>
                                }
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                {showInfo &&
                <UserInfo/>}
            </Row>
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.loggedInUser,
        showInfo: state.userReducer.showInfo,
        userIsAdmin: state.userReducer.userIsAdmin
    }
}

export default connect(mapStateToProps)(UserView);