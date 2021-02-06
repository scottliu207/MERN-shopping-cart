import React, { useState } from "react"
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { savePaymentMethod } from "../actions/cartActions"

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const [payment, setPayment] = useState("Paypal")
  const { shippingAddress } = cart
  if (!shippingAddress) {
    history.push("/shipping")
  }

  const submitHandler = () => {
    dispatch(savePaymentMethod(payment))
    history.push("/placeorder")
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="mb-5">付款方式</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">選擇付款方式</Form.Label>
          <Form.Check
            type="radio"
            label="Paypal or Credit Card"
            name="payal"
            id="paypal"
            value="Paypal"
            checked
            onChange={(event) => setPayment(event.target.value)}
          ></Form.Check>
        </Form.Group>
        <Button type="submit">下一步</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
