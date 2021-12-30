import {Button, Card} from "react-bootstrap";


function CartItems({cartItem}) {

    return <>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text></Card.Text>
                <Button variant="warning">Remove</Button>
            </Card.Body>
        </Card>
    </>
}

export default CartItems