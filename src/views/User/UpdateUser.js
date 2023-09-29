import { imageUpload } from "lib/handleImage";
import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { getRoles } from "services/user";
import { updateUser } from "services/user";
import { getUser } from "services/user";
import { updateUserSchema } from "validation";

function UpdateUser() {
  const history = useHistory();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    address: "",
    phone: "",
    gender: "0",
    role_ids: [],
  });
  const [choose, setChoose] = useState({});

  useEffect(() => {
    getUser(id).then(({ data }) => {
      setUser({
        ...data,
        id: id,
        role_ids: data.roles.map((item) => item.id),
      });
    });
    getRoles().then(({ data }) => {
      setChoose(data);
    });
  }, [id]);

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

    if (type === "checkbox") {
      const numericValue = parseInt(value, 10);

      const updatedRoleIds = user.role_ids.includes(numericValue)
        ? user.role_ids.filter((id) => id !== numericValue)
        : [...user.role_ids, numericValue];

      setUser((prevData) => ({
        ...prevData,
        role_ids: updatedRoleIds,
      }));
    } else {
      if (name === "image") {
        const imageURL = event.target.files[0];
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateUserSchema
      .validate(user, { abortEarly: false })
      .then(async () => {
        const newImage = await imageUpload(user.image);

        const updatedUser = {
          ...user,
          image: newImage,
        };
        updateUser(updatedUser)
          .then((response) => {
            toast.success("Cập nhật thành công");
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
                <Card.Title as="h4">Update User</Card.Title>
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
                  <Row>
                    <Col md="12">
                      <Form.Group controlId="formBasicCheckbox">
                        {Object.keys(choose).map((key) => (
                          <div key={key}>
                            <h3>{key}</h3>
                            {choose[key].map((item) => (
                              <div key={item.id}>
                                <Form.Check
                                  type="checkbox"
                                  label={item.display_name}
                                  value={parseInt(item.id, 10)}
                                  name="role_ids[]"
                                  id={item.id.toString()}
                                  checked={
                                    user.role_ids &&
                                    user.role_ids
                                      .map((id) => id)
                                      .includes(item.id)
                                  }
                                  onChange={handleChange}
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button className="btn-fill" type="submit" variant="info">
                    Update User
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

export default UpdateUser;
