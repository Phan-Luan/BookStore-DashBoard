import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { editRole } from "services/Role";
import { getPermission } from "services/Role";
import { detailRole } from "services/Role";

function UpdateRole() {
  const history = useHistory();
  const { id } = useParams();
  const [errorMessages, setErrorMessages] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    group: "",
    permission_ids: [], // Khởi tạo là một mảng rỗng
  });
  const [choose, setChoose] = useState([]);

  const handleInputChange = (event) => {
    const { name, value, type, files, checked } = event.target;
  
    if (type === "checkbox") {
      // Chuyển đổi giá trị value thành kiểu số
      const numericValue = parseInt(value, 10);
  
      // Nếu là checkbox, thêm hoặc loại bỏ giá trị vào mảng role_ids
      const updatedPermissionIds = formData.permission_ids.includes(numericValue)
        ? formData.permission_ids.filter((id) => id !== numericValue)
        : [...formData.permission_ids, numericValue];
  
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
  console.log(formData);

  useEffect(() => {
    // Lấy thông tin role hiện tại từ máy chủ dựa vào roleId
    detailRole(id).then(({data}) => {
      setFormData({
        name: data.name,
        display_name: data.display_name,
        group: data.group,
        permission_ids: data.permissions.map((item)=> item.id),
      });
    });

    // Lấy danh sách permissions cho checkbox
    getPermission().then(({data}) => {
      setChoose(data);
    });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Gửi dữ liệu chỉnh sửa lên máy chủ
      await editRole(formData, id);

      history.push("/admin/roles");
    } catch (error) {
      // Xử lý lỗi nếu cần thiết
      // console.error("Error updating role:", error);
      // setErrorMessages(error.response.data.errors); // Cập nhật thông báo lỗi từ máy chủ
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Role</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form id="form-edit" onSubmit={handleSubmit}>
                  {/* Các trường thông tin để chỉnh sửa */}
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Name"
                          name="name"
                          type="text"
                          value={formData.name}
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
                          value={formData.display_name}
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
                          name="group"
                          value={formData.group}
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
                      <Form.Group controlId="formBasicCheckbox">
                        {/* Checkbox cho permissions */}
                        {Object.keys(choose).map((key) => (
                          <div key={key}>
                            <h3>{key}</h3>
                            {choose[key].map((item) => (
                              <div key={item.id}>
                                <Form.Check
                                  type="checkbox"
                                  label={item.display_name}
                                  value={item.id.toString()}
                                  name="permission_ids[]"
                                  id={item.id.toString()}
                                  checked={
                                    formData.permission_ids &&
                                    formData.permission_ids.map((id) => id.toString()).includes(item.id.toString())
                                  }
                                  
                                  onChange={handleInputChange}
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button className="btn-fill" type="submit" variant="info">
                    Save Changes
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

export default UpdateRole;