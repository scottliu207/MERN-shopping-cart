import React from "react"
import { Carousel, Image } from "react-bootstrap"
import { Link } from "react-router-dom"

const ProductCarousel = ({ productsTop }) => {
  console.log(productsTop)
  return (
    <Carousel className="bg-dark mb-3">
      {productsTop.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image src={product.image} className="d-block w-100" />
            <Carousel.Caption>
              <h3>{product.name}</h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
