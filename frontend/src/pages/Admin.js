import AdminForm from "../components/admin/AdminForm";
import AdminSeeUsers from "../components/admin/AdminSeeUsers";
import AdminEditUsers from "../components/admin/AdminEditUsers";
import React, {useState} from "react";

const initialUserForm = {
    id: null,
    firstName: '',
    lastName: '',
    role: '',
    authLevel: '',
    email: '',
    password: '',
}

function Admin() {

    const [userForm, setUserForm] = useState(initialUserForm);

    return <>
    <h1>Welcome Admin
    {/* add conditional to this page that if user auth /= 3,
    it redirects to home if a rando tried to access this endpoint*/}

    </h1>

        <AdminForm/>
        <AdminSeeUsers setUserForm={setUserForm}/>
        <AdminEditUsers userForm={userForm} setUserForm={setUserForm}/>

    </>
}

export default Admin;