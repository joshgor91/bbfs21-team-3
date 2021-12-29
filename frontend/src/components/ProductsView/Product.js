import {Card} from "react-bootstrap";
import './Product.css'

function Product({product}) {
    console.log(product)

    return (
        <>
            <Card className='product-card' >
                <Card.Img className='product-img' variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{product.brand}</Card.Title>
                    <Card.Header>{product.productName}</Card.Header>
                    <Card.Text>
                        {product.productDescription}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Product;