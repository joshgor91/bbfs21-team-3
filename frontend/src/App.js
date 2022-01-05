import "./styles/app.css"
import AdminRouter from "./components/Router/AdminRouter";
import GuestRouter from "./components/Router/GuestRouter";
import {connect, useSelector} from "react-redux";
import ShopkeeperRouter from "./components/Router/ShopkeeperRouter";
import CustomerRouter from "./components/Router/CustomerRouter";

function App({userIsAdmin, userIsShopkeeper, userIsCustomer}) {

    const cartQuantity = useSelector(state => state.cartReducer.quantity)
    console.log(cartQuantity)

    if (userIsAdmin) {
        return (<AdminRouter cartquantity={cartQuantity}/>)
    }
    else if(userIsShopkeeper){
        return (<ShopkeeperRouter cartquantity={cartQuantity}/>)
    }
    else if(userIsCustomer){
        return (<CustomerRouter cartquantity={cartQuantity}/>)
    }
    else{
        return (<GuestRouter cartquantity={cartQuantity}/>)
    }
}

function mapStateToProps(state) {
    return {
        userIsAdmin: state.userReducer.userIsAdmin,
        userIsShopkeeper: state.userReducer.userIsShopkeeper,
        userIsCustomer: state.userReducer.userIsCustomer,
    }
}

export default connect(mapStateToProps)(App)
