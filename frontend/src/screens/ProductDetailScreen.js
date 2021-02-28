import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import { productListDetails } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

const ProductDetailScreen = ({ match }) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [description, setDescription] = useState("")

  const dispatch = useDispatch()
  const productId = match.params.id
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    if (!product || !product.name || productId !== product._id) {
      dispatch(productListDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setCategory(product.category)
      setBrand(product.brand)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [dispatch, product, productId])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log("submit")
  }
  return (
    <>
      <Row>
        <Col>
          <h1>商品</h1>
        </Col>
      </Row>
      <Link to="/admin/productlist">回上一頁?</Link>
      <FormContainer>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>名稱</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="請輸入商品名稱"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>價格</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="請輸入商品價格"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Group>
                <Form.Label>庫存</Form.Label>
                <Form.Control
                  type="number"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  placeholder="請輸入商品庫存"
                ></Form.Control>
              </Form.Group>
              <Form.Label>分類</Form.Label>
              <Form.Control
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="請輸入商品分類"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>品牌</Form.Label>
              <Form.Control
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="請輸入商品品牌"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>敘述</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={description}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="請輸入商品敘述"
              ></Form.Control>
            </Form.Group>
            <Button type="submit">送出</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
export default ProductDetailScreen
