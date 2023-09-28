const tokenExpirationTime = 1 * 60 * 1000; // 20 phút (30 * 60 giây * 1000 mili giây)

// Đặt một hàm để kiểm tra và xóa token khi nó hết hạn
const checkTokenExpiration = () => {
  console.log("ok");
  const token = sessionStorage.getItem("token");
  const tokenTimestamp = sessionStorage.getItem("tokenTimestamp");
  const currentTime = Date.now();

  if (token && tokenTimestamp) {
    if (currentTime - tokenTimestamp > tokenExpirationTime) {
      // Token đã hết hạn, xóa nó khỏi sessionStorage
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("tokenTimestamp");

      // Thực hiện đăng xuất người dùng hoặc thực hiện các xử lý khác tùy thuộc vào ứng dụng của bạn
      console.log("Token đã hết hạn. Đã đăng xuất người dùng.");
    }
  }
};

// Bắt đầu kiểm tra thời gian tồn tại của token (ví dụ: mỗi 1 phút)
setInterval(checkTokenExpiration, 60000); // 1 phút = 60000 mili giây
