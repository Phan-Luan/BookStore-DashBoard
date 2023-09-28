import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { postRole } from "services/Role";
import { getPermission } from "services/Role";

function CreateRole() {
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    group: "",
    permission_ids: [],
  });
  const [choose, setChoose] = useState({});
  const { name, display_name, group, permission_ids } = formData;

  const handleInputChange = (event) => {
    const { name, value, type, files, checked } = event.target;

    if (type === "checkbox") {
      // Nếu là checkbox, thêm hoặc loại bỏ giá trị vào mảng permission_ids
      const updatedPermissionIds = formData.permission_ids.includes(value)
        ? formData.permission_ids.filter((id) => id !== value)
        : [...formData.permission_ids, value];

      setFormData((prevData) => ({
        ...prevData,
        permission_ids: updatedPermissionIds,
      }));
    } else {
      // Nếu là các trường dữ liệu khác, xử lý bình thường
      const newValue = type === "file" ? files[0] : value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  useEffect(() => {
    getPermission().then(({data}) => {
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
                  value={item.id.toString()} // Đặt value là id của permission
                  name="permission_ids[]" // Đặt name là "permission_ids[]" để chúng được nhóm vào một mảng
                  id={item.id.toString()}
                  checked={formData.permission_ids.includes(item.id.toString())} // Kiểm tra xem checkbox có nên được chọn hay không
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

    try {
      // await validationSchema.validate(formData, { abortEarly: false });

      await postRole(formData);

      history.push("/admin/roles");
    } catch (error) {
      // If validation fails, update the error messages
      // const errors = {};
      // error.inner.forEach((e) => {
      //   errors[e.path] = e.message;
      // });
      // setErrorMessages(errors);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Create Role</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form id="form-add" onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Name"
                          name="name"
                          type="text"
                          value={name}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>display_name</label>
                        <Form.Control
                          placeholder="display_name"
                          name="display_name"
                          type="text"
                          value={display_name}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>group</label>
                        <Form.Control
                          as="select"
                          defaultValue=""
                          name="group"
                          onChange={handleInputChange}
                        >
                          <option value="">Choose</option>
                          <option value="system">System</option>
                          <option value="user">User</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group
                        controlId="formBasicCheckbox"
                        className="d-flex justify-content-between"
                      >
                        {<ListCheck object={choose} />}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button className="btn-fill" type="submit" variant="info">
                    Create Role
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

export default CreateRole;
