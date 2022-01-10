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

    console.log(product)
   for (let prices of product.scheduledPrices) {
       // console.log(prices)
       if (prices.effectiveDate <= currentDate)
           currentPrice = prices.price
   }
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