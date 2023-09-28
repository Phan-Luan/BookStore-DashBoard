import { getCategory } from "services/category";
import { updateCategory } from "services/category";
import { imageUpload } from "lib/handleImage";
import { updateImage, getPublicIdFromUrl } from "lib/handleImage";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
function UpdateCategory() {
  const [categorie, setCategorie] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    getCategory(id)
      .then((response) => {
        setCategorie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlName = (e) => {
    setCategorie([{ ...categorie, name: e.target.value }]);
  };

  // Xử lý sự kiện khi chọn tệp hình ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const blob = new Blob([file], { type: file.type });
        const imageURL = URL.createObjectURL(blob);
        setCategorie({ ...categorie, newImage: imageURL });
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const image = document.querySelector("#inputGroupFile01").files[0];
    // const oldImage = getPublicIdFromUrl(categorie.image);
    // const imageURL = await imageUpload(image);
    const imageURL = await imageUpload(image);
    const formData = {
      id,
      name,
      image: imageURL,
    };
    updateCategory(formData)
      .then((response) => {
        setCategorie([{ name: "", image: null }]);
        toast.success("Cập nhật thành công");
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
                          value={categorie.name}
                          onChange={handlName}
                        ></Form.Control>
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
                        ></Form.Control>
                      </Form.Group>
                      {/* {categorie.image && (
                        <img width={100} src={categorie.image} alt="Selected" />
                      )} */}
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

export default UpdateCategory;
