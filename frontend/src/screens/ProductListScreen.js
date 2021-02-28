import React, { useEffect } from "react"
import { Row, Col, Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { listProducts, deleteProduct } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)
  const productList = useSelector((state) => state.productList)
  const productDelete = useSelector((state) => state.productDelete)

  const { loading, error, products } = productList
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push("/login")
    }
  }, [dispatch, userInfo, history, successDelete])

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id))
  }
  return (
    <>
      <Row>
        <Col>
          <h1>商品</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to="/admin/product">
            <Button>
              <i className="fas fa-plus"></i> Create new Item
            </Button>
          </LinkContainer>
        </Col>
      </Row>
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
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th colSpan={2}>Edit</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>$ {product.price}</td>
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
