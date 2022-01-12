import {Button, Stack, Table} from "react-bootstrap"
import {editProduct, initiateDeleteProduct, viewProductDetails} from "../../modules/shopkeeper"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import ShopkeeperEditProduct from "./ShopkeeperEditProduct"
import ShopkeeperProduct from "./ShopkeeperProduct";
import {useEffect, useState} from "react";
import moment from "moment";
import {discountPrice, minAdPrice, sellPrice} from "../../utils/priceUtils";

const initialSalePriceForm = {
    price: '',
    effectiveDate: ''
}

const initialSalesForm = {
    salesPrice: '',
    saleStartDate: '',
    saleEndDate: '',
    discount: '',
    saleDescription: ''
}

const initialMinAdPriceForm = {
    effectiveDate: '',
    price: ''
}

function ShopkeeperProductTable({products, hide, editProduct, initiateDeleteProduct, viewProductDetails}) {
    const tHead = ['ID', 'Product Name', 'Brand', 'Unit Price', 'Units in Stock', 'Units Received', 'Product Available', 'Details', 'Edit/Delete']
    const [showProductDetails, setShowProductDetails] = useState(false)
    const [salePrice, setSalePrice] = useState(initialSalePriceForm)
    const [newSales, setNewSales] = useState(initialSalesForm)
    const [minAdPrice, setMinAdPrice] = useState(initialMinAdPriceForm)

    function handleViewDetails(product) {
        viewProductDetails(product)
        setShowProductDetails(true)
    }

    return <>
            <ShopkeeperEditProduct
                salePrice={salePrice}
                setSalePrice={setSalePrice}
                newSales={newSales}
                setNewSales={setNewSales}
                minAdPrice={minAdPrice}
                setMinAdPrice={setMinAdPrice}
            />
        {showProductDetails ? <ShopkeeperProduct/> : <></>}


        <Table striped bordered responsive hidden={hide}>
            <thead>
            <tr>
                {tHead.map((tHead, index) => (
                    <th key={index}>{tHead}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {products.map((product, index) => (
                <tr key={index}>
                    <td >{product.id}</td>
                    <td >{product.productName}</td>
                    <td >{product.brand}</td>
                    <td >{product.unitPrice}</td>
                    <td >{product.unitsInStock}</td>
                    <td >{product.unitsReceived}</td>
                    <td >{moment(product.productAvailable).format('llll')}</td>
                    <td><Button className={'m-1'} variant="secondary" onClick={() => handleViewDetails(product)}>Details</Button></td>
                    <td>
                        <Stack>
                            <Button className={'m-1'} variant="info" onClick={() => editProduct(product)}>Edit</Button>
                            <Button className={'m-1'} variant="danger" onClick={() => initiateDeleteProduct(product.id)}>Delete</Button>
                        </Stack>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    </>

}

function mapStateToProps(state){
    return {
        hide: state.shopkeeperReducer.hideTable,
        products: state.shopkeeperReducer.products

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({viewProductDetails, editProduct, initiateDeleteProduct}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopkeeperProductTable)