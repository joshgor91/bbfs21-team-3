import Cart from "../components/Cart/Cart";
import {useDispatch} from "react-redux";
import {initiateGetCartItems} from "../modules/cart";
import {useEffect} from "react";


const CartPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {dispatch(initiateGetCartItems())}, [])


    return <>
        <h1 style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:'5px'
        }}>Cart</h1>
        <Cart/>
    </>
}

export default CartPage