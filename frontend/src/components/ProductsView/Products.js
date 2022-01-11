import {connect} from "react-redux";
import {Carousel, Col, Container, Image, Row} from "react-bootstrap";
import Product from "./Product";
import {viewProductDetails} from "../../modules/shopkeeper";

function Products({inventory}) {

    return (
        <>

            <Container fluid>
             <Row>
                        <div className="col-sm-12">
                            <h3>Today's featured deals</h3>
                        </div>
                 </Row>
                 <Row>
                <Carousel fade variant="dark" id="carousel" style={{width:900, height:450, margin:'auto'}}>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://help.apple.com/assets/6062258EBFC7E7487E19DBB0/60622592BFC7E7487E19DBC1/en_US/a30dae33fdf21b2f7cd3045ae45f3dd9.png"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 className="carousel-text">MacBook Air</h3>
                            <p className="carousel-text"> Save up to 50%
                                on clearance and open-box items.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn.shopify.com/s/files/1/0447/6767/4533/products/1_133c4cbc-6e2c-4d87-b77d-a25baa408471_2048x2048.png?v=1615476293"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>iPhone 13 Pro</h3>
                            <p>Save up to 50%
                                on clearance and open-box items.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842709000"
                            alt="Second slide"
                        />



                        <Carousel.Caption>
                            <h3>iPhone 13 Pro</h3>
                            <p>Save up to 50%
                                on clearance and open-box items.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.att.com/idpassets/global/devices/other/apple/apple-watch-series-7-45mm/carousel/6264D-1-CAROUSEL.png"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Apple Watch SE</h3>
                            <p>Save up to 50%
                                on clearance and open-box items.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    {/*<Carousel.Item>*/}
                    {/*    <img*/}
                    {/*        className="d-block w-100"*/}
                    {/*        src="https://m.media-amazon.com/images/I/91KZbi-CbzL._AC_SL1500_.jpg"*/}
                    {/*        alt="First slide"*/}
                    {/*    />*/}
                    {/*    <Carousel.Caption>*/}
                    {/*        <h3>AirPods (3rd generation)</h3>*/}
                    {/*        <p>A closer look at AirPods.</p>*/}
                    {/*    </Carousel.Caption>*/}
                    {/*</Carousel.Item>*/}
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="https://www.sony.com/image/3a5517523b7ba2695cb13cf0a8e79d2f?fmt=png-alpha&scl=1"
                             alt="First slide"
                         />
                         <Carousel.Caption>
                             <h3>AirPods (3rd generation)</h3>
                             <p>A closer look at AirPods.</p>
                         </Carousel.Caption>
                     </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://leronza.com/wp-content/uploads/2020/09/24k-gold-apple-watch-series-7-with-brown-leather-strap-1024x1024.png"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>AirPods (3rd generation)</h3>
                            <p>A closer look at AirPods.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                 </Carousel>

                    </Row>

                <div className="se-item-image-wrapper"> Shop these deals and more by category
                    <Col >



                        <Image
                            alt="TVs &amp; Projectors"
                               aria-hidden="false"
                               className="rounded-circle"
                               style={{width: 150, height: 150, marginLeft:"250px"}}
                               src="https://pisces.bbystatic.com/image2/BestBuy_US/dam/MMT-500743-flex-icons-tv-220107-ccfb48bf-33d4-4617-be76-1b6950b91ed3.jpg;maxWidth=100"/>
                        {/*<Col>*/}
                        {/*    <div>*/}
                        {/*        <a href="/product/:id" data-track="">Cell Phones</a>*/}
                        {/*    </div>*/}
                        {/*</Col>*/}


                        <Image
                            aria-hidden="false"
                            className="rounded-circle"
                            style={{width: 150, height: 150, marginLeft:"15px"}}
                            src="https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.small_2x.jpg" />

                        <Image
                            aria-hidden="false"
                            className="rounded-circle"
                            style={{width: 150, height: 150, marginLeft:"15px"}}
                            src="https://pisces.bbystatic.com/image2/BestBuy_US/dam/MMT-500743-flex-icons-vg-220107-d7951283-9e54-4f19-9d60-eac250530915.jpg;maxWidth=100"/>

                        <Image
                            aria-hidden="false"
                            className="rounded-circle"
                            style={{width: 150, height: 150, marginLeft:"15px"}}
                            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=2000&hei=2000&fmt=jpeg&qlt=80&.v=1591634795000" />

                        <Image
                            aria-hidden="false"
                            className="rounded-circle"
                            style={{width: 150, height: 150, marginLeft:"15px"}}
                            src="https://pisces.bbystatic.com/image2/BestBuy_US/dam/MMT-500743-flex-icons-tl-220107-c8140774-d8ea-46d2-8c43-1cb4d6325d63.jpg;maxWidth=100" />

                        <Image
                            aria-hidden="false"
                            className="rounded-circle"
                            style={{width: 150, height: 150, marginLeft:"15px"}}
                            src="https://pisces.bbystatic.com/image2/BestBuy_US/dam/MMT-495056-ghp-img-icons-laptops-03a491af-cab2-43c4-a6e2-30b8a2303b30.jpg;maxWidth=100" />

                    </Col>

                </div><br/>

                <Row>
                        {inventory && inventory.map((product, idx) =>
                            <Product key={idx} product={product}/>
                        )}

                </Row>
            </Container>

        </>
    )
}

function mapStateToProps(state) {
    return {
        inventory: state.productsReducer.products,
    }
}

export default connect(mapStateToProps)(Products);