import React from "react"
import { Pagination } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const PaginationContainer = ({
  pages,
  keyword = "",
  page,
  isAdmin = false,
}) => {
  const pageNum = Number(page)

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x}
            to={
              isAdmin
                ? `/admin/productlist/page/${x + 1}`
                : keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === pageNum}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default PaginationContainer
