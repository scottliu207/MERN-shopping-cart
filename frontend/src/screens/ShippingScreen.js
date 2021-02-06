import React, { useState } from "react"
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from "../actions/cartActions"

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (event) => {
    event.preventDefault()

    dispatch(
      saveShippingAddress({
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
      })
    )
    history.push("/payment")
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>寄送資訊</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>地址</Form.Label>
          <Form.Control
            type="text"
            value={address}
            placeholder="請輸入寄送地址"
            required
            onChange={(event) => setAddress(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>城市</Form.Label>
          <Form.Control
            type="text"
            value={city}
            placeholder="請輸入居住城市"
            required
            onChange={(event) => setCity(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>郵遞區號</Form.Label>
          <Form.Control
            type="text"
            value={postalCode}
            placeholder="請輸入郵遞區號"
            required
            onChange={(event) => setPostalCode(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>國家</Form.Label>
          <Form.Control
            type="text"
            value={country}
            placeholder="請輸入居住國家"
            required
            onChange={(event) => setCountry(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">下一步</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
