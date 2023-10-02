const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",  // Đường dẫn của yêu cầu API của bạn
    createProxyMiddleware({
      target: "https://luanpv.id.vn",  // URL của ứng dụng Laravel
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        // Thêm tiêu đề CORS vào phản hồi
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      },
    })
  );
};
