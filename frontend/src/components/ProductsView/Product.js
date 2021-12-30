import {Card, Col} from "react-bootstrap";
import './Product.css'
import {initiateGetProductById} from "../../modules/products";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

function Product({product}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(product)

    function goToProductDetails(productId) {
        dispatch(initiateGetProductById(productId))
        navigate(`../product/${productId}`)
    }

    return (
        <>
            <Col>
            <Card className='product-card' >
                <Card.Img className='product-img' variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{product.brand}</Card.Title>
                    <Card.Header onClick={() => goToProductDetails(product.id)}>{product.productName}</Card.Header>
                    <Card.Text>{product.productDescription}</Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </>
    )
}

export default Product;