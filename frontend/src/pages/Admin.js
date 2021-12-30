import AdminForm from "../components/admin/AdminForm";
import AdminCreateUser from "../components/admin/AdminCreateUser";
import AdminSeeUsers from "../components/admin/AdminSeeUsers";
import AdminEditUsers from "../components/admin/AdminEditUsers";
import React from "react";


const Admin = () => {
    return <>
    <h1>Welcome Admin
    {/* add conditional to this page that if user auth /= 3,
    it redirects to home if a rando tried to access this endpoint*/}

    </h1>

        <AdminForm/>
        {/*<AdminCreateUser/>*/}
        {/*<AdminSeeUsers/>*/}
        <AdminEditUsers/>

    </>
};

export default Admin;