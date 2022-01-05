import {Toast, ToastContainer} from "react-bootstrap";
import {connect} from "react-redux";


function AdminErrorMessage ({showError, errorMessage}) {
    console.log(errorMessage)
    console.log(showError)
    return (
        <ToastContainer position={'middle-center'}
        >
            <Toast bg={'danger'}
                   show={showError}
                   delay={3000}
                   autohide={() => showError=false}
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