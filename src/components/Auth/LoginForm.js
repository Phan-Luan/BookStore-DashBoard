import { error } from "jquery";
import React, { useEffect, useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { login } from "services/auth";

const LoginForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(
    sessionStorage.setItem("token", ""),
    sessionStorage.setItem("tokenTimestamp", "")
  );
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: null,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let error_pw = "Sai mật khẩu";
    login(formData)
      .then(({ data }) => {
        sessionStorage.setItem("token", data.data.token);
        sessionStorage.setItem("tokenTimestamp", data.data.token_timestamp);
        history.push("books");
        setFormData({
          email: "",
          password: "",
        });
      })
      .catch(({ response }) => {
        response.status == 500
          ? setErrors({ ...errors, password: [error_pw] })
          : setErrors(response.data.errors);
      });
  };

  return (
    <>
      <Container className="col-3">
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Login</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          placeholder="Email category"
                          type="text"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {errors.email && (
                          <span className="error text-danger">
                            {errors.email[0]}
                          </span>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          type="password"
                          id="password"
                          name="password"
                          onChange={handleInputChange}
                        />
                        {errors.password && (
                          <span className="error text-danger">
                            {errors.password[0]}
                          </span>
                        )}
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
};

export default LoginForm;
