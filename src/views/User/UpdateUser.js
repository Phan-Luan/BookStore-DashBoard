import { imageUpload } from "lib/handleImage";
import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { updateUser } from "services/user";
import { getUser } from "services/user";
import { addUser } from "services/user";

function UpdateUser() {
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    address: "",
    phone: "",
    gender: "male",
  });

  useEffect(() => {
    getUser(id).then(({data}) => {
      setUser({...data,id:id});
    });
  }, [id]);

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
    updateUser(user)
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
                        />
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
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Image</label>
                        <Form.Control
                          type="file"
                          id="image"
                          name="image"
                          onChange={handleChange}
                        />
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
                        />
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
                        />
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

export default UpdateUser;
