import "./App.css";
import { useEffect } from "react";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import About from "./component/layout/About/About.js";
import Contact from "./component/layout/Contact/Contact.js";
// import Home from "./component/Home/Home.js";
import LoginSignUp from "./component/User/LoginSignUp";
import { loadUser } from "./actions/userAction";
import store from "./store";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import AdminRoute from "./component/Route/AdminRoute.js";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import Dashboard from "./component/Admin/Dashboard";
import Users from "./component/Admin/Users";
import UpdateUser from "./component/Admin/UpdateUser";
import NotFound from "./component/layout/NotFound";
import AddAddress from "./component/User/AddAddress";
import UpdateAddress from "./component/User/UpdateAddress";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import ProductDetails from "./component/Product/ProductDetails";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import ProductList from "./component/Admin/ProductList";
import Products from "./component/Product/Products";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import CreateCategory from "./component/Admin/CreateCategory";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Orders from "./component/Admin/Orders";
import UpdateOrder from "./component/Admin/UpdateOrder";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Open Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound text={"Page Not Found"} />} />

        {/* <Route path="/" Component={Home} /> */}
        <Route path="/" Component={Products} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />
        <Route path="/login-signup" Component={LoginSignUp} />
        <Route path="/forgot_password" Component={ForgotPassword} />
        <Route path="/reset_password/:token" Component={ResetPassword} />
        <Route path="/product/:id" Component={ProductDetails} />

        <Route element={<ProtectedRoute />}>
          <Route path="/my-account" Component={Profile} />
          <Route path="/profile_update" Component={UpdateProfile} />
          <Route path="/password_update" Component={UpdatePassword} />
          <Route path="/add_address" Component={AddAddress} />
          <Route path="/update_address/:id" Component={UpdateAddress} />

          <Route path="/cart" Component={Cart} />
          <Route path="/shipping" Component={Shipping} />
          <Route path="/order/confirm" Component={ConfirmOrder} />
          <Route path="/process/payment" Component={Payment} />
          <Route path="/success" Component={OrderSuccess} />
          <Route path="/orders" Component={MyOrders} />
          <Route path="/order/:id" Component={OrderDetails} />

          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" Component={Dashboard} />
            <Route path="/admin/users" Component={Users} />
            <Route path="/admin/orders" Component={Orders} />
              <Route path="/admin/order/:id" Component={UpdateOrder} />
            <Route path="/admin/products" Component={ProductList} />
            <Route path="/admin/product" Component={NewProduct} />
            <Route path="/admin/category" Component={CreateCategory} />
            <Route path="/admin/product/:id" Component={UpdateProduct} />
            <Route path="/admin/user/:id" Component={UpdateUser} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
