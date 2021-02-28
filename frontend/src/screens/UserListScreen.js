import React, { useEffect } from "react"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useDispatch, useSelector } from "react-redux"
import { adminDelUser, getUserList } from "../actions/userActions"
import { Table, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { userInfo } = useSelector((state) => state.userLogin)
  const userDelete = useSelector((state) => state.userDelete)
  const { loading, error, users } = userList
  const { success: successDelete } = userDelete

  const deleteHandler = (id) => {
    if (window.confirm("確定要刪除使用者嗎?")) {
      dispatch(adminDelUser(id))
    }
  }
  useEffect(() => {
    if (userInfo && userInfo.isAdmin === true) {
      dispatch(getUserList())
    } else {
      history.push("/login")
    }
  }, [dispatch, userInfo, history, successDelete])

  return (
    <div>
      <h1>使用者管理</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          bordered
          responsive
          striped
          hover
          size="sm"
          className="text-center my-3"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>名稱</th>
              <th>email</th>
              <th>管理員</th>
              <th colSpan="2">編輯</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/userlist/${user._id}/edit`}>
                    <Button variant="secondery" size="sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default UserListScreen
