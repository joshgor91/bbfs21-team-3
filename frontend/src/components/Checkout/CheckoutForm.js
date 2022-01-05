import {Button, Col, Form} from "react-bootstrap";

function CheckoutForm() {


    function handleSubmit() {
//    here we will run a side effect that deletes all cart items + then saves order
    }

        return (
            <Form className="login-register-form">
                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text required" placeholder="Address"/>
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control type="text" placeholder="Address 2"/>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text required" placeholder="City"/>
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text required" placeholder="State"/>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="text required" placeholder="Zip Code"/>
                </Form.Group>

                <Col><Button variant="warning" onSubmit="handleSubmit">Checkout</Button></Col>
            </Form>

        )
    }



export default CheckoutForm;