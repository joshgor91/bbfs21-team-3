import {Button, ButtonGroup, Col, Container, Dropdown, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ShopkeeperNewProduct from "./ShopkeeperNewProduct";
import {addProduct, createProduct, deleteProduct, initiateGetProducts} from '../../modules/shopkeeper'
import {useState} from "react";
import ShopkeeperProductList from "./ShopkeeperProductList";

function ShopkeeperForm({products, dispatch}) {
    const [show, setShow] = useState(false)
    const [showProductList, setShowProductList] = useState(false)


    const handleShow = () => setShow(true)
    function handleShowProductList() {
        setShowProductList(true)
        dispatch(initiateGetProducts())
    }
    function handleHideProductList() {
        setShowProductList(false)
    }
    function handleDeleteProduct(id) {
        dispatch(deleteProduct(id))
    }

    function handleCreateProduct(product) {
        dispatch(createProduct(product))
    }

    return<>
        <Container fluid>
            <Row>
            <Col>
                <ShopkeeperNewProduct
                    showNewProduct={show}
                    setShowNewProduct={setShow}
                    handleAddProduct={handleCreateProduct}
                />
                <Dropdown as={ButtonGroup}>
                    <Button variant='success'>Shopkeeper Ish</Button>

                    <Dropdown.Toggle split variant='success' id='dropdown-split-basic'/>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleShow}>Create</Dropdown.Item>
                        <Dropdown.Item onClick={handleShowProductList}>Display Product List</Dropdown.Item>
                        <Dropdown.Item onClick={handleHideProductList}>Hide Product List</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
            <Row>
                <h4>Shopkeeper Product List</h4>
                {showProductList ? <ShopkeeperProductList products={products} deleteProduct={handleDeleteProduct}/> : ''}
            </Row>
        </Container>

    </>
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateGetProducts}, dispatch)
}

function mapStateToProps(state) {
    return {
        products: state.shopkeeperReducer.products
    }
}


export default connect(mapStateToProps, undefined)(ShopkeeperForm)