import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Loader"

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)

  const redirect = location.search ? location.search.split("=")[1] : "/"
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
      window.location.reload()
    }
  }, [userInfo, redirect, history])

  const submitHandler = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setMessage("密碼與確認密碼不相同")
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form className="my-3" onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>使用者名稱</Form.Label>
          <Form.Control
            type="name"
            placeholder="請輸入使用者名稱"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>使用者信箱</Form.Label>
          <Form.Control
            type="email"
            placeholder="請輸入使用者信箱"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>密碼</Form.Label>
          <Form.Control
            type="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>確認密碼</Form.Label>
          <Form.Control
            type="password"
            placeholder="請再次輸入密碼"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit">註冊</Button>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
