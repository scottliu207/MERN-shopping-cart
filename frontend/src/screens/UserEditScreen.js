import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col, Button, Form } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { getUserDetails, adminUpdateProfile } from "../actions/userActions"

const UserEditScreen = ({ match, history }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userId = match.params.id
  const { loading, error, user } = useSelector((state) => state.userDetails)
  const {
    loading: loadingUpdated,
    error: errorUpdated,
    success: successUpdated,
  } = useSelector((state) => state.adminUpdate)
  useEffect(() => {
    if (successUpdated) {
      dispatch({ type: "ADMIN_UPDATE_RESET" })
      history.push("/admin/userlist")
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, user, userId, successUpdated, history])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      adminUpdateProfile({
        _id: userId,
        name,
        email,
        isAdmin,
      })
    )
  }
  return (
    <FormContainer>
      <Row>
        <Col>
          <h1>會員資料修改</h1>
        </Col>
      </Row>
      <Link to="/admin/userlist" className="py-3">
        回上一頁?
      </Link>
      {loadingUpdated && <Loader />}
      {errorUpdated && <Message>{errorUpdated}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="py-5">
          <Col md={4} className="mx-auto">
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>使用者名稱</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="請輸入名稱"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>信箱</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="請輸入信箱"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="admin">
                <Form.Check
                  type="checkbox"
                  label="設為管理員"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              <Button type="submit">送出</Button>
            </Form>
          </Col>
        </Row>
      )}
    </FormContainer>
  )
}

export default UserEditScreen
