import {Button, ButtonGroup, Col, Container, Dropdown, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ShopkeeperNewProduct from "./ShopkeeperNewProduct";
import {
    deleteProduct,
    initiateGetCategories,
    initiateGetProducts
} from '../../modules/shopkeeper'
import {useEffect, useState} from "react";
import ShopkeeperSeeCategories from "./ShopkeeperSeeCategories";
import ShopkeeperCreateCategory from "./ShopkeeperCreateCategory";
import ShopkeeperProductTable from "./ShopkeeperProductTable";
import {initiateGetShopkeeperOrderHistory} from "../../modules/order";
import ShopkeeperOrderHistory from "./ShopkeeperOrderHistory";


function ShopkeeperForm({products, orders, initiateGetProducts, initiateGetCategories, initiateGetShopkeeperOrderHistory, dispatch}) {
    const [hide, setHide] = useState(true)
    const [showOrderHistory, setShowOrderHistory] = useState(true)
    const [showCreateCategory, setShowCreateCategory] = useState(false)
    const [show, setShow] = useState(false)
    const [showProductList, setShowProductList] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [categoryId, setCategoryId] = useState();

    useEffect(() => {
        initiateGetProducts()
        initiateGetCategories()
        initiateGetShopkeeperOrderHistory()
    }, [])


    const handleShowCreateProduct = () => setShow(true)
    const handleShowCreateCategory = () => setShowCreateCategory(true)

    const handleShowProductList = () => setShowProductList(true)

    const handleShowCategories = () => setHide(false);
    const handleHide = () => {
        setHide(true)
        setShowProductList(false)
    }

    const handleShowOrderHistory = () => setShowOrderHistory(false)

    function handleDeleteProduct(id) {
        dispatch(deleteProduct(id))
    }

    return<>
        <Container fluid>
            <Row>
            <Col>
                <ShopkeeperNewProduct
                    showNewProduct={show}
                    setShowNewProduct={setShow}
                />
                <ShopkeeperCreateCategory
                    showCreateCategory={showCreateCategory}
                    setShowCreateCategory={setShowCreateCategory}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    categoryId={categoryId}
                />
                <Dropdown as={ButtonGroup}>
                    <Button variant='primary'>Shopkeeper Actions</Button>

                    <Dropdown.Toggle split variant='primary' id='dropdown-split-basic'/>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleShowCreateProduct}>Create New Product</Dropdown.Item>
                        <Dropdown.Item onClick={handleShowCreateCategory}>Create New Category</Dropdown.Item>
                        <Dropdown.Item onClick={handleShowProductList}>Display Product List</Dropdown.Item>
                        <Dropdown.Item onClick={handleShowCategories}>Display Categories</Dropdown.Item>
                        <Dropdown.Item onClick={handleShowOrderHistory}>Display Orders</Dropdown.Item>
                    </Dropdown.Menu><br/>
                    {(!hide || showProductList) && <Col><Button onClick={handleHide}>Hide table</Button></Col>}
                </Dropdown>
                {!hide && <ShopkeeperSeeCategories hide={hide} setHide={setHide} setIsEditing={setIsEditing} setCategoryId={setCategoryId}/>}
                {!showOrderHistory && <ShopkeeperOrderHistory hide={showOrderHistory} setHide={setShowOrderHistory}/>}
            </Col>
        </Row>
            <Row>
                {showProductList ? <ShopkeeperProductTable showProductList={showProductList} products={products} initiateDeleteProduct={handleDeleteProduct}/> : ''}
            </Row>
        </Container>

    </>
}

function mapStateToProps(state) {
    return {
        products: state.shopkeeperReducer.products
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateGetProducts, initiateGetCategories, initiateGetShopkeeperOrderHistory}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopkeeperForm)