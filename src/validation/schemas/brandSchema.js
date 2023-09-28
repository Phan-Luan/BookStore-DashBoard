import * as Yup from "yup";

const brandSchema = Yup.object().shape(
  {
    name: Yup.string().required("Tên nhà xuất bản không được để trống"),
    image: Yup.mixed().required("Ảnh không được để trống"),
    description: Yup.string().required("Mô tả không được để trống"),
  },
  { abortEarly: false }
);
const updateBrandSchema = Yup.object().shape(
  {
    name: Yup.string().required("Tên nhà xuất bản không được để trống"),
    description: Yup.string().required("Mô tả không được để trống"),
  },
  { abortEarly: false }
);
export { brandSchema, updateBrandSchema };
