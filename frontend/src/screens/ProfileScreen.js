import React, { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails, upadateUserProfile } from "../actions/userActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

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

  useEffect(
    () => {
      if (!userInfo) {
        history.push("/login")
      } else {
        if (!user) {
          dispatch(getUserDetails())
        } else {
          setName(userInfo.name)
          setEmail(userInfo.email)
        }
      }
    },
    userInfo,
    user,
    history
  )

  const submitHandler = (event) => {
    event.preventDefault()
    console.log(updatedError)
    if (newPassword !== confirmNewPassword) {
      setMessage("新密碼與確認密碼不相同")
    } else {
      dispatch(
        upadateUserProfile({
          _id: user._id,
          name: name,
          email: email,
          password: password,
        })
      )
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
          <Button type="submit">送出</Button>
        </Form>
      </Col>
      <Col md={8}>
        <h1>我的購物清單</h1>
      </Col>
    </Row>
  )
}

export default ProfileScreen
