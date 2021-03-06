import ShopkeeperProduct from "./ShopkeeperProduct";
import ShopkeeperEditProduct from "./ShopkeeperEditProduct";
import {Row} from "react-bootstrap";
import {connect} from "react-redux";

function ShopkeeperProductList({products}) {
    return <>
        <ShopkeeperEditProduct/>
        <Row>
            {products.map(product => <ShopkeeperProduct key={product.id}
                                                        product={product}
            />)}
        </Row>
    </>
}

function mapStateToProps(state) {
    return {
        products: state.shopkeeperReducer.products,
        categories: state.shopkeeperReducer.categories
    }
}

export default connect(mapStateToProps)(ShopkeeperProductList)