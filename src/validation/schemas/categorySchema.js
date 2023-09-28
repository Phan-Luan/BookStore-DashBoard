import * as Yup from "yup";

const categorySchema = Yup.object().shape(
  {
    image: Yup.mixed().required("Ảnh không được để trống"),
    name: Yup.string().required("Tên danh mục không được để trống"),
  },
  { abortEarly: false }
);

export default categorySchema;
