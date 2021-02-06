import React from "react"
import { Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center my-2">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>
              <strong>登入</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>登入</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>
              <strong>寄送</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>寄送</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>
              <strong>付款</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>付款</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>
              <strong>結帳</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>結帳</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
