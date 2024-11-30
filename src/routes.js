import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ProductView from "layouts/tables/ProductView";

// @mui icons
import Icon from "@mui/material/Icon";

import ProductForm from "layouts/tables/AddProduct";
import UpdateProductForm from "layouts/tables/ProdutUpdate";

// Fonction pour vérifier si l'utilisateur est authentifié
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: isAuthenticated() ? <Dashboard /> : <SignIn />,
  },
  {
    type: "collapse",
    name: "Products",
    key: "products",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/products",
    component: isAuthenticated() ? <Tables /> : <SignIn />,
  },
  {
    type: "c",
    key: "product-view",
    route: "/product/:productId",
    component: isAuthenticated() ? <ProductView /> : <SignIn />,
  },
  {
    type: "c",
    key: "add-product",
    route: "/product/addProduct",
    component: isAuthenticated() ? <ProductForm /> : <SignIn />,
  },
  {
    type: "c",
    key: "update-product",
    route: "/product/UpdateProduct/:productId",
    component: isAuthenticated() ? <UpdateProductForm /> : <SignIn />,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/orders",
    component: isAuthenticated() ? <Billing /> : <SignIn />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: isAuthenticated() ? <RTL /> : <SignIn />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: isAuthenticated() ? <Notifications /> : <SignIn />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: isAuthenticated() ? <Profile /> : <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
