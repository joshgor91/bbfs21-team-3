import Products from "../components/ProductsView/Products";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {initiateGetAllProducts, unsetProduct} from "../modules/products";
import {connect}from "react-redux";
import {initiateGetCartItems} from "../modules/cart";
import {Badge} from "react-bootstrap";


const Home = () => {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(initiateGetAllProducts())
        dispatch(unsetProduct())
        dispatch(initiateGetCartItems())
    }, [])

    return (
        <div>

            <h1>Home</h1>
            <Products/>
        </div>

    )

};

function mapStateToProps(state) {
    return {
        product: state.productsReducer.productToView,
        cartItems: state.cartReducer.cartItems
    }
}

export default connect(mapStateToProps)(Home);