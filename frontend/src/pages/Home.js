import NavBar from "../components/NavBar";
import Products from "../components/ProductsView/Products";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {initiateGetAllProducts, unsetProduct} from "../modules/products";

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initiateGetAllProducts())
        dispatch(unsetProduct())
    }, [dispatch])

    return (
        <>
            <h1>Home</h1>
            <Products/>
        </>

    )

};

export default Home;