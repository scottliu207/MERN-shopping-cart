import React, { useEffect } from "react"
import { Row, Col, Container, ListGroup, Image, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addOrderItems } from "../actions/orderActions"
import CheckoutSteps from "../components/CheckoutSteps"
import Message from "../components/Message"
import { CART_RESET } from "../constants/cartConstants"

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const { cartItems, shippingAddress, paymentMethod } = cart

  //Calculation
  cart.itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.shippingPrice = Math.round(cart.itemsPrice > 3000 ? 0 : 100)
  cart.totalPrice = Math.round(cart.itemsPrice + cart.shippingPrice)

  const addOrder = useSelector((state) => state.addOrder)
  const { error, success, orderItems } = addOrder

  useEffect(() => {
    if (success) {
      dispatch({ type: CART_RESET })
      history.push(`/orders/${orderItems._id}`)
    }
  }, [history, orderItems, success, dispatch])

  const placeOrderHandler = () => {
    dispatch(
      addOrderItems({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        shippingPrice: cart.shippingPrice,
        itemPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }
  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>寄送</h4>
              <p>
                {" "}
                <strong>地址:</strong>
                {shippingAddress.postalCode},{shippingAddress.country}{" "}
                {shippingAddress.city}
                {shippingAddress.address}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>付款</h4>
              <p>
                <strong>付款方式:</strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>購物清單</h4>
              {cartItems.length === 0 && (
                <Message>
                  您的購物車是空的 <Link to="/">回首頁?</Link>
                </Message>
              )}
              <ListGroup variant="flush">
                {cartItems.map((item) => {
                  return (
                    <ListGroup.Item key={item.product_id}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col md={4}>
                          <Link to={`/products/${item.product_id}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={3}>
                          ${item.price} X {item.qty}
                        </Col>
                        <Col md={3}>${item.price * item.qty}</Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup>
            <h4>訂單總結</h4>
            <ListGroup.Item>商品:${cart.itemsPrice} </ListGroup.Item>
            <ListGroup.Item>運費:$ {cart.shippingPrice}</ListGroup.Item>
            <ListGroup.Item>總計:$ {cart.totalPrice}</ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
              <Button
                type="button"
                className="btn-block"
                onClick={placeOrderHandler}
              >
                結帳
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default PlaceOrderScreen
