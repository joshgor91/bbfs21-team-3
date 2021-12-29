import AdminForm from "../components/admin/AdminForm";
import AdminCreateUser from "../components/admin/AdminCreateUser";

const Admin = () => {
    return <>
    <h1>Admin
    {/* add conditional to this page that if user auth /= 3, it redirects to home if a rando tried to access this endpoint*/}
    </h1>

        {/*<AdminForm/>*/}
        <AdminCreateUser/>
    </>
};

export default Admin;