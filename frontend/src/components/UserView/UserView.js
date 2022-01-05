import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";

function UserView({user}) {

    return <>
        <Container>
            <Row>

            </Row>
            <Row>
                <h2>Welcome back, {user.firstName}!</h2>
                <Card style={{width: '25rem', padding: '1px'}}>
                    <Card.Body>
                        <Card.Title>My Info</Card.Title>
                        <Card.Text>
                            {user.firstName} {user.lastName}
                        </Card.Text>
                        <Card.Text>
                            {user.email}
                        </Card.Text>
                        <Card.Text></Card.Text>
                        <Row>
                            <Col>
                                <Button size='sm' variant="primary">Edit</Button>
                            </Col>
                            <Col xs='auto'>
                                <Button size='sm' variant='outline-danger'>Delete My Account</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.loggedInUser
    }
}

export default connect(mapStateToProps)(UserView);