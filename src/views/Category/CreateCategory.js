import { getPublicIdFromUrl } from "lib/handleImage";
import { imageUpload } from "lib/handleImage";
import React from "react";
import { useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { addCategory } from "services/category";
import { categorySchema } from "validation";

function CreateCategory() {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const validate = async (name, image) => {
    try {
      const error = await categorySchema.validate({ name, image });
      console.log(error);
      setErrors({});
      return true;
    } catch (err) {
      const fieldErrors = {};
      err.inner.forEach((e) => {
        fieldErrors[e.path] = e.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const image = document.querySelector("#image").files[0];
    const imageURL = await imageUpload(image);
    // console.log(getPublicIdFromUrl(imageURL));

    const isValid = await validate(name, image);
    if (!isValid) {
      return;
    }
    const formData = {
      name,
      image: imageURL,
    };
    addCategory(formData)
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
                <Card.Title as="h4">Create Category</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Name category"
                          type="text"
                          id="name"
                          name="name"
                          isInvalid={!!errors.name}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
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
                          isInvalid={!!errors.image}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.image}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill mt-2"
                    type="submit"
                    variant="info"
                  >
                    Create
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

export default CreateCategory;
