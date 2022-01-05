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
import ShopkeeperCreateCategory from "./ShopkeeperCreateCategory";



function ShopkeeperForm({products, initiateGetProducts, initiateGetCategories, dispatch}) {
    const [hide, setHide] = useState(true)
    const [showCreateCategory, setShowCreateCategory] = useState(false)
    const [show, setShow] = useState(false)
    const [showProductList, setShowProductList] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [categoryId, setCategoryId] = useState();

    useEffect(() => {
        initiateGetProducts()
        initiateGetCategories()
    }, [])


    const handleShowCreateProduct = () => setShow(true)
    const handleShowCreateCategory = () => setShowCreateCategory(true)

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
                <ShopkeeperCreateCategory
                    showCreateCategory={showCreateCategory}
                    setShowCreateCategory={setShowCreateCategory}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    categoryId={categoryId}
                />
                {!hide && <ShopkeeperSeeCategories hide={hide} setHide={setHide} setIsEditing={setIsEditing} setCategoryId={setCategoryId}/>}
                <Dropdown as={ButtonGroup}>
                    <Button variant='primary'>Shopkeeper Ish</Button>

                    <Dropdown.Toggle split variant='primary' id='dropdown-split-basic'/>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleShowCreateProduct}>Create New Product</Dropdown.Item>
                        <Dropdown.Item onClick={handleShowCreateCategory}>Create New Category</Dropdown.Item>
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