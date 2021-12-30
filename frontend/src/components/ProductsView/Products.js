import {connect} from "react-redux";
import {Col, Container, Row} from "react-bootstrap";
import Product from "./Product";



function Products({inventory}) {
    console.log(inventory)
    return (
        <>
            <Container fluid>
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