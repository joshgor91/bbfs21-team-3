import {Button} from "react-bootstrap";


function LogoutBtn(){

    function logout(){
        window.location.reload(false);
    }

    return <Button onClick={logout} variant="light" id="logout-button"> Logout</Button>
}

export default LogoutBtn;