import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()

    if (keyword) {
      history.push(`/search/${keyword}`)
      setKeyword("")
    } else {
      history.push("/")
    }
  }
  return (
    <Form inline onSubmit={submitHandler}>
      <Form.Control
        placeholder="請輸入關鍵字..."
        size="sm"
        className="mr-sm-2 pr-sm-5 ml-sm-5"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button style={{ display: "none" }}>搜尋</Button>
    </Form>
  )
}

export default Search
