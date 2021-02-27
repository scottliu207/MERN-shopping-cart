import React, { useState, useEffect } from "react"
import { Form, Button, Row, Col, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { getMyOrderList } from "../actions/orderActions"
import { LinkContainer } from "react-router-bootstrap"

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const updateProfile = useSelector((state) => state.updateProfile)
  const { success, error: updatedError } = updateProfile

  const myOrderList = useSelector((state) => state.getMyOrderList)
  const { loading: loadingOrders, error: errorOrders, orders } = myOrderList

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      if (!user || success || !user.name) {
        dispatch(getUserDetails())
        dispatch(getMyOrderList())
      } else {
        setName(userInfo.name)
        setEmail(userInfo.email)
      }
    }
  }, [userInfo, dispatch, user, history, success])

  const submitHandler = (event) => {
    event.preventDefault()
    console.log(updatedError)
    if (newPassword !== confirmNewPassword) {
      setMessage("新密碼與確認密碼不相同")
    } else {
      dispatch(
        updateUserProfile({
          _id: user._id,
          name: name,
          email: email,
          password: password,
        })
      )

      dispatch(getUserDetails())
    }
  }
  return (
    <Row>
      <Col md={4}>
        <h1>會員資料</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {updatedError && <Message variant="danger">{updatedError}</Message>}
        {success && <Message>資料更新成功</Message>}
        {loading && <Loader />}
        <Form className="my-3" onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>使用者名稱</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>信箱</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>密碼</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>新密碼</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            ></Form.Control>
            <Form.Text className="text-muted">
              若無須更改密碼請保留空白
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>再次輸入新密碼</Form.Label>
            <Form.Control
              type="password"
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
            ></Form.Control>
            <Form.Text className="text-muted">
              若無須更改密碼請保留空白
            </Form.Text>
          </Form.Group>
          <Button type="submit">更改</Button>
        </Form>
      </Col>
      <Col md={8}>
        <h1>我的購物清單</h1>
        <Table
          bordered
          striped
          hover
          responsive
          size="sm"
          className="text-center"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>建立日期</th>
              <th>總金額</th>
              <th>付款</th>
              <th>出貨</th>
            </tr>
          </thead>
          <tbody>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant="danger">{errorOrders}</Message>
            ) : (
              orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <th>{order._id}</th>
                    <th>{order.createdAt.substring(0, 10)}</th>
                    <th>{order.totalPrice}</th>
                    <th>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </th>
                    <th>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </th>

                    <th>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button className="btn-sm btn-light">詳情</Button>
                      </LinkContainer>
                    </th>
                  </tr>
                )
              })
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default ProfileScreen
