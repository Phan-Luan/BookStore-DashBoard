import React, { useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const history = useHistory();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  useEffect(() => {
    // Update the token in the state when it changes in sessionStorage
    const newToken = sessionStorage.getItem("token");
    setToken(newToken);
  }, []);
  const getRoutes = (routes) => {
    const checkTokenExpiration = () => {
      const expirationTime = sessionStorage.getItem("tokenTimestamp");
      const currentTime = new Date().getTime();

      if (token && expirationTime) {
        if (currentTime > expirationTime) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("tokenTimestamp");

          console.log("Token đã hết hạn. Đã đăng xuất người dùng.");
          alert("Token đã hết hạn. Đã đăng xuất người dùng.");
          history.push("login");
        }
      }
    };

    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if (!token) {
          // Nếu tuyến đường được bảo vệ và không có token, chuyển hướng về trang đăng nhập
          return <Redirect to="/admin/login" key={key} />;
        } else {
          // Bắt đầu kiểm tra thời gian tồn tại của token (ví dụ: mỗi 1 phút)
          setInterval(checkTokenExpiration, 1000); // 1 phút = 60000 mili giây
          return (
            <Route
              path={prop.layout + prop.path}
              render={(props) => <prop.component {...props} />}
              key={key}
            />
          );
        }
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
