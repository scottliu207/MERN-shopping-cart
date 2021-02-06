import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { Container, ListGroup, Row, Col, Image } from "react-bootstrap"
import { getOrderDetails, getOrderPay } from "../actions/orderActions"
import { ORDER_PAY_RESET } from "../constants/orderConstants"
import axios from "axios"
import { PayPalButton } from "react-paypal-button-v2"

const OrderScreen = ({ match }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()
  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, error, order } = orderDetails

  const orderPay = useSelector((state) => state.getOrderPay)
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay
  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    const addPayPal = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal")
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=TWD`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    addPayPal()

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPal()
      } else {
        setSdkReady(true)
      }
    }
  }, [orderId, dispatch, successPay])

  const onSuccessHandler = (paymentResult) => {
    dispatch(getOrderPay(orderId, paymentResult))
  }
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error || errorPay ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <h1>訂單編號:</h1>
            <h4>{order._id}</h4>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>配送資訊</h4>
                <p>
                  <strong>姓名:</strong> {order.user.name}
                </p>
                <p>
                  <strong>信箱:</strong> {order.user.email}
                </p>
                <p>
                  <strong>地址:</strong> {order.shippingAddress.address}
                </p>
                {order.isDeliver ? (
                  <Message>已於 {order.deliverAt} 出貨</Message>
                ) : (
                  <Message variant="danger">尚未出貨</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>付款</h4>
                <p>
                  <strong>付款方式:</strong>
                  {order.paymentMethod}
                </p>

                {order.isPaid ? (
                  <Message>已於 {order.paidAt.substring(0, 10)} 付款</Message>
                ) : (
                  <Message variant="danger">尚未付款</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>購物清單</h4>

                <ListGroup variant="flush">
                  {order.orderItems.map((item) => {
                    return (
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid />
                          </Col>
                          <Col md={5}>{item.name}</Col>
                          <Col md={5}>
                            $ {item.price} X {item.qty} = ${" "}
                            {item.price * item.qty}
                          </Col>
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
              <ListGroup.Item>商品:$ {order.itemPrice}</ListGroup.Item>
              <ListGroup.Item>運費:$ {order.shippingPrice}</ListGroup.Item>
              <ListGroup.Item>稅金:$ {order.taxPrice}</ListGroup.Item>
              <ListGroup.Item>總計:$ {order.totalPrice}</ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={onSuccessHandler}
                      currency="TWD"
                    ></PayPalButton>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default OrderScreen
