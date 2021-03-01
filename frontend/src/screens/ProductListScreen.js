//Admin only, get product list screen.

import React, { useEffect } from "react"
import { Row, Col, Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { PRODUCT_CREATE_RESET } from "../constants/productConstants"

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)
  const productList = useSelector((state) => state.productList)
  const productCreate = useSelector((state) => state.productCreate)
  const productDelete = useSelector((state) => state.productDelete)

  const { loading, error, products } = productList
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product,
  } = productCreate

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push("/login")
    }
    if (successCreate) {
      history.push(`/admin/productlist/${product._id}/edit`)
      dispatch({ type: PRODUCT_CREATE_RESET })
    }
  }, [dispatch, userInfo, history, successDelete, product, successCreate])

  const deleteHandler = (id) => {
    if (window.confirm("確定要刪除商品嗎?")) {
      dispatch(deleteProduct(id))
    }
  }
  const createHandler = () => {
    dispatch(createProduct())
  }
  return (
    <>
      <Row>
        <Col>
          <h1>商品</h1>
        </Col>
        <Col className="text-right">
          <Button onClick={createHandler}>
            <i className="fas fa-plus"></i> 新增商品
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{error}</Message>}

      {loadingDelete && <Loader />}
      {errorDelete && <Message>{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="py-3">
          <Col>
            <Table
              responsive
              striped
              bordered
              hover
              size="sm"
              className="text-center"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>名稱</th>
                  <th>價格</th>
                  <th>庫存</th>
                  <th>分類</th>
                  <th>品牌</th>
                  <th colSpan={2}>Edit</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.countInStock}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/productlist/${product._id}/edit`}
                      >
                        <Button size="sm" variant="secondery">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductListScreen
