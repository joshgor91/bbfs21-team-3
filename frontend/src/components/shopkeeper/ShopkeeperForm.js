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
import ShopkeeperCouponForm from "./ShopkeeperCouponForm";
import {logout} from "../../modules/user";

const initialShowValues = {
    showOrderHistory:false,
    showCreateProduct:false,
    showCreateCategory:false,
    showProductList: false,
    showCategories:false,
    showCoupons:false
}

function ShopkeeperForm({products, orders, initiateGetProducts, initiateGetCategories, initiateGetShopkeeperOrderHistory, dispatch}) {
    const [showCreateCategory, setShowCreateCategory] = useState(false)
    const [show, setShow] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [categoryId, setCategoryId] = useState();

    const [showValues, setShowValues] = useState(initialShowValues)

    useEffect(() => {
        initiateGetProducts()
        initiateGetCategories()
        initiateGetShopkeeperOrderHistory()
    }, [])


    const handleShowCreateProduct = () => setShow(true)
    const handleShowCreateCategory = () => setShowCreateCategory(true)

    function handleShowValue(e) {
        const {name} = e.target
        setShowValues({
            ...initialShowValues,
            [name]:true
        })
    }

    function handleDeleteProduct(id) {
        dispatch(deleteProduct(id))
    }

    return <>
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
                    <Dropdown.Toggle split variant='primary' id='dropdown-split-basic'>Shopkeeper Actions</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item name="showCoupons" onClick={handleShowValue}>Manage Coupons</Dropdown.Item>
                        <Dropdown.Item name="showCreateProduct" onClick={handleShowCreateProduct}>Create New Product</Dropdown.Item>
                        <Dropdown.Item name="showCreateCategory" onClick={handleShowCreateCategory}>Create New Category</Dropdown.Item>
                        <Dropdown.Item name="showProductList" onClick={handleShowValue}>Display Product List</Dropdown.Item>
                        <Dropdown.Item name="showCategories" onClick={handleShowValue}>Display Categories</Dropdown.Item>
                        <Dropdown.Item name="showOrderHistory" onClick={handleShowValue}>Display Orders</Dropdown.Item>
                    </Dropdown.Menu><br/>
                </Dropdown>
                {showValues.showCoupons && <ShopkeeperCouponForm/>}
                {showValues.showCategories && <ShopkeeperSeeCategories hide={!showValues.showCategories} setIsEditing={setIsEditing} setCategoryId={setCategoryId}/>}
                {showValues.showOrderHistory && <ShopkeeperOrderHistory hide={!showValues.showOrderHistory}/>}
            </Col>
        </Row>
            <Row>
                {showValues.showProductList && <ShopkeeperProductTable showProductList={showValues.showProductList} products={products}
                                                           initiateDeleteProduct={handleDeleteProduct}/>}
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
    return bindActionCreators({initiateGetProducts, initiateGetCategories, initiateGetShopkeeperOrderHistory, logout}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopkeeperForm)