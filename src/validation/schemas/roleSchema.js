import * as Yup from "yup";

const roleSchema = Yup.object().shape(
  {
    name: Yup.string().required("Tên role không được để trống"),
    display_name: Yup.string().required("Không được để trống"),
  },
  { abortEarly: false }
);
const updateRoleSchema = Yup.object().shape(
  {
    name: Yup.string().required("Tên role không được để trống"),
    display_name: Yup.string().required("Không được để trống"),
  },
  { abortEarly: false }
);
export { roleSchema, updateRoleSchema };
