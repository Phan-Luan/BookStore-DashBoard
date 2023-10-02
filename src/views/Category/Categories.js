import axios from "axios";
import { getCategories } from "services/category";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  FormText,
  Form,
} from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { toast } from "react-toastify";
import { deleteCategory } from "services/category";
import { deleteImage } from "lib/handleImage";
import { getCategory } from "services/category";
import { getPublicIdFromUrl } from "lib/handleImage";
import {
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
function Categories() {
  const [categories, setCategories] = useState([]);

  const [categoryName, setCategoryName] = useState("");

  const history = useHistory();
  const { search } = useLocation();
  useEffect(() => {
    const searchParam = new URLSearchParams(search).get("search") || "";
    getCategories(searchParam)
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [search]);

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    history.push(
      `/admin/categories?search=${encodeURIComponent(categoryName)}`
    );
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };
  const handleDeleteCategory = async (id) => {
    if (confirm("Bạn muốn xoá danh mục này?")) {
      // const { data } = await getCategory(id);
      // const image = data.image;
      // const imageID = getPublicIdFromUrl(image);
      // console.log(imageID);
      // await deleteImage(imageID);
      deleteCategory(id)
        .then((response) => {
          setCategories(categories.filter((category) => category.id !== id));
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
              <NavLink
                to="/admin/category/create"
                className="btn btn-info my-2"
              >
                Thêm danh mục
              </NavLink>
              <Form.Group onSubmit={handleFormSubmit}>
                <Form.Control
                  placeholder="Search..."
                  type="text"
                  value={categoryName}
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
                      <th className="border-0">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>
                            <img
                              width={150}
                              src={item.image}
                              alt="Category Image"
                            />
                          </td>
                          <td width={300}>
                            <NavLink
                              className="btn btn-primary mx-2"
                              to={`/admin/category/update/${item.id}`}
                            >
                              Update
                            </NavLink>
                            <Button
                              className="btn btn-danger"
                              onClick={() => handleDeleteCategory(item.id)}
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

export default Categories;
