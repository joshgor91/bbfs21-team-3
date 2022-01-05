import {Button, ButtonGroup, Col, Container, Dropdown, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ShopkeeperNewProduct from "./ShopkeeperNewProduct";
import {
    createProduct,
    deleteProduct,
    initiateGetProducts
} from '../../modules/shopkeeper'
import {useState} from "react";
import ShopkeeperProductList from "./ShopkeeperProductList";
import {logout} from "../../modules/user";
import ShopkeeperProductTable from "./ShopkeeperProductTable";






function ShopkeeperForm({products, dispatch}) {
    const [show, setShow] = useState(false)
    const [showProductList, setShowProductList] = useState(false)
    dispatch(initiateGetProducts())

    const handleShow = () => setShow(true)

  const handleShowProductList = () => setShowProductList(true)
    const handleHideProductList = () => setShowProductList(false)

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
                    <Button variant='primary'>Shopkeeper Ish</Button>

                    <Dropdown.Toggle split variant='primary' id='dropdown-split-basic'/>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleShow}>Create</Dropdown.Item>
                        <Dropdown.Item onClick={handleShowProductList}>Display Product List</Dropdown.Item>
                        <Dropdown.Item onClick={handleHideProductList}>Hide Product List</Dropdown.Item>
                    </Dropdown.Menu><br/>
                    <Col><Button variant="primary" style={{ marginLeft: "1000px"}} onClick={logout}>Logout</Button></Col>
                </Dropdown>
            </Col>
        </Row>
            <Row>
                {showProductList ? <ShopkeeperProductTable showProductList={showProductList} products={products} initiateDeleteProduct={handleDeleteProduct}/> : ''}
            </Row>
        </Container>

    </>
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateGetProducts, logout}, dispatch)
}

export default connect(undefined, undefined)(ShopkeeperForm)