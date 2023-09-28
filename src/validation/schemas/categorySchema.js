import * as Yup from "yup";

const categorySchema = Yup.object().shape(
  {
    name: Yup.string().required("Tên danh mục không được để trống"),
    image: Yup.mixed().required("Ảnh không được để trống"),
  },
  { abortEarly: false }
);
const updateCategorySchema = Yup.object().shape(
  {
    name: Yup.string().required("Tên danh mục không được để trống"),
  },
  { abortEarly: false }
);
export { categorySchema, updateCategorySchema };
