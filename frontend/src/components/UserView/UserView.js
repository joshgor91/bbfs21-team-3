import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import UserInfo from "./UserInfo";
import {clearUserInfo, setUserInfo} from "../../modules/user";

function UserView({user, userInfo, showInfo}) {
    const dispatch = useDispatch()
    console.log(showInfo)

    return <>
        <Container>
            <Row>

                <Card style={{width: '25rem', padding: '1px'}}>
                    <Card.Body>
                        <Card.Header><h2>Welcome back, {user.firstName}!</h2></Card.Header>
                        <Card.Title  style={{marginTop: '.5em'}}>{user.firstName} {user.lastName}</Card.Title>
                        <Card.Text>
                            {user.email}
                        </Card.Text>
                        <Row>
                            <Col>
                                {!showInfo ?
                                    <Button size='sm' variant="outline-secondary" onClick={() => dispatch(setUserInfo(user))}>
                                        Manage My Account
                                    </Button>
                                    :
                                    <Button size='sm' variant="outline-secondary" onClick={() =>  dispatch(clearUserInfo())}>
                                        I'm Done
                                    </Button>}
                            </Col>
                            <Col xs='auto'>
                                <Button size='sm' variant='outline-danger'>
                                    Delete My Account
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
            <Row>

                <UserInfo user={user} userInfo={userInfo}/>
            </Row>
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.loggedInUser,
        userInfo: state.userReducer.userinfo,
        showInfo: state.userReducer.showInfo
    }
}

export default connect(mapStateToProps)(UserView);