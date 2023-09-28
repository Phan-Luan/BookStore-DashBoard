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
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { deleteCompany } from "services/company";
import { getCompanies } from "services/company";
function Companies() {
  const [companies, setCompanies] = useState([]);

  const [companyName, setCompanyName] = useState("");

  const history = useHistory();
  const { search } = useLocation();
  useEffect(() => {
    const searchParam = new URLSearchParams(search).get("search") || "";
    getCompanies(searchParam)
      .then(({ data }) => {
        setCompanies(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [search]);

  const handleInputChange = (e) => {
    setCompanyName(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    history.push(`/admin/companies?search=${encodeURIComponent(companyName)}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };
  const handleDeleteCompany = async (id) => {
    if (confirm("Bạn muốn xoá danh mục này?")) {
      deleteCompany(id)
        .then((response) => {
          setCompanies(companies.filter((company) => company.id !== id));
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
              <NavLink to="/admin/company/create" className="btn btn-info my-2">
                Thêm nhà phát hành
              </NavLink>
              <Form.Group onSubmit={handleFormSubmit}>
                <Form.Control
                  placeholder="Search..."
                  type="text"
                  value={companyName}
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
                      <th className="border-0">Description</th>
                      <th className="border-0" width={200}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>
                            <img
                              width={150}
                              src={item.image}
                              alt="Company Image"
                            />
                          </td>
                          <td>{item.description}</td>
                          <td width={300}>
                            <NavLink
                              className="btn btn-primary mx-2"
                              to={`/admin/company/update/${item.id}`}
                            >
                              Update
                            </NavLink>
                            <Button
                              className="btn btn-danger"
                              onClick={() => handleDeleteCompany(item.id)}
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

export default Companies;
