import AdminForm from "../components/admin/AdminForm";
import AdminSeeUsers from "../components/admin/AdminSeeUsers";
import AdminEditUsers from "../components/admin/AdminEditUsers";
import React, {useState} from "react";
import AdminErrorMessage from "../components/admin/AdminErrorMessage";
import {connect} from "react-redux";
import {Col} from "react-bootstrap";



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

    return <Col className={"m-3"}>
    <h1>Welcome Admin
    </h1>

        <AdminForm/>
        <AdminSeeUsers setUserForm={setUserForm}/>
        <AdminEditUsers userForm={userForm} setUserForm={setUserForm}/>
        <AdminErrorMessage show={showError}/>

    </Col>
}

function mapStateToProps(state){
    return{
        showError: state.adminReducer.registerErrorOccurred
    }
}


export default connect(mapStateToProps)(Admin)