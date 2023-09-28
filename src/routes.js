/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Categories from "views/Category/Categories";
import CreateCategory from "views/Category/CreateCategory";
import UpdateCategory from "views/Category/UpdateCategory";
import Books from "views/Book/Books";
import CreateBook from "views/Book/CreateBook";
import UpdateBook from "views/Book/UpdateBook";
import Companies from "views/Company/Companies";
import CreateCompany from "views/Company/CreateCompany";
import UpdateCompany from "views/Company/UpdateCompany";
import Login from "views/Auth/Login";
import Users from "views/User/Users";
import CreateUser from "views/User/CreateUser";
import UpdateUser from "views/User/UpdateUser";
import Roles from "views/Role/Role";
import CreateRole from "views/Role/CreateRole";
import UpdateRole from "views/Role/UpdateRole";
const dashboardRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Category",
    icon: "nc-icon nc-align-center",
    component: Categories,
    layout: "/admin",
  },
  {
    path: "/category/create",
    component: CreateCategory,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/category/delete/:id",
    component: Categories,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/category/update/:id",
    component: UpdateCategory,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/books",
    name: "Book",
    icon: "nc-icon nc-align-center",
    component: Books,
    layout: "/admin",
  },
  {
    path: "/book/create",
    component: CreateBook,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/book/update/:id",
    component: UpdateBook,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/companies",
    name: "Company",
    icon: "nc-icon nc-align-center",
    component: Companies,
    layout: "/admin",
  },
  {
    path: "/company/create",
    component: CreateCompany,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/company/delete/:id",
    component: Companies,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/company/update/:id",
    component: UpdateCompany,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/users",
    name: "User",
    icon: "nc-icon nc-align-center",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/user/create",
    component: CreateUser,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/user/delete/:id",
    component: Users,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/user/update/:id",
    component: UpdateUser,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/roles",
    name: "Role",
    icon: "nc-icon nc-align-center",
    component: Roles,
    layout: "/admin",
  },
  {
    path: "/role/create",
    component: CreateRole,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/role/delete/:id",
    component: Roles,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/role/update/:id",
    component: UpdateRole,
    layout: "/admin",
    redirect: true,
  },
];

export default dashboardRoutes;
