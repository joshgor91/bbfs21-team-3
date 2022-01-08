import {Card, Col} from "react-bootstrap";
import './Product.css'
import {initiateGetProductById} from "../../modules/products";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import moment from "moment";

function Product({product}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let currentDate = moment(new Date()).format()
    let currentPrice = 0
    // console.log(product.ScheduledPrices)

   // for (let prices of product.ScheduledPrices) {
   //     // console.log(prices)
   //     if (prices.effectiveDate <= currentDate)
   //         currentPrice = prices.price
   // }
    // console.log(currentPrice)

    function goToProductDetails(productId) {
        dispatch(initiateGetProductById(productId))
        setTimeout(() => {
            navigate(`../product/${productId}`)
        }, 100)
    }

    return (
        <>
            <Col>
            <Card className='product-card' onClick={() => goToProductDetails(product.id)} >
                <Card.Img className='product-img' variant="top" src={product.picture} />
                <Card.Body>
                    <Card.Title>{product.brand}</Card.Title>
                    <Card.Header>{product.productName}</Card.Header>
                    <Card.Text>{product.productDescription}</Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </>
    )
}

export default Product;