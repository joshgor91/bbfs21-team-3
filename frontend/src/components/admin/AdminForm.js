import {ButtonGroup, Dropdown} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {logout} from "../../modules/user";
import {initiateGetUsers, startAddingUser} from '../../modules/admin'


function AdminForm({startAddingUser, initiateGetUsers}){

    return <>
        <div className={'mx-5 my-2'}>
            <Dropdown as={ButtonGroup}>

                <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" className={'text-white'}>
                    Admin
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={startAddingUser}
                    >Create</Dropdown.Item>
                    <Dropdown.Divider style={{width: '90%', margin:'auto'}}/>
                    <Dropdown.Item
                        onClick={initiateGetUsers}
                    >View all Users</Dropdown.Item>
                </Dropdown.Menu><br/>
            </Dropdown>
            </div></>


}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({startAddingUser, initiateGetUsers, logout}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(AdminForm)


