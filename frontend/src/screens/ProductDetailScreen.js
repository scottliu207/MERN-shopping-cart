// Admin only, product detail edit screen.

import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col, Form, Button } from "react-bootstrap"
import Loader from "../components/Loader"
import Message from "../components/Message"
import FormContainer from "../components/FormContainer"
import { Link } from "react-router-dom"
import { productListDetails, updateProduct } from "../actions/productActions"
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_RESET,
} from "../constants/productConstants"
import axios from "axios"

const ProductDetailScreen = ({ match, history }) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [countInStock, setCountInStock] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [brand, setBrand] = useState("")
  const [description, setDescription] = useState("")
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const productId = match.params.id
  const { userInfo } = useSelector((state) => state.userLogin)
  const productDetails = useSelector((state) => state.productDetails)
  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading, error, product } = productDetails
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (successUpdate) {
        history.push("/admin/productlist")
        dispatch({
          type: PRODUCT_UPDATE_RESET,
        })
        dispatch({
          type: PRODUCT_DETAILS_RESET,
        })
      } else {
        if (!product || !product.name || productId !== product._id) {
          dispatch(productListDetails(productId))
        } else {
          setName(product.name)
          setPrice(product.price)
          setCategory(product.category)
          setBrand(product.brand)
          setImage(product.image)
          setCountInStock(product.countInStock)
          setDescription(product.description)
        }
      }
    } else {
      history.push("/login")
    }
  }, [dispatch, product, productId, history, successUpdate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: product._id,
        name,
        price,
        countInStock,
        image,
        category,
        brand,
        description,
      })
    )
  }

  const uploadHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)

    setUploading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }

      const { data } = await axios.post("/api/upload", formData, config)
      console.log(data)
      setImage(data)
      setUploading(false)
    } catch (error) {
      setUploading(false)
      console.log(error)
    }
  }
  return (
    <>
      <Row>
        <Col>
          <h1>商品</h1>
        </Col>
      </Row>
      <Link to="/admin/productlist" className="btn btn-light btn-sm">
        回上一頁?
      </Link>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
              <Form.Label>庫存</Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                placeholder="請輸入商品庫存"
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>圖片</Form.Label>
              <Form.Control
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="請輸入商品連結"
              ></Form.Control>
              <Form.File onChange={uploadHandler}></Form.File>
            </Form.Group>

            <Form.Group>
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
                onChange={(e) => setDescription(e.target.value)}
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
