import React from "react"
import { Container } from "react-bootstrap"
const Footer = () => {

    const currentYear = new Date().getFullYear()

    return (
        <Container className="text-center py-3">
            <footer>Copyright &copy; {currentYear} MaxMMA</footer>
        </Container>
    )
}

export default Footer