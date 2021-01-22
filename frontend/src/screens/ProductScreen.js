import React from "react"
import {Row, Col, ListGroup, Button, Image} from "react-bootstrap"
import { Link } from "react-router-dom"
import products from "../products"
import Rating from "../components/Rating"

const ProductScreen = ({ match }) => {
    console.log(match)
    const product = products.find(p=> p._id === match.params.id)

    return (
        <>
            <Link className="btn btn-light my-2" to="/">回首頁</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} 評論`}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            售價: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            關於: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                    
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>售價:</Col>
                                <Col>${product.price}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>庫存:</Col>
                                <Col>{product.countInStock>0? '尚有庫存' : '已售完'}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button className="btn-block" disabled={product.countInStock===0}>加入購物車</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            
        </>

    )
}

export default ProductScreen