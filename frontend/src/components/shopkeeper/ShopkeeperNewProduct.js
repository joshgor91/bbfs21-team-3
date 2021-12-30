import {initiateAddProduct} from "../../modules/shopkeeper";
import {Button, Form, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function ShopkeeperNewProduct({showNewProduct, setShowNewProduct, initiateAddProduct}) {
    function handleClose() {
        setShowNewProduct(false)
    }

    function handleSubmit(event) {
        event.preventDefault()
        handleClose()
        const productName = document.getElementById('productName').value
        const productDescription = document.getElementById('productDescription').value
        const brand = document.getElementById('brand').value
        const unitPrice = document.getElementById('unitPrice').value
        const unitsInStock = document.getElementById('unitsInStock').value
        const size = document.getElementById('size').value
        const color = document.getElementById('color').value
        const productAvailable = document.getElementById('productAvailable').value
        const discontinued = document.getElementById('discontinued').value
        const picture = document.getElementById('picture').value
        const dateReceived = document.getElementById('dateReceived').value
        const unitsReceived = document.getElementById('unitsReceived').value

        const newProduct = {
            id: Math.random() * 9999999 + 100,
            productName,
            productDescription,
            brand,
            unitPrice,
            unitsInStock,
            size,
            color,
            productAvailable,
            discontinued,
            picture,
            dateReceived,
            unitsReceived
        }

        initiateAddProduct(newProduct)

    }

    return <Modal show={showNewProduct} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create New Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type='text' placeholder='Product Name' id='productName'/>
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control type='text' placeholder='Product Description' id='productDescription'/>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' placeholder='Brand' id='brand'/>
                    <Form.Label>Unit Price</Form.Label>
                    <Form.Control type='float' placeholder='Unit Price' id='unitPrice'/>
                    <Form.Label>Units In Stock</Form.Label>
                    <Form.Control type='int' placeholder='Units In Stock' id='unitsInStock'/>
                    <Form.Label>Size</Form.Label>
                    <Form.Control type='text' placeholder='Size' id='size'/>
                    <Form.Label>Color</Form.Label>
                    <Form.Control type='text' placeholder='Color' id='color'/>
                    <Form.Label>Product Available</Form.Label>
                    <Form.Control type='date' placeholder='Product Available' id='productAvailable'/>
                    <Form.Label>Discontinued</Form.Label>
                    <Form.Control type='boolean' placeholder='Discontinued' id='discontinued'/>
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type='text' placeholder='Picture' id='picture'/>
                    <Form.Label>Date Received</Form.Label>
                    <Form.Control type='date' placeholder='Date Received' id='dateReceived'/>
                    <Form.Label>Units Received</Form.Label>
                    <Form.Control type='int' placeholder='Units Received' id='unitsReceived'/>
                </Form.Group>
            </Form>
            <Button variant='primary' type='submit'>Create</Button>
        </Modal.Body>
    </Modal>
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddProduct}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(ShopkeeperNewProduct)