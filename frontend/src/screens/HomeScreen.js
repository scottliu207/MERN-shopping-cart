import React, { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions"
import PaginationContainer from "../components/PaginationContainer"

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch()
  const keyword = match.params.keyword
  const pageNum = match.params.pageNum

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNum))
  }, [dispatch, keyword, pageNum])

  return (
    <div>
      <h1>Welcome to Max</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h3>最新商品</h3>
          <Row md={8}>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <PaginationContainer keyword={keyword} pages={pages} page={pageNum} />
        </>
      )}
    </div>
  )
}

export default HomeScreen
