import { imageUpload } from "lib/handleImage";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addUser } from "services/user";
import { getRoles } from "services/user";
import { userSchema } from "validation";
import { toast } from "react-toastify";

function CreateUser() {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    address: "",
    phone: "",
    gender: "0",
    role_ids: [],
  });

  const [choose, setChoose] = useState({});

  const { name, email, password, address, phone, gender, image, role_ids } =
    formData;

  const handleInputChange = async (event) => {
    const { name, value, type, files, checked } = event.target;

    if (type === "checkbox") {
      // Nếu là checkbox, thêm hoặc loại bỏ giá trị vào mảng role_ids
      const updatedRoleIds = formData.role_ids.includes(value)
        ? formData.role_ids.filter((id) => id !== value)
        : [...formData.role_ids, value];

      setFormData((prevData) => ({
        ...prevData,
        role_ids: updatedRoleIds,
      }));
    } else {
      if (name === "image") {
        const imageURL = event.target.files[0];
        setFormData({
          ...formData,
          [name]: imageURL,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };

  useEffect(() => {
    getRoles().then(({ data }) => {
      setChoose(data);
    });
  }, []);

  const ListCheck = ({ object }) => {
    return (
      <>
        {Object.keys(object).map((key) => (
          <div key={key}>
            <h3>{key}</h3>
            {object[key].map((item) => (
              <div key={item.id}>
                <Form.Check
                  type="checkbox"
                  label={item.display_name}
                  value={item.id.toString()} // Đặt value là id của role
                  name="role_ids[]" // Đặt name là "role_ids[]" để chúng được nhóm vào một mảng
                  id={item.id.toString()}
                  checked={formData.role_ids.includes(item.id.toString())} // Kiểm tra xem checkbox có nên được chọn hay không
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
        ))}
      </>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formCheck = {
      ...formData,
      image: document.querySelector("#image").files[0],
    };
    userSchema
      .validate(formCheck, { abortEarly: false })
      .then(async () => {
        // Sử dụng imageUpload để tải lên hình ảnh mới
        const newImage = await imageUpload(formCheck.image);

        // Tạo một đối tượng mới để thêm người dùng với hình ảnh mới
        const newUser = {
          ...formData,
          image: newImage,
        };

        addUser(newUser)
          .then((response) => {
            toast.success("Thêm thành công");
            history.push("/users"); // Chuyển hướng đến trang danh sách người dùng sau khi thêm thành công
          })
          .catch(({ response }) => {
            console.log(response);
            if (response && response.status === 422) {
              setErrors({ email: "Email đã tồn tại" });
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
                          value={name}
                          onChange={handleInputChange}
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
                          value={email}
                          onChange={handleInputChange}
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
                          value={password}
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
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
                          value={address}
                          onChange={handleInputChange}
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
                          value={phone}
                          onChange={handleInputChange}
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
                          value={gender}
                          onChange={handleInputChange}
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
                        <ListCheck object={choose} />
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
