import React, { useEffect } from "react"
import { Row, Col, Button, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getOrderList } from "../actions/orderActions"
import PaginationContainer from "../components/PaginationContainer"
import Loader from "../components/Loader"
import Message from "../components/Message"

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const orderList = useSelector((state) => state.getOrderList)
  const { loading, error, orders } = orderList

  useEffect(() => {
    dispatch(getOrderList())
  }, [dispatch])

  return (
    <>
      <Row>
        <Col>
          <h1>訂單</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>
            <Table
              size="sm"
              striped
              hover
              responsive
              bordered
              className="text-center"
            >
              <thead>
                <tr>
                  <th>編號</th>
                  <th>會員</th>
                  <th>地區</th>
                  <th>日期</th>
                  <th>總金額</th>
                  <th>付款</th>
                  <th>出貨</th>
                  <th>細項</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.shippingAddress.city}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button variant="secondery" className="btn-sm">
                          訂單細節
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  )
}

export default OrderListScreen
