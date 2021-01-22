import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({product}) => {
    
    
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/products/${product._id}`}>
                <Card.Img className="rounded" src={product.image} variant="top"></Card.Img>
            </Link>
            <Card.Body>

            <Link to={`/products/${product._id}`}>
            <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
            </Link>
            <Card.Text as="div" className="my-3">
                <Rating value= {product.rating} text={`${product.numReviews} reviews`} />
            </Card.Text>
            <Card.Text as="h4">$ {product.price}</Card.Text>
            </Card.Body>
            
        </Card>
    )
}

export default Product