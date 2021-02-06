import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Rating from "../components/Rating"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { productListDetails } from "../actions/productActions"
import { Row, Col, ListGroup, Button, Image, Form } from "react-bootstrap"
import { Link } from "react-router-dom"

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(productListDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className="btn btn-light my-2" to="/">
        回首頁
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message></Message>
      ) : (
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
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} 評論`}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>售價:</strong> ${product.price}
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>關於: </strong>
                <br />
                {product.description}
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
                  <Col>{product.countInStock > 0 ? "尚有庫存" : "已售完"}</Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>數量:</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(event) => {
                          setQty(event.target.value)
                        }}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {" "}
                            {x + 1}{" "}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  disabled={product.countInStock === 0}
                >
                  加入購物車
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
