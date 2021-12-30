import {Card, Col} from "react-bootstrap";
import './Product.css'
import {initiateGetProductById} from "../../modules/products";
import {useDispatch} from "react-redux";

function Product({product}) {
    const dispatch = useDispatch()
    console.log(product)

    return (
        <>
            <Col>
            <Card className='product-card' >
                <Card.Img className='product-img' variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{product.brand}</Card.Title>
                    <Card.Header onClick={() => dispatch(initiateGetProductById(product.id))}>{product.productName}</Card.Header>
                    <Card.Text>
                        {product.productDescription}
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </>
    )
}

export default Product;