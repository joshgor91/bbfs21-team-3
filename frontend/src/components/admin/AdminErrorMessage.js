import {Toast, ToastContainer} from "react-bootstrap";
import {connect} from "react-redux";
import {useState, useEffect} from "react";


function AdminErrorMessage ({showError, errorMessage}) {
    const [show, setShow] = useState(showError)
    useEffect(
        () => {
            if (showError)
                setShow(true)
        },
        [showError]
    )

    // console.log(errorMessage)
    return (
        <ToastContainer position={'middle-center'}
        >
            <Toast bg={'danger'}
                   onClose={() => setShow(false)}
                   show={show}
                   autohide
                   delay={3000}
            >
                <Toast.Body className={"text-white"}>{errorMessage}</Toast.Body>
            </Toast>
        </ToastContainer>

    );
}

function mapStateToProps(state){
    return{
        showError: state.adminReducer.registerErrorOccurred,
        errorMessage: state.adminReducer.errorMessage
    }
}


export default connect(mapStateToProps)(AdminErrorMessage)