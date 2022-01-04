import ShopkeeperProduct from "./ShopkeeperProduct";
import ShopkeeperEditProduct from "./ShopkeeperEditProduct";
import {Row} from "react-bootstrap";
import {connect} from "react-redux";

function ShopkeeperProductList({products, deleteProduct}) {
    return <>
        <ShopkeeperEditProduct/>
        <Row>
            {products.map(product => <ShopkeeperProduct key={product.id} product={product} delete={deleteProduct}/>)}
        </Row>
    </>
}

function mapStateToProps(state) {
    return {
        products: state.productsReducer.products
    }
}

export default connect(mapStateToProps)(ShopkeeperProductList)