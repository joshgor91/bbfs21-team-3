import NavBar from "../components/NavBar";
import Products from "../components/ProductsView/Products";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {initiateGetAllProducts} from "../modules/products";

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('on load')
        dispatch(initiateGetAllProducts())
    }, [])

    return (
        <>
            <h1>Home</h1>
            <Products/>
        </>

    )

};

export default Home;