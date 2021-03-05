// Product list(admin only) and home screen products use same action, isAdmin is to check which screen pass the props in.
// Only ProductListScreen isAdmin = true.

import React from "react"
import { Pagination } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const PaginationContainer = ({
  pages,
  keyword = "",
  page,
  isAdmin = false,
}) => {
  // if no page was passed in, page will be 1.
  const pageNum = Number(page) || 1

  const nextPage = isAdmin
    ? `/admin/productlist/page/${pageNum + 1}`
    : keyword
    ? `/search/${keyword}/page/${pageNum + 1}`
    : `/page/${pageNum + 1}`

  const prevPage = isAdmin
    ? `/admin/productlist/page/${pageNum - 1}`
    : keyword
    ? `/search/${keyword}/page/${pageNum - 1}`
    : `/page/${pageNum - 1}`

  return (
    pages > 1 && (
      <Pagination>
        <LinkContainer to={prevPage}>
          <Pagination.Prev disabled={pageNum === 1} />
        </LinkContainer>
        {/* create pages length array to add functionality to each pagination. */}
        {/* x start from 0, so should + 1 to get the correct page */}
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

        <LinkContainer to={nextPage}>
          <Pagination.Next disabled={pageNum === pages} />
        </LinkContainer>
      </Pagination>
    )
  )
}

export default PaginationContainer
