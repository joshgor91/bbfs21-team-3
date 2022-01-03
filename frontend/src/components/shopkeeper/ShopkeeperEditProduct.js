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
    updateUnitsReceived
} from "../../modules/shopkeeper";
import {Button, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";

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
                                   picture,
                                   dateReceived,
                                   unitsReceived,
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
                                   updateUnitsReceived
                               }) {

    function handleSubmit(event) {
        event.preventDefault()

        if (product)
            initiateEditProduct({
                ...product,
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
                picture,
                dateReceived,
                unitsReceived
            })
        else
            initiateAddProduct({
                id: Math.floor(Math.random() * 9999999),
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
            {/*<Form.Control type='categories' as='select' */}
            {/*              onChange={event => updateProductName(event.target.value)}>*/}
            {/*    <option value={10}>Video Games</option>*/}
            {/*    <option value={3}>Electronics</option>*/}
            {/*    <option value={2}>Entertainment</option>*/}
            {/*</Form.Control>*/}
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
            <Form.Control type='discontinued' as='select' defaultValue={false}
                          onChange={event => updateDiscontinued(event.target.value)}>
                <option value={true}>True</option>
                <option value={false}>False</option>
            </Form.Control>
            <Form.Label>Discount Available</Form.Label>
            <Form.Control type='discountAvailable' as='select' defaultValue={false}
                          onChange={event => updateDiscontinued(event.target.value)}>
                <option value={true}>True</option>
                <option value={false}>False</option>
            </Form.Control>

            <Form.Label>Picture</Form.Label>
            <Form.Control type='file' value={picture} onChange={event => updatePicture(event.target.value)}/>
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
        productToEdit: state.shopkeeperReducer.productToEdit,
        productName: state.shopkeeperReducer.productName,
        productDescription: state.shopkeeperReducer.productDescription,
        brand: state.shopkeeperReducer.brand,
        unitPrice: state.shopkeeperReducer.unit,
        unitsInStock: state.shopkeeperReducer.productName,
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
        updatePicture,
        updateDateReceived,
        updateUnitsReceived
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(ShopkeeperEditProduct)