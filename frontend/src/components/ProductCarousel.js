import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Carousel, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { getTopProducts } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const topProducts = useSelector((state) => state.productTop)
  const { loading, error, products } = topProducts

  useEffect(() => {
    dispatch(getTopProducts())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel className="bg-dark mb-3" pause="hover">
          {products &&
            products.map((product) => (
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
      )}
    </>
  )
}

export default ProductCarousel
