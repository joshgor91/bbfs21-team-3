import "./styles/app.css"
import AdminRouter from "./components/Router/AdminRouter";
import GuestRouter from "./components/Router/GuestRouter";
import {connect} from "react-redux";
import ShopkeeperRouter from "./components/Router/ShopkeeperRouter";
import CustomerRouter from "./components/Router/CustomerRouter";
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./components/Theme/GlobalStyles";
import {lightTheme, darkTheme} from "./components/Theme/Theme"
import {useState} from "react";

function App({userIsAdmin, userIsShopkeeper, userIsCustomer, cartQuantity}) {

    const [theme, setTheme] = useState('light');
    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }



    return (
        <>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <>
                    <GlobalStyles/>
            {userIsAdmin && <AdminRouter cartQuantity={cartQuantity} themeToggler={themeToggler} />}
            {userIsShopkeeper && <ShopkeeperRouter cartQuantity={cartQuantity} themeToggler={themeToggler} />}
            {userIsCustomer && <CustomerRouter cartQuantity={cartQuantity} themeToggler={themeToggler} />}
            {(!userIsCustomer && !userIsShopkeeper && !userIsAdmin) && <GuestRouter cartQuantity={cartQuantity}  themeToggler={themeToggler}/>}
                    </>
            </ThemeProvider>
        </>


    )
}

function mapStateToProps(state) {
    return {
        userIsAdmin: state.userReducer.userIsAdmin,
        userIsShopkeeper: state.userReducer.userIsShopkeeper,
        userIsCustomer: state.userReducer.userIsCustomer,
        isLoggedIn: state.userReducer.isLoggedIn,
        cartQuantity: state.cartReducer.quantity
    }
}

export default connect(mapStateToProps)(App)
