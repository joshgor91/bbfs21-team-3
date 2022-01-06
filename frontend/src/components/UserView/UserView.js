import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import UserInfo from "./UserInfo";
import {clearUserInfo, initiateDeleteUser, setUserInfo} from "../../modules/user";

function UserView({user, showInfo}) {
    const dispatch = useDispatch()


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
                                    <Button size='sm' variant="outline-secondary"
                                            onClick={() => dispatch(setUserInfo(user))}>
                                        Manage My Account
                                    </Button>
                                    :
                                    <Button size='sm' variant="outline-secondary"
                                            onClick={() => dispatch(clearUserInfo())}>
                                        I'm Done
                                    </Button>}
                            </Col>
                            <Col xs='auto'>
                                <Button size='sm' variant='outline-danger' onClick={() => dispatch(initiateDeleteUser(user.id))}>
                                    Delete My Account
                                </Button>
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
        showInfo: state.userReducer.showInfo
    }
}

export default connect(mapStateToProps)(UserView);