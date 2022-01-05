import LoginForm from "../components/LoginRegister/LoginForm";
import {connect} from "react-redux";
import Home from "./Home";

const Login = ({isLoggedIn}) => {


    if(isLoggedIn){
        return <>
            <Home/>
        </>
    }
    else {
        return <>
            <LoginForm/>
        </>
    }



};


function mapStateToProps(state) {
    return {
        isLoggedIn: state.userReducer.isLoggedIn,
    }
}


export default connect(mapStateToProps)(Login)