import {initiateAddProduct} from "../../modules/shopkeeper";
import {Button, Form, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function ShopkeeperNewProduct({showNewProduct, setShowNewProduct, initiateAddProduct, handleAddProduct}) {
    function handleClose() {
        setShowNewProduct(false)
    }

    function handleSubmit(event) {
        event.preventDefault()
        handleClose()
        const productName = document.getElementById('productName').value
        // const categories = document.getElementById('categories').value
        const productDescription = document.getElementById('productDescription').value
        const brand = document.getElementById('brand').value
        // const unitPrice = document.getElementById('unitPrice').value
        // const unitsInStock = document.getElementById('unitsInStock').value
        const size = document.getElementById('size').value
        const color = document.getElementById('color').value
        const productAvailable = document.getElementById('productAvailable').value
        const discontinued = document.getElementById('discontinued').value
        const discountAvailable = document.getElementById('discountAvailable').value
        const picture = document.getElementById('picture').value
        // const dateReceived = document.getElementById('dateReceived').value
        // const unitsReceived = document.getElementById('unitsReceived').value

        const newProduct = {
            id: Math.random() * 9999999 + 100,
            productName,
            // categories,
            productDescription,
            brand,
            // unitPrice,
            // unitsInStock,
            size,
            color,
            productAvailable,
            discontinued,
            discountAvailable,
            picture,
            // dateReceived,
            // unitsReceived
        }

        handleAddProduct(newProduct)
        initiateAddProduct(newProduct)
        console.log('what up')

    }

    return <Modal show={showNewProduct} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create New Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type='productName' placeholder='Product Name' id='productName'/>
                    {/*<Form.Label>Categories</Form.Label>*/}
                    {/*<Form.Control type='categories' as='select' id='categories'>*/}
                    {/*    <option value={10}>Video Games</option>*/}
                    {/*    <option value={3}>Electronics</option>*/}
                    {/*    <option value={2}>Entertainment</option>*/}
                    {/*</Form.Control>*/}
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control type='productDescription' placeholder='Product Description' id='productDescription'/>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='brand' placeholder='Brand' id='brand'/>
                    {/*<Form.Label>Unit Price</Form.Label>*/}
                    {/*<Form.Control type='number' step='.01' placeholder='Unit Price' id='unitPrice'/>*/}
                    {/*<Form.Label>Units In Stock</Form.Label>*/}
                    {/*<Form.Control type='number' placeholder='Units In Stock' id='unitsInStock'/>*/}
                    <Form.Label>Size</Form.Label>
                    <Form.Control type='size' placeholder='Size' id='size'/>
                    <Form.Label>Color</Form.Label>
                    <Form.Control type='color' placeholder='Color' id='color'/>
                    <Form.Label>Product Available</Form.Label>
                    <Form.Control type='date' id='productAvailable'/>
                    <Form.Label>Discontinued</Form.Label>
                    <Form.Control type='discontinued' as='select' id='discontinued'>
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                    </Form.Control>
                    <Form.Label>Discount Available</Form.Label>
                    <Form.Control type='discountAvailable' as='select' id='discountAvailable'>
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                    </Form.Control>
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type='img' id='picture'/>
                    {/*<Form.Label>Date Received</Form.Label>*/}
                    {/*<Form.Control type='date'  id='dateReceived'/>*/}
                    {/*<Form.Label>Units Received</Form.Label>*/}
                    {/*<Form.Control type='number' placeholder='Units Received' id='unitsReceived'/>*/}
                </Form.Group>
                <Button variant='primary' type='submit'>Create</Button>
            </Form>

        </Modal.Body>
    </Modal>
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddProduct}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(ShopkeeperNewProduct)