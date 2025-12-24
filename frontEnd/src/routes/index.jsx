import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermision from "../layouts/AdminPermision";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [{
            path: "",
            element: <Home />
        },
        {
            path: "search",
            element: <Search />
        },
        {
            path: "login",
            element: <Login />
        },
        {
            path: "register",
            element: <Register />
        },
        {
            path: "forgot-password",
            element: <ForgotPassword />
        },
        {
            path: "verification-otp",
            element: <OtpVerification />
        },
        {
            path: "reset-password",
            element: <ResetPassword />
        },
        {
            path: "user-menu-mobile",
            element: <UserMenuMobile />
        },
        {
            path: "dashboard",
            element: <Dashboard />,
            children: [
                {
                    path: "profile",
                    element: <Profile />,
                },
                {
                    path: "my-orders",
                    element: <MyOrders />
                },
                {
                    path: "address",
                    element: <Address />
                },
                {
                    path: "category",
                    element: <AdminPermision><Category /></AdminPermision>
                },
                {
                    path: "sub-category",
                    element: <AdminPermision><SubCategory /></AdminPermision>
                },
                {
                    path: "upload-product",
                    element: <AdminPermision><UploadProduct /></AdminPermision>
                },
                {
                    path: "product-admin",
                    element: <AdminPermision><ProductAdmin /></AdminPermision>
                },
            ]
        },
        ]
    },
]);

export default router;
