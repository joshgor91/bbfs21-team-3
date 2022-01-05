import {Button, ButtonGroup, Col, Container, Dropdown, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect, useDispatch} from "react-redux";
import ShopkeeperNewProduct from "./ShopkeeperNewProduct";
import {
    createProduct,
    deleteProduct, initiateGetCategories,
    initiateGetProducts
} from '../../modules/shopkeeper'
import {useEffect, useState} from "react";
import ShopkeeperProductList from "./ShopkeeperProductList";
import {logout} from "../../modules/user";
import ShopkeeperSeeCategories from "./ShopkeeperSeeCategories";



function ShopkeeperForm({products, initiateGetProducts, initiateGetCategories, dispatch}) {
    const [hide, setHide] = useState(true)
    useEffect(() => {
        initiateGetProducts()
        initiateGetCategories()
    }, [])
    const [show, setShow] = useState(false)
    const [showProductList, setShowProductList] = useState(false)


    const handleShow = () => setShow(true)

    const handleShowProductList = () => setShowProductList(true)

    const handleShowCategories = () => setHide(false);
    const handleHide = () => {
        setHide(true)
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
                {!hide && <ShopkeeperSeeCategories hide={hide} setHide={setHide}/>}
                <Dropdown as={ButtonGroup}>
                    <Button variant='primary'>Shopkeeper Ish</Button>

                    <Dropdown.Toggle split variant='primary' id='dropdown-split-basic'/>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleShow}>Create</Dropdown.Item>
                        <Dropdown.Item onClick={handleShowProductList}>Display Product List</Dropdown.Item>
                        <Dropdown.Item onClick={handleShowCategories}>Display Categories</Dropdown.Item>
                    </Dropdown.Menu><br/>
                    <Col><Button variant="primary" style={{ marginLeft: "1000px"}} onClick={logout}>Logout</Button></Col>
                    {(!hide || showProductList) && <Col><Button onClick={handleHide}>Hide table</Button></Col>}
                </Dropdown>
            </Col>
        </Row>
            <Row>
                {showProductList? <ShopkeeperProductList products={products} deleteProduct={handleDeleteProduct}/> : ''}
            </Row>
        </Container>

    </>
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateGetProducts, initiateGetCategories, logout}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(ShopkeeperForm)