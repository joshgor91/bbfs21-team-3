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

    return (
        <ToastContainer position={'middle-center'}
        >
            <Toast bg={'danger'}
                   onClose={() => setShow(false)}
                   show={show}
                   autohide
                   delay={5000}
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