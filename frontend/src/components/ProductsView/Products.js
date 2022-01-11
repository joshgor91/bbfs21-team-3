import {connect} from "react-redux";
import {Carousel, Col, Container, Row} from "react-bootstrap";
import Product from "./Product";

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
                <Carousel fade variant="dark" id="carousel">

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/8z70vn9/mac-card-40-macbook-air-202110-removebg-preview-1.png"
                            alt="MacBook Air"
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
                            alt="iPhone 13 Pro"
                        />

                        <Carousel.Caption>
                            <h3 className="carousel-text">iPhone 13 Pro</h3>
                            <p className="carousel-text">Save up to 50%
                                on clearance and open-box items.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/kmpwbvd/watch-card-40-se-202109-removebg-preview.png" alt="watch-card-40-se-202109-removebg-preview"
                            alt="Apple Watch SE"
                        />

                        <Carousel.Caption>
                            <h3 className="carousel-text">Apple Watch SE</h3>
                            <p className="carousel-text">Save up to 50%
                                on clearance and open-box items.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/XJX372J/MME73-removebg-preview.png" alt="MME73-removebg-preview" border="0"
                            alt="Airpods"
                        />
                        <Carousel.Caption>
                            <h3 className="carousel-text">AirPods (3rd generation)</h3>
                            <p className="carousel-text">A closer look at AirPods.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                    </Row>

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