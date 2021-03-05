import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Rating from "../components/Rating"
import Loader from "../components/Loader"
import Message from "../components/Message"
import {
  productListDetails,
  createProductReview,
} from "../actions/productActions"
import { Row, Col, ListGroup, Button, Image, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { PRODUCT_REVIEW_RESET } from "../constants/productConstants"

const ProductScreen = ({ match, history }) => {
  const productId = match.params.id
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(3)
  const [comment, setComment] = useState("")

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const productReview = useSelector((state) => state.productReview)
  const { userInfo } = useSelector((state) => state.userLogin)

  const { loading, error, product } = productDetails
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productReview

  useEffect(() => {
    if (successReview || errorReview) {
      dispatch({
        type: PRODUCT_REVIEW_RESET,
      })
      setRating(3)
      setComment("")
    }
    dispatch(productListDetails(productId))
  }, [dispatch, productId, successReview, errorReview])

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`)
  }

  const reviewHandler = (e) => {
    e.preventDefault()
    const review = {
      rating,
      comment,
    }
    dispatch(createProductReview(productId, review))
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
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
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
                    <Col>
                      {product.countInStock > 0 ? "尚有庫存" : "已售完"}
                    </Col>
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

          <Row>
            <Col md={5}>
              <h2>評論</h2>
              {product.reviews.map((review, index) => (
                <ListGroup variant="flush">
                  <ListGroup.Item key={index}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                </ListGroup>
              ))}
              {!userInfo ? (
                <Link to="/login">請登入後留下評論</Link>
              ) : (
                <>
                  {product && product.reviews.length === 0 && (
                    <Message variant="info"> 沒有評論</Message>
                  )}
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  <Form onSubmit={reviewHandler}>
                    <Form.Group>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="1">1 - 很差</option>
                        <option value="2">2 - 稍差</option>
                        <option value="3">3 - 普通</option>
                        <option value="4">4 - 稍好</option>
                        <option value="5">5 - 很好</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>評論</Form.Label>
                      <Form.Control
                        value={comment}
                        placeholder="留下您的評論..."
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    {loadingReview ? (
                      <Loader />
                    ) : (
                      <Button type="submit" className="btn-sm">
                        送出
                      </Button>
                    )}
                  </Form>
                </>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
