import {Button, Col, Form} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect, useDispatch} from "react-redux";
import {
    initiateEditUserInfo,
    updateAddress1,
    updateAddress2,
    updateCity,
    updateState,
    updateZipcode
} from "../../modules/user";
import {initiateAddOrder, initiateGuestOrder} from "../../modules/order";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {disableGuestEmailField} from "../../modules/guest";

function CheckoutForm({
                          isLoggedIn,
                          loggedInUser,
                          address1,
                          address2,
                          city,
                          state,
                          zipcode,
                          initiateEditUserInfo,
                          updateAddress1,
                          updateAddress2,
                          updateCity,
                          updateState,
                          updateZipcode,
                          initiateAddOrder,
                          goToReceipt,
                          initiateGuestOrder,
                          guestEmail,
                          disableEmail,
                          guestTotal
                      }) {

    const navigate = useNavigate()
    const [email, setEmail] = useState(guestEmail)

    const dispatch = useDispatch()
    useEffect(() => {
        if (goToReceipt) {
            navigate("/cart/orderconfirmation")
        }
    }, [goToReceipt]);


    function handleSubmit(event) {
        event.preventDefault()
        dispatch(disableGuestEmailField(false))
        if (!isLoggedIn) {
            initiateGuestOrder(email, guestTotal)
        } else {
            initiateEditUserInfo(
                {
                    ...loggedInUser,
                    address1,
                    address2,
                    city,
                    state,
                    zipcode
                })
            initiateAddOrder()
        }

    }

    return (
        <Form className="general-form" onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicAddress">
                {!isLoggedIn &&
                    <>
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="text" placeholder="Email" value={email} disabled={disableEmail}
                                      onChange={(event) => setEmail(event.target.value)}/>
                    </>
                    /*:
                    <>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder={guestEmail} value={guestEmail} disabled={true}/>
                    </>*/}
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text required" placeholder="Address" value={address1}
                              defaultValue={loggedInUser.address1}
                              onChange={event => updateAddress1(event.target.value)}/>
                <Form.Label>Address 2</Form.Label>
                <Form.Control type="text" placeholder="Address 2" value={address2} defaultValue={loggedInUser.address2}
                              onChange={event => updateAddress2(event.target.value)}/>
                <Form.Label>City</Form.Label>
                <Form.Control required type="text required" placeholder="City" value={city}
                              defaultValue={loggedInUser.city} onChange={event => updateCity(event.target.value)}/>
                <Form.Label>State</Form.Label>
                <Form.Control required type="text required" placeholder="State" value={state}
                              defaultValue={loggedInUser.state} onChange={event => updateState(event.target.value)}/>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control required type="text required" placeholder="Zip Code" value={zipcode}
                              defaultValue={loggedInUser.zipcode}
                              onChange={event => updateZipcode(event.target.value)}/>
            </Form.Group>

            <Col><Button variant="warning" type="submit">Checkout</Button></Col>
        </Form>

    )
}


function mapStateToProps(state) {
    return {
        address1: state.userReducer.address1,
        address2: state.userReducer.address2,
        city: state.userReducer.city,
        state: state.userReducer.state,
        zipcode: state.userReducer.zipcode,
        loggedInUser: state.userReducer.loggedInUser,
        goToReceipt: state.orderReducer.goToReceipt,
        isLoggedIn: state.userReducer.isLoggedIn,
        guestEmail: state.guestReducer.guestEmail,
        disableEmail: state.guestReducer.disableEmail,
        guestTotal: state.guestReducer.guestTotal
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        initiateEditUserInfo,
        updateAddress1,
        updateAddress2,
        updateCity,
        updateState,
        updateZipcode,
        initiateAddOrder,
        initiateGuestOrder
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)