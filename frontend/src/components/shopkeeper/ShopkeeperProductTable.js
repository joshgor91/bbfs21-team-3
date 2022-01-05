import {Button, Stack, Table} from "react-bootstrap"
import {editProduct, initiateDeleteProduct, viewProductDetails} from "../../modules/shopkeeper"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import ShopkeeperEditProduct from "./ShopkeeperEditProduct"
import ShopkeeperProduct from "./ShopkeeperProduct";


function ShopkeeperProductTable({products, hide, editProduct, initiateDeleteProduct, viewProductDetails}) {
    const tHead = ['ID', 'Product Name', 'Brand', 'Unit Price', 'Units in Stock', 'Units Received', 'Product Available', 'Details', 'Edit/Delete']


    return <>
            <ShopkeeperEditProduct/>
        <ShopkeeperProduct/>

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
                    <td >{product.productAvailable}</td>
                    <td><Button onClick={() => viewProductDetails(product)}>Details</Button></td>
                    <td>
                        <Stack>
                            <Button onClick={() => editProduct(product)}>edit</Button>
                            <Button onClick={() => initiateDeleteProduct(product.id)}>Delete</Button>
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