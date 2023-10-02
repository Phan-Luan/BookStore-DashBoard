const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/cloudinaryProxy",  // Đường dẫn của yêu cầu API của bạn
    createProxyMiddleware({
      target: "https://api.cloudinary.com/v1_1/phan-luan/image/destroy",  // URL của ứng dụng Laravel
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        // Thêm tiêu đề CORS vào phản hồi
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      },
    })
  );
};
