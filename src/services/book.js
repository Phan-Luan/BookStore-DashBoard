import instance from "./config";

const getBooks = (search) => {
  if (search) {
    return instance.get(`products?search=${search}`);
  }
  return instance.get(`products`);
};
const getBook = (id) => {
  return instance.get(`products/${id}`);
};
const addBook = (Book) => {
  return instance.post(`products`, Book);
};
const updateBook = (Book) => {
  return instance.put(`products/${Book.id}`, Book);
};
const deleteBook = (id) => {
  return instance.delete(`products/${id}`);
};
export { getBooks, getBook, addBook, updateBook, deleteBook };
