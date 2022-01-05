import {Button, Stack, Table} from "react-bootstrap";
import {getProducts, initiateEditProduct, initiateDeleteProduct} from "../../modules/shopkeeper";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function ShopkeeperProductTable({products, hide, initiateEditProduct, initiateDeleteProduct}) {
    const tHead = ["ID", "Product Name", "Brand", "Unit Price", "Units in Stock", "Units Received", "Product Available", "Edit/Delete"]

    const handleEdit = product => event => {
        event.preventDefault()
        initiateEditProduct(product)

    }
    return (

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
                    <td>
                        <Stack>
                            <Button onClick={handleEdit(product)}>edit</Button>
                            <Button onClick={() => initiateDeleteProduct(product.id)}>Delete</Button>
                        </Stack>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

function mapStateToProps(state){
    return {
        hide: state.shopkeeperReducer.hideTable,
        products: state.shopkeeperReducer.products

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProducts, initiateEditProduct, initiateDeleteProduct}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopkeeperProductTable)