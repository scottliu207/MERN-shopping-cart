import React, { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { listProducts, getTopProducts } from "../actions/productActions"
import Product from "../components/Product"
import Loader from "../components/Loader"
import Message from "../components/Message"
import PaginationContainer from "../components/PaginationContainer"
import ProductCarousel from "../components/ProductCarousel"

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch()
  const keyword = match.params.keyword
  const pageNum = match.params.pageNum

  const productList = useSelector((state) => state.productList)
  const topProducts = useSelector((state) => state.productTop)

  const { loading, error, products, pages } = productList
  const {
    loading: loadingTop,
    error: errorTop,
    products: productsTop,
  } = topProducts

  useEffect(() => {
    dispatch(listProducts(keyword, pageNum))
    dispatch(getTopProducts())
  }, [dispatch, keyword, pageNum])

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {loadingTop ? (
            <Loader />
          ) : errorTop ? (
            <Message variant="danger">{errorTop}</Message>
          ) : (
            productsTop && <ProductCarousel productsTop={productsTop} />
          )}

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
