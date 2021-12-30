import {Button, ButtonGroup, Col, Dropdown} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
// import {startAddingProduct, initiateGetProducts} from '../../modules/shopkeeper'

function ShopkeeperForm() {

    return<>
        <Col>
            <Dropdown as={ButtonGroup}>
                <Button variant='success'>Shopkeeper Ish</Button>

                <Dropdown.Toggle split variant='success' id='dropdown-split-basic'/>

                <Dropdown.Menu>
                    <Dropdown.Item>Create</Dropdown.Item>
                    <Dropdown.Item>Display Product List</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Col>
    </>
}
//
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({startAddingProducts, initiateGetProducts}, dispatch)
// }

export default connect(undefined, undefined)(ShopkeeperForm)