import {connect} from "react-redux";
import {Carousel, Col, Container, Image, Row} from "react-bootstrap";
import Product from "./Product";


function Products({inventory, product}) {

    return (
        <>

            <Container fluid>
             <Row>
                        <div className="col-sm-12">
                            <h3>Today's featured deals</h3>
                        </div>
                 </Row>
                 <Row>
                <Carousel fade variant="dark" id="carousel">

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-macbook-air-202110?wid=600&hei=150&fmt=p-jpg&qlt=95&.v=1633726242000"
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
                            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-gold-select?wid=600&hei=150&fmt=png-alpha&.v=1631652956000"
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
                            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-se-202109?wid=980&hei=245&fmt=p-jpg&qlt=95&.v=1629957411000"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Apple Watch SE</h3>
                            <p>Save up to 50%
                                on clearance and open-box items.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=600&hei=150&fmt=jpeg&qlt=80&.v=1632861342000"
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
                        <Col>

                            <Image alt="TVs &amp; Projectors"
                                   aria-hidden="false"
                                   className="rounded-circle"
                                   style={{width: 150, height: 150, marginLeft:"250px"}}
                                   src="https://pisces.bbystatic.com/image2/BestBuy_US/dam/MMT-500743-flex-icons-tv-220107-ccfb48bf-33d4-4617-be76-1b6950b91ed3.jpg;maxWidth=100"  />

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