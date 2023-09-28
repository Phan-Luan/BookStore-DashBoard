import { imageUpload } from "lib/handleImage";
import React, { useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { addCompany } from "services/company";

function CreateCompany() {
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const image = document.querySelector("#image").files[0];
    const description = document.querySelector("#description").value;
    const imageURL = await imageUpload(image);

    const formData = {
      name,
      image: imageURL,
      description,
    };
    addCompany(formData)
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
                <Card.Title as="h4">Create Company</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Company Name"
                          type="text"
                          id="name"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Image</label>
                        <Form.Control type="file" id="image"></Form.Control>
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
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button className="btn-fill " type="submit" variant="info">
                    Create Company
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

export default CreateCompany;
