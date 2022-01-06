import {bindActionCreators} from "redux";
import {
    initiateAddProduct,
    initiateEditProduct,
    cancelEditProduct,
    updateProductName,
    updateProductDescription,
    updateBrand,
    updateUnitPrice,
    updateUnitsInStock,
    updateSize,
    updateColor,
    updateProductAvailable,
    updateDiscontinued,
    updatePicture,
    updateDateReceived,
    updateUnitsReceived,
    updateDiscountAvailable
} from "../../modules/shopkeeper";
import {Button, Form, Modal, Badge, ListGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {useEffect, useState} from "react";

function ShopkeeperEditProduct({
                                   show,
                                   product,
                                   productName,
                                   categories,
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
                                   unitsReceived,
                                   initiateEditProduct,
                                   cancelEditProduct,
                                   updateProductName,
                                   updateProductDescription,
                                   updateBrand,
                                   updateUnitPrice,
                                   updateUnitsInStock,
                                   updateSize,
                                   updateColor,
                                   updateProductAvailable,
                                   updateDiscontinued,
                                   updateDiscountAvailable,
                                   updatePicture,
                                   updateDateReceived,
                                   updateUnitsReceived
                               }) {
    const [productCategory, setProductCategory] = useState([])
    const [categorySelect, setCategorySelect] = useState({id: '', categoryName: ''})

    function onChange(e) {
        console.log(`logging e.target = ${e.target}`)
        const {value, selectedIndex} = e.target
        console.log(`logging selectedIndex`)
        const {id} = e.target.options[selectedIndex]
        setCategorySelect({id: Number(id), categoryName: value})
    }

    useEffect(() => {
        if (show)
        setProductCategory(product.categories)
    }, [show])

    function handleAdd() {
        if (categorySelect.categoryName === '') {
            console.log(`logging empty string`)
        } else {
            setProductCategory([...productCategory, categorySelect])
        }
    }

    function handleRemove() {
        setProductCategory(productCategory.filter(id => categorySelect.id !== id.id))
    }

    function handleSubmit(event) {
        event.preventDefault()

        initiateEditProduct({
            ...product,
            productName,
            categories: productCategory,
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
        })
    }

    return <Modal show={show} onHide={cancelEditProduct}>
        <Form onSubmit={handleSubmit}>
            <Form.Label>Product Name</Form.Label>
            <Form.Control type='productName' value={productName}
                          onChange={event => updateProductName(event.target.value)}/>
            <Form.Label>Categories</Form.Label>
            <div className='mb-3'>{productCategory.map(category => <Badge>{category.categoryName}</Badge>)}</div>
            <Form.Control type='categories' as='select'
                          onChange={onChange}>
                <option selected disabled hidden>Select Category</option>
                {categories.map(category => <option id={category.id} value={category.categoryName}>{category.categoryName}</option>)}
            </Form.Control>
            <div><Button size='sm' onClick={() => handleAdd()}>Add</Button><Button size='sm' onClick={() => handleRemove()}>Remove</Button></div>
            <Form.Label>Product Description</Form.Label>
            <Form.Control type='productDescription' value={productDescription}
                          onChange={event => updateProductDescription(event.target.value)}/>
            <Form.Label>Brand</Form.Label>
            <Form.Control type='brand' value={brand} onChange={event => updateBrand(event.target.value)}/>
            <Form.Label>Unit Price</Form.Label>
            <Form.Control type='number' step='.01' value={unitPrice}
                          onChange={event => updateUnitPrice(event.target.value)}/>
            <Form.Label>Units in Stock</Form.Label>
            <Form.Control type='number' value={unitsInStock}
                          onChange={event => updateUnitsInStock(event.target.value)}/>
            <Form.Label>Size</Form.Label>
            <Form.Control type='size' value={size} onChange={event => updateSize(event.target.value)}/>
            <Form.Label>Color</Form.Label>
            <Form.Control type='color' value={color} onChange={event => updateColor(event.target.value)}/>
            <Form.Label>Product Available</Form.Label>
            <Form.Control type='date' value={productAvailable}
                          onChange={event => updateProductAvailable(event.target.value)}/>
            <Form.Label>Discontinued</Form.Label>
            <Form.Control type='discontinued' as='select' value={discontinued}
                          onChange={event => updateDiscontinued(event.target.value)}>
                <option value=''>Undefined</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
            </Form.Control>
            <Form.Label>Discount Available</Form.Label>
            <Form.Control type='discountAvailable' as='select' value={discountAvailable}
                          onChange={event => updateDiscountAvailable(event.target.value)}>
                <option value=''>Undefined</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
            </Form.Control>

            <Form.Label>Picture</Form.Label>
            <Form.Control type='img' value={picture} onChange={event => updatePicture(event.target.value)}/>
            <Form.Label>Date Received</Form.Label>
            <Form.Control type='date' value={dateReceived}
                          onChange={event => updateDateReceived(event.target.value)}/>
            <Form.Label>Units Received</Form.Label>
            <Form.Control type='int' value={unitsReceived}
                          onChange={event => updateUnitsReceived(event.target.value)}/>
            <Button type='submit'>{product ? 'Apply' : 'Create'}</Button>
        </Form>
    </Modal>
}

function mapStateToProps(state) {
    return {
        show: state.shopkeeperReducer.showEditProduct,
        product: state.shopkeeperReducer.productToEdit,
        productName: state.shopkeeperReducer.productName,
        productDescription: state.shopkeeperReducer.productDescription,
        brand: state.shopkeeperReducer.brand,
        unitPrice: state.shopkeeperReducer.unitPrice,
        unitsInStock: state.shopkeeperReducer.unitsInStock,
        categories: state.shopkeeperReducer.categories,
        size: state.shopkeeperReducer.size,
        color: state.shopkeeperReducer.color,
        productAvailable: state.shopkeeperReducer.productAvailable,
        discontinued: state.shopkeeperReducer.discontinued,
        discountAvailable: state.shopkeeperReducer.discountAvailable,
        picture: state.shopkeeperReducer.picture,
        dateReceived: state.shopkeeperReducer.dateReceived,
        unitsReceived: state.shopkeeperReducer.unitsReceived
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        initiateAddProduct,
        initiateEditProduct,
        cancelEditProduct,
        updateProductName,
        updateProductDescription,
        updateBrand,
        updateUnitPrice,
        updateUnitsInStock,
        updateSize,
        updateColor,
        updateProductAvailable,
        updateDiscontinued,
        updateDiscountAvailable,
        updatePicture,
        updateDateReceived,
        updateUnitsReceived
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(ShopkeeperEditProduct)