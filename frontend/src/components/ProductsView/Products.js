import {connect} from "react-redux";
import {Carousel, Col, Container, Row} from "react-bootstrap";
import Product from "./Product";

function Products({inventory}) {

    return (
        <>
            <Container fluid>
                <div className='container-fluid' >
                    <div className="row">
                        <div className="col-sm-6">
                            <h3>Today's featured deals</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                <Carousel fade variant="dark" >

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-macbook-air-202110?wid=600&hei=150&fmt=p-jpg&qlt=95&.v=1633726242000"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>MacBook Air</h3>
                            <p> Save up to 50%
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
                        </div>
                    </div>
                </div>
                <Row>
                    <Col md={'auto'}>Current Deals here?</Col>
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