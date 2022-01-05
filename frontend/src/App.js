import "./styles/app.css"
import AdminRouter from "./components/Router/AdminRouter";
import GuestRouter from "./components/Router/GuestRouter";
import {connect} from "react-redux";

function App({userIsAdmin}) {

    if (userIsAdmin) {
        return (<AdminRouter/>)
    }
    else{
        return (<GuestRouter/>)
    }
}

function mapStateToProps(state) {
    return {
        userIsAdmin: state.userReducer.userIsAdmin
    }
}

export default connect(mapStateToProps)(App)
