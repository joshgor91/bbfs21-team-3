import {Card} from "react-bootstrap";

function Product({product}) {
    console.log(product)
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" style={{margin: 'auto', width: '180px', height: '180px'}} />
                <Card.Body>
                    <Card.Header>{product.productName}</Card.Header>
                    <Card.Title>{product.brand}</Card.Title>
                    <Card.Text>
                        {product.productDescription}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Product;