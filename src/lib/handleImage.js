import axios from "axios";

const imageUpload = async (image) => {
  if (image) {
    const formData = {
      file: image,
      folder: "API",
      upload_preset: "DATT-upload",
    };

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/phan-luan/image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.secure_url;
  }
};
function getPublicIdFromUrl(imageUrl) {
  const parts = imageUrl.split("/");
  const lastPart = parts.pop(); // Lấy phần cuối cùng của URL
  const publicId = lastPart.split(".")[0]; // Lấy public_id và bỏ phần mở rộng
  const publicIdParts = publicId.split("/");
  return publicIdParts[publicIdParts.length - 1]; // Lấy public_id cuối cùng
}

const updateImage = async (oldPublicId, newImage) => {
  if (newImage) {
    const deleteResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/phan-luan/image/destroy/${oldPublicId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (deleteResponse.status === 200) {
      const formData = {
        file: newImage,
        folder: "API",
        upload_preset: "DATT-upload",
      };

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/phan-luan/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.secure_url;
    } else {
      console.error("Error deleting old image");
      return null;
    }
  }
};

const deleteImage = (id) => {
  cloudinary.uploader.destroy(id, (error, result) => {
    if (error) {
      console.error("Error deleting image:", error);
    } else {
      console.log("Image deleted successfully:", result);
    }
  });
};
export { imageUpload, updateImage, getPublicIdFromUrl, deleteImage };
