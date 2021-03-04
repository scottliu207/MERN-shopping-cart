import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { Container, ListGroup, Row, Col, Image, Button } from "react-bootstrap"
import {
  getOrderDetails,
  getOrderPay,
  getOrderDeliver,
} from "../actions/orderActions"
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants"
import axios from "axios"
import { PayPalButton } from "react-paypal-button-v2"

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()
  const orderDetails = useSelector((state) => state.orderDetails)
  const orderPay = useSelector((state) => state.getOrderPay)
  const orderDeliver = useSelector((state) => state.getOrderDeliver)
  const { userInfo } = useSelector((state) => state.userLogin)

  const { loading, error, order } = orderDetails
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver

  const [sdkReady, setSdkReady] = useState(false)

  const deliverHandler = () => {
    dispatch(getOrderDeliver(orderId))
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }

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

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPal()
      } else {
        setSdkReady(true)
      }
    }
  }, [orderId, dispatch, successPay, order, userInfo, successDeliver, history])

  const onSuccessHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(getOrderPay(orderId, paymentResult))
    return alert(
      `${paymentResult.payer.name.given_name}的訂單交易完成，已通知賣家出貨。`
    )
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
                {order.isDelivered ? (
                  <Message>
                    已於 {order.deliveredAt.substring(0, 10)} 出貨
                  </Message>
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
              {userInfo && !userInfo.isAdmin && !order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      shippingPreference="NO_SHIPPING"
                      amount={order.totalPrice}
                      onSuccess={onSuccessHandler}
                      currency="TWD"
                    ></PayPalButton>
                  )}
                </ListGroup.Item>
              )}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered &&
                (loadingDeliver ? (
                  <Loader />
                ) : errorDeliver ? (
                  <Message variant="danger">{errorDeliver}</Message>
                ) : (
                  <ListGroup.Item>
                    <Button className="btn-block" onClick={deliverHandler}>
                      更改為已出貨
                    </Button>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default OrderScreen
