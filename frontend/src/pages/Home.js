import Products from "../components/ProductsView/Products";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {initiateGetAllProducts, unsetProduct} from "../modules/products";
import {connect} from "react-redux/";

const Home = ({user}) => {
    const dispatch = useDispatch()

    console.log(user)

    useEffect(() => {
        dispatch(initiateGetAllProducts())
        dispatch(unsetProduct())
    }, [dispatch])

    return (
        <div>

            <h1>Home</h1>
            <Products/>
        </div>

    )

};

export default Home;