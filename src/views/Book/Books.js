import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { deleteBook } from "services/book";
import { getBooks } from "services/book";
function Books() {
  const [books, setBooks] = useState([]);

  const [bookName, setBookName] = useState("");

  const history = useHistory();
  const { search } = useLocation();
  useEffect(() => {
    const searchParam = new URLSearchParams(search).get("search") || "";
    getBooks(searchParam)
      .then(({ data }) => {
        setBooks(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [search]);

  const handleInputChange = (e) => {
    setBookName(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    history.push(`/admin/books?search=${encodeURIComponent(bookName)}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };
  const handleDeleteBook = async (id) => {
    if (confirm("Bạn muốn xoá danh mục này?")) {
      deleteBook(id)
        .then((response) => {
          setBooks(books.filter((category) => category.id !== id));
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
              <NavLink to="/admin/book/create" className="btn btn-info my-2">
                Thêm sách
              </NavLink>
              <Form.Group onSubmit={handleFormSubmit}>
                <Form.Control
                  placeholder="Search..."
                  type="text"
                  value={bookName}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                ></Form.Control>
              </Form.Group>
            </div>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Striped Table with Hover</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped table-bordered">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Description</th>
                      <th className="border-0">Public date</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">Number Of Page</th>
                      <th className="border-0">Quantity</th>
                      <th className="border-0">Price</th>
                      <th className="border-0">Sale price</th>
                      <th className="border-0">Author</th>
                      <th className="border-0">Company</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          <img src={item.image} alt="Book Image" width={100} />
                        </td>
                        <td
                          style={{
                            maxWidth: "200px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.description}
                        </td>
                        <td>{item.public_date}</td>
                        <td>{item.category.name}</td>
                        <td>{item.number_of_page}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price} VND</td>
                        <td>{item.sale_price} VND</td>
                        <td>{item.author}</td>
                        <td>{item.brand.name}</td>
                        <td width={210}>
                          <NavLink
                            className="btn btn-primary mx-2"
                            to={`/admin/book/update/${item.id}`}
                          >
                            Update
                          </NavLink>
                          <Button
                            className="btn btn-danger"
                            onClick={() => handleDeleteBook(item.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
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

export default Books;
