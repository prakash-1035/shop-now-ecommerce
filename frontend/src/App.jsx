import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";

// Layout Components
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Notfound from "./layout/Notfound";

// Product components
import Home from "./components/home/Home";
import ProductDetails from "./components/home/ProductDetails";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

// User Components
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Profile from "./components/user/Profile";

// Cart and Order Components
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";

// Admin Components
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

import "./styles/app.scss";
import { loadUser } from "./actions/userActions";
import store from "./store";
import ProtectedRoutes from "./components/route/ProtectedRoutes";
import AdminProtectedRoutes from "./components/route/AdminProtectedRoutes.js";
///
///
///
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search/:keyword" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/password/reset/:token"
                        element={<NewPassword />}
                    />
                    <Route
                        path="/password/forgot"
                        element={<ForgotPassword />}
                    />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/me" element={<Profile />} exact />
                        <Route
                            path="/me/update"
                            element={<UpdateProfile />}
                            exact
                        />
                        <Route
                            path="/password/update"
                            element={<UpdatePassword />}
                            exact
                        />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route
                            path="/confirm/order"
                            element={<ConfirmOrder />}
                        />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/orders/me" element={<ListOrders />} />
                        <Route path="/orders/:id" element={<OrderDetails />} />
                    </Route>
                    <Route element={<AdminProtectedRoutes />}>
                        <Route
                            path="/dashboard"
                            isAdmin={true}
                            element={<Dashboard />}
                        />
                        <Route
                            path="/admin/products"
                            isAdmin={true}
                            element={<ProductList />}
                        />
                        <Route
                            path="/admin/product"
                            element={<NewProduct />}
                            exact
                        />
                        <Route
                            path="/admin/orders"
                            element={<OrdersList />}
                            exact
                        />
                        <Route
                            path="/admin/order/:id"
                            element={<ProcessOrder />}
                            exact
                        />
                        <Route
                            path="/admin/users"
                            element={<UsersList />}
                            exact
                        />
                        <Route
                            path="/admin/user/:id"
                            element={<UpdateUser />}
                            exact
                        />
                        <Route
                            path="/admin/reviews"
                            element={<ProductReviews />}
                        />
                    </Route>
                    <Route path="*" element={<Notfound />} />
                </Routes>
                <Footer />
            </div>
            <Toaster />
        </Router>
    );
}

export default App;
