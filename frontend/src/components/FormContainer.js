import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const FormContainer = ({ children }) => {
  return (
    <Container className="py-3">
      <Row className="justify-content-md-center">
        <Col sx={12} md={4}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
