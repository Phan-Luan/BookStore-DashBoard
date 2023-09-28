import { updateCategory } from "services/category";
import { imageUpload } from "lib/handleImage";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { getCompany } from "services/company";
import { updateCompany } from "services/company";
import { toast } from "react-toastify";
import { updateBrandSchema } from "validation";

function UpdateCompany() {
  const [company, setCompany] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  useEffect(() => {
    getCompany(id)
      .then((response) => {
        setCompany(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({
      ...company,
      [name]: value,
    });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const blob = new Blob([file], { type: file.type });
        const imageURL = URL.createObjectURL(blob);
        setCompany({
          ...company,
          newImage: imageURL,
        });
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const image = document.querySelector("#inputGroupFile01").files[0];
    const description = document.querySelector("#description").value;
    // const oldImage = getPublicIdFromUrl(company.image);
    // const imageURL = await imageUpload(image);
    const imageURL = await imageUpload(image);
    const formData = {
      id,
      name,
      image: imageURL,
      description,
    };
    updateBrandSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        updateCompany(formData)
          .then((response) => {
            setCompany([{ name: "", image: null }]);
            toast.success("Cập nhật thành công");
            history.goBack();
          })
          .catch(({ response }) => {
            if (response.status == 422) {
              setErrors({ name: "Tên nhà phát hành đã tồn tại" });
            }
          });
      })
      .catch((validationErrors) => {
        const validationErrorsObj = {};
        validationErrors.inner.forEach((error) => {
          validationErrorsObj[error.path] = error.message;
        });
        setErrors(validationErrorsObj);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Update Category</Card.Title>
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
                          value={company.name}
                          onChange={handleChange}
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
                      <Form.Group>
                        <label>Description</label>
                        <Form.Control
                          placeholder="Description"
                          type="text"
                          id="description"
                          name="description"
                          value={company.description}
                          onChange={handleChange}
                          isInvalid={!!errors.description}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
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
                          id="inputGroupFile01"
                          onChange={handleImageChange}
                          isInvalid={!!errors.image}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.image}
                        </Form.Control.Feedback>
                      </Form.Group>
                      {company.image && (
                        <img width={100} src={company.image} alt="Selected" />
                      )}
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill mt-2"
                    type="submit"
                    variant="info"
                  >
                    Update
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

export default UpdateCompany;
