import {initiateAddProduct} from "../../modules/shopkeeper";
import {Badge, Button, Form, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {useState} from "react";

function ShopkeeperNewProduct({showNewProduct, setShowNewProduct, initiateAddProduct, categories}) {
    const [productCategories, setProductCategories] = useState([])
    const [categorySelect, setCategorySelect] = useState({id: '', categoryName: ''})

    function handleClose() {
        setShowNewProduct(false)
    }

    function onChange(e) {
        const {value, selectedIndex} = e.target
        const {id} = e.target.options[selectedIndex]
        setCategorySelect({id: Number(id), categoryName: value})
    }

    function handleAdd() {
        setProductCategories([...productCategories, categorySelect])
    }

    function handleRemove() {
        setProductCategories(productCategories.filter(id => categorySelect.id !== id.id))
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
        const discountAvailable = document.getElementById('discountAvailable').value
        const picture = document.getElementById('picture').value
        const dateReceived = document.getElementById('dateReceived').value
        const unitsReceived = document.getElementById('unitsReceived').value

        const newCategories = productCategories.map(category => {return {id: category.id}})

        const newProduct = {
            productName,
            categories: newCategories,
            productDescription,
            brand,
            unitPrice,
            unitsInStock,
            size,
            color,
            productAvailable,
            discontinued,
            discountAvailable,
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
                <Form.Group className='mb-3'>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control required type='productName' placeholder='Product Name' id='productName'/>
                    <Form.Label>Categories</Form.Label>
                    <div className='mb-3'>{productCategories.map(category => <Badge key={category.id}>{category.categoryName}</Badge>)}</div>
                    <Form.Control type='categories' as='select'
                                  onChange={onChange}>
                        <option selected disabled hidden>Select Category</option>
                        {categories.map(category => <option key={category.id} id={category.id} value={category.categoryName}>{category.categoryName}</option>)}
                    </Form.Control>
                    <div><Button size='sm' onClick={() => handleAdd()}>Add</Button><Button size='sm' onClick={() => handleRemove()}>Remove</Button></div>
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control required type='productDescription' placeholder='Product Description' id='productDescription'/>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control required type='brand' placeholder='Brand' id='brand'/>
                    <Form.Label>Unit Price</Form.Label>
                    <Form.Control required type='number' step='.01' placeholder='Unit Price' id='unitPrice'/>
                    <Form.Label>Units In Stock</Form.Label>
                    <Form.Control required type='number' placeholder='Units In Stock' id='unitsInStock'/>
                    <Form.Label>Size</Form.Label>
                    <Form.Control required type='size' placeholder='Size' id='size'/>
                    <Form.Label>Color</Form.Label>
                    <Form.Control required type='text' as='select' id='color'>
                        <option value="white" >White</option>
                        <option value="grey">Grey</option>
                        <option value="blue">Blue</option>
                        <option value="green" selected>Green</option>
                        <option value="yellow">Yellow</option>
                        <option value="orange">Orange</option>
                        <option value="red">Red</option>
                        <option value="purple">Purple</option>
                        <option value="gold">Gold</option>
                        <option value="silver">Silver</option>
                    </Form.Control>
                    <Form.Label>Product Available</Form.Label>
                    <Form.Control required type='date' id='productAvailable'/>
                    <Form.Label>Discontinued</Form.Label>
                    <Form.Control required type='discontinued' as='select' id='discontinued'>
                        <option value={true}>True</option>
                        <option value={false} selected>False</option>
                    </Form.Control>
                    <Form.Label>Discount Available</Form.Label>
                    <Form.Control type='discountAvailable' as='select' id='discountAvailable'>
                        <option value={true}>True</option>
                        <option value={false} selected>False</option>
                    </Form.Control>
                    <Form.Label>Picture</Form.Label>
                    <Form.Control required type='img' id='picture'/>
                    <Form.Label>Date Received</Form.Label>
                    <Form.Control required type='date'  id='dateReceived'/>
                    <Form.Label>Units Received</Form.Label>
                    <Form.Control required type='number' placeholder='Units Received' id='unitsReceived'/>
                </Form.Group>
                <Button variant='primary' type='submit'>Create</Button>
            </Form>

        </Modal.Body>
    </Modal>
}

function mapStateToProps(state) {
    return {
        categories: state.shopkeeperReducer.categories
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddProduct}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopkeeperNewProduct)