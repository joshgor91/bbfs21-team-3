import {Card, Col, Image, Row} from "react-bootstrap";
import './Product.css'
import {initiateGetProductById} from "../../modules/products";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {discountPrice, sellPrice} from "../../utils/priceUtils";

function Product({product}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    function goToProductDetails(productId, product) {
        dispatch(initiateGetProductById(productId))
        sellPrice(product)
        discountPrice(product)
        setTimeout(() => {
            navigate(`/product/${productId}`)
        }, 50)

    }

    return (
        <>
            {product.scheduledPrices?.length !== 0 &&
            <Col>
                <Card className='product-card' onClick={() => goToProductDetails(product.id, product)}>
                    <Card.Img className='product-img' variant="top" src={product.picture}/>
                    <Card.Body>
                        <Card.Title>{product.brand}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{product.productName}</Card.Subtitle>
                        <Card.Text>{product.productDescription}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>}
        </>
    )
}

export default Product;