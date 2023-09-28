import * as Yup from "yup";

const userSchema = Yup.object().shape(
  {
    name: Yup.string().required("Tên người dùng không được để trống"),
    email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
    image: Yup.mixed().required("Ảnh không được để trống"),
    address: Yup.string().required("Địa chỉ không được để trống"),
    phone: Yup.string()
      .matches(/^(0[1-9][0-9]{8})$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại không được để trống"),
    password: Yup.string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .required("Mật khẩu không được để trống"),
  },
  { abortEarly: false }
);
const updateUserSchema = Yup.object().shape(
  {
    name: Yup.string().required("Tên người dùng không được để trống"),
    email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
    address: Yup.string().required("Địa chỉ không được để trống"),
    phone: Yup.string()
      .matches(/^(0[1-9][0-9]{8})$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại không được để trống"),
  },
  { abortEarly: false }
);
export { userSchema, updateUserSchema };
