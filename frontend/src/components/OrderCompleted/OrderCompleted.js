import {Button, Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

function OrderCompleted({isLoggedIn}) {


  return(
      <Container fluid>
      <h1 id="order-complete-h1" className="order-complete">Order Complete!</h1>
      <Row>
          <h3 className="order-complete">Thank you for shopping at   <img className="order-complete-logo" src="https://i.ibb.co/zWMxYXP/betterbuy-copy.png" alt="betterbuy"/></h3>
      </Row>
          {isLoggedIn &&
              <div className="order-complete">
                  <Button variant="dark"><Link to="/myaccount" id="my-account-link">Go To My Account</Link></Button>
              </div>
             }
      </Container>
  )
}


function mapStateToProps(state) {
    return {
        isLoggedIn: state.userReducer.isLoggedIn,
    }
}

export default connect(mapStateToProps)(OrderCompleted)