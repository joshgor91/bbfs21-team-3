import {initiateGetAllProducts} from "../../modules/products";
import {useEffect} from "react";
import {useDispatch} from "react-redux";


function Products() {
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('on load')
        dispatch(initiateGetAllProducts())
    }, [])


    return(
        <>
        </>
    )
}

export default Products;