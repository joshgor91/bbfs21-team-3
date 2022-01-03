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
        <div>

            <h1>Home</h1>
            <Products/>
        </div>

    )

};

export default Home;