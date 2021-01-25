import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../actions/cartActions"
import { Row, Col, Form, Button, ListGroup, Card, Image} from "react-bootstrap"
import { Link } from "react-router-dom"
import Message from "../components/Message"

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id
    
    const qty = location.search ? Number(location.search.split("=")[1]) : 1
    
    const dispatch = useDispatch()

    const getCartItems = useSelector(state => state.cart)
    
    const { cartItems } = getCartItems


    useEffect(() => {
        productId && (
            dispatch(addToCart(productId, qty))
        )
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push(`/login?redirect=shipping`)
    }

    return (
        <Row>
            <Col md={8}>
                {cartItems.length === 0 ? 
                <Message>購物車是空的
                    <Link to="/"> 回首頁?</Link>
                </Message> : (

                    <ListGroup variant="flush">
                        {cartItems.map(item=>(
                            <ListGroup.Item key={item.product_id}>
                                <Row>
                                    <Col md={2}>
                                    <Image src={item.image} fluid></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product_id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control 
                                        as='select' 
                                        value={ item.qty } 
                                        onChange={(event) => {
                                                dispatch(addToCart(item.product_id, Number(event.target.value)))
                                            }}>
                                                {[...Array(item.countInStock).keys()].map(x=> (
                                                <option key={x+1} value={x+1}> {x+1} </option>
                                                ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type="button" variant="light" onClick={()=> removeFromCartHandler(item.product_id)}><i className="fas fa-trash"></i></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    )
                }
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>全部商品 {cartItems.reduce((acc, item)=> acc + item.qty, 0)} 件</h3>
                            <h4>${cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0)}</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" onClick={checkoutHandler}>去結帳</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

        </Row>
    )
}

export default CartScreen