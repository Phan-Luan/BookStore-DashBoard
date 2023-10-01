import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { deleteUser, getUsers } from "services/user";

function Users() {
  const [users, setUsers] = useState([]);

  const [UserName, setUserName] = useState("");

  const history = useHistory();
  const { search } = useLocation();
  useEffect(() => {
    const searchParam = new URLSearchParams(search).get("search") || "";
    getUsers(searchParam)
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [search]);

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    history.push(`/admin/users?search=${encodeURIComponent(UserName)}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };
  const handleDeleteUser = async (id) => {
    if (confirm("Bạn muốn xoá danh mục này?")) {
      deleteUser(id)
        .then((response) => {
          setUsers(users.filter((user) => user.id !== id));
          toast.success("Xoá thành công");
        })
        .catch((error) => {
          toast.warn("Đã xảy ra lỗi");
          console.error("Error fetching data:", error);
        });
    }
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <div className="d-flex align-items-center justify-content-between">
              <NavLink to="/admin/user/create" className="btn btn-info my-2">
                Thêm người dùng
              </NavLink>
              <Form.Group onSubmit={handleFormSubmit}>
                <Form.Control
                  placeholder="Search..."
                  type="text"
                  value={UserName}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                ></Form.Control>
              </Form.Group>
            </div>
            <Card className="strpied-tabled-with-hover">
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Avatar</th>
                      <th className="border-0">Phone</th>
                      <th className="border-0">Address</th>
                      <th className="border-0">Gender</th>
                      <th className="border-0" width={200}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>
                            <img
                              width={150}
                              src={item.image}
                              alt="User Image"
                            />
                          </td>
                          <td>{item.phone}</td>
                          <td>{item.address}</td>
                          <td>{item.gender == 0 ? "Male" : "Female"}</td>
                          <td width={300}>
                            <NavLink
                              className="btn btn-primary mx-2"
                              to={`/admin/user/update/${item.id}`}
                            >
                              Update
                            </NavLink>
                            <Button
                              className="btn btn-danger"
                              onClick={() => handleDeleteUser(item.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Users;
