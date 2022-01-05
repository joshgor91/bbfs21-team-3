import LoginForm from "../components/LoginRegister/LoginForm";
import {connect} from "react-redux";
import Home from "./Home";

const Login = ({isLoggedIn, loggedInUser}) => {
    console.log(isLoggedIn)
    console.log(loggedInUser)

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
        loggedInUser: state.userReducer.loggedInUser,
    }
}


export default connect(mapStateToProps)(Login)