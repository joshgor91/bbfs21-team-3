import Products from "../components/ProductsView/Products";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {initiateGetAllProducts, unsetProduct} from "../modules/products";
import {connect}from "react-redux";
import {initiateGetCartItems} from "../modules/cart";
import {Badge} from "react-bootstrap";


const Home = ({loggedInUser, isLoggedIn}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initiateGetAllProducts())
        dispatch(unsetProduct())
        dispatch(initiateGetCartItems())
    }, [])

    return (
        <div>
            {isLoggedIn &&
            <h1 id="welcome-message"> Welcome, {loggedInUser.firstName}!</h1>
            }
            <Products/>
        </div>

    )

};

function mapStateToProps(state) {
    return {
        product: state.productsReducer.productToView,
        cartItems: state.cartReducer.cartItems,
        loggedInUser: state.userReducer.loggedInUser,
        isLoggedIn: state.userReducer.isLoggedIn

    }
}

export default connect(mapStateToProps)(Home);