import AdminForm from "../components/admin/AdminForm";
import AdminSeeUsers from "../components/admin/AdminSeeUsers";
import AdminEditUsers from "../components/admin/AdminEditUsers";
import React, {useState} from "react";
import AdminErrorMessage from "../components/admin/AdminErrorMessage";
import {connect} from "react-redux";



function Admin({showError}) {
    const [userForm, setUserForm] = useState( {
        id: null,
        firstName: '',
        lastName: '',
        role: '',
        authLevel: '1',
        email: '',
        password: '',
    });

    return <>
    <h1>Welcome Admin
    {/* add conditional to this page that if user auth /= 3,
    it redirects to home if a random tried to access this endpoint*/}
    </h1>

        <AdminForm/>
        <AdminSeeUsers setUserForm={setUserForm}/>
        <AdminEditUsers userForm={userForm} setUserForm={setUserForm}/>
        <AdminErrorMessage show={showError}/>

    </>
}

function mapStateToProps(state){
    return{
        showError: state.adminReducer.registerErrorOccurred
    }
}


export default connect(mapStateToProps)(Admin)