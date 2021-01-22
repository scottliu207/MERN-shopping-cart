import React from "react"
import products from "../products"
import {Row, Col} from "react-bootstrap"
import Product from "../components/Product"

const HomeScreen = () => {
    
    return (
        <div>
            <h1>Welcome to Max</h1>
            <h3>最新商品</h3>
            <Row md={8}>
                {products.map( product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen