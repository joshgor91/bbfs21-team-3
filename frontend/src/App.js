import "./styles/app.css"
import AdminRouter from "./components/Router/AdminRouter";
import GuestRouter from "./components/Router/GuestRouter";
import {connect} from "react-redux";
import ShopkeeperRouter from "./components/Router/ShopkeeperRouter";

function App({userIsAdmin, userIsShopkeeper, userIsCustomer}) {

    if (userIsAdmin) {
        return (<AdminRouter/>)
    }
    else if(userIsShopkeeper){
        return (<ShopkeeperRouter/>)
    }
    else if(userIsCustomer){
        return (<ShopkeeperRouter/>)
    }
    else{
        return (<GuestRouter/>)
    }
}

function mapStateToProps(state) {
    return {
        userIsAdmin: state.userReducer.userIsAdmin,
        userIsShopkeeper: state.userReducer.userIsShopkeeper,
        userIsCustomer: state.userReducer.userIsCustomer
    }
}

export default connect(mapStateToProps)(App)
