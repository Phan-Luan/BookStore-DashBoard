import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { addBook } from "services/book";
import { getCategories } from "services/category";
import { getCompanies } from "services/company";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { imageUpload } from "lib/handleImage";

function CreateBook() {
  const { handleSubmit, control, setValue } = useForm();
  const [categories, setCategories] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);
  const history = useHistory();
  React.useEffect(() => {
    getCategories()
      .then(({ data }) => setCategories(data.data))
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    getCompanies()
      .then(({ data }) => setCompanies(data.data))
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("image", file);
    }
  };
  const onSubmit = async (data) => {
    const imageURL = await imageUpload(data.image);
    data.image = imageURL;
    addBook(data)
      .then((response) => {
        toast.success("Thêm thành công");
        history.goBack();
      })
      .catch((error) => {
        console.error("Error sending data to API:", error);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Create Book</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Controller
                          name="name"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              placeholder="Book Name"
                              type="text"
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group className="custom-file">
                        <label>Image</label>
                        <Form.Control
                          type="file"
                          id="image"
                          name="image"
                          onChange={handleImageChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Description</label>
                        <Controller
                          name="description"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              placeholder="Description"
                              type="text"
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Public Date</label>
                        <Controller
                          name="public_date"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control {...field} type="date" />
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Category</label>
                        <Controller
                          name="category_id"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control {...field} as="select">
                              <option>Select Option</option>
                              {categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Form.Control>
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Number Of Page</label>
                        <Controller
                          name="number_of_page"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              placeholder="123"
                              type="number"
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Quantity</label>
                        <Controller
                          name="quantity"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              placeholder="123"
                              type="number"
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Price</label>
                        <Controller
                          name="price"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              placeholder="123"
                              type="number"
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Sale Price</label>
                        <Controller
                          name="sale_price"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              placeholder="123"
                              type="number"
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Author</label>
                        <Controller
                          name="author"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              placeholder="Nguyễn Văn A"
                              type="text"
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Company</label>
                        <Controller
                          name="brand_id"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control {...field} as="select">
                              <option>Select Option</option>
                              {companies.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Form.Control>
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button className="btn-fill" type="submit" variant="info">
                    Create Book
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateBook;
