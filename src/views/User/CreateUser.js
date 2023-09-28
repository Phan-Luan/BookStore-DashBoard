import { imageUpload } from "lib/handleImage";
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { addUser } from "services/user";
import { userSchema } from "validation";

function CreateUser() {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    address: "",
    phone: "",
    password: "",
    gender: "male",
  });
  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      const imageURL = await imageUpload(e.target.files[0]);
      setUser({
        ...user,
        [name]: imageURL,
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...user,
      image: document.querySelector("#image").files[0],
    };
    userSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        addUser(user)
          .then((response) => {
            toast.success("Thêm thành công");
            history.goBack();
          })
          .catch(({ response }) => {
            if (response.status == 422) {
              setErrors({ email: "Email đã được sử dụng" });
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
                <Card.Title as="h4">Create User</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Name"
                          type="text"
                          id="name"
                          name="name"
                          value={user.name}
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
                        <label>Email</label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                          id="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          placeholder="Password"
                          type="password"
                          id="password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          isInvalid={!!errors.password}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
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
                          onChange={handleChange}
                          isInvalid={!!errors.image}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.image}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          placeholder="Address"
                          type="text"
                          id="address"
                          name="address"
                          value={user.address}
                          onChange={handleChange}
                          isInvalid={!!errors.address}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Phone</label>
                        <Form.Control
                          placeholder="Phone"
                          type="tel"
                          id="phone"
                          name="phone"
                          value={user.phone}
                          onChange={handleChange}
                          isInvalid={!!errors.phone}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Gender</label>
                        <Form.Control
                          as="select"
                          name="gender"
                          value={user.gender}
                          onChange={handleChange}
                        >
                          <option value="0">Male</option>
                          <option value="1">Female</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button className="btn-fill" type="submit" variant="info">
                    Create User
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

export default CreateUser;
