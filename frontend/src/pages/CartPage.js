import Cart from "../components/Cart/Cart";
import {useDispatch} from "react-redux";
import {initiateGetCartItems} from "../modules/cart";
import {useEffect} from "react";


const CartPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {dispatch(initiateGetCartItems())}, [])


    return <>
        <h1>Cart</h1>
        <Cart/>
    </>
}

export default CartPage