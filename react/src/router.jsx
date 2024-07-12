import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./assets/views/Login";
import Signup from "./assets/views/Signup";
import Unavailable from "./assets/views/Unavailable";
import NotFound from "./assets/views/NotFound";
import Dashboard from "./assets/views/Dashboard";
import ShugoExpress from "./assets/views/ShugoExpress";
import AdminPanel from "./assets/views/AdminPanel";
import PurchaseHistory from "./assets/views/PurchaseHistory";
import PaymentHistory from "./assets/views/PaymentHistory";
// import Users from "./assets/views/Users";
// import UserForm from "./assets/views/UserForm";
import Settings from "./assets/views/Settings";
import Download from "./assets/views/Download";
import Achievement from "./assets/views/Achievement";
import Donate from "./assets/views/Donate";
import Site from "./components/Site";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                // Теперь при переходе на / попадем на Users
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/shugoexpress",
                element: <ShugoExpress />,
            },
            {
                path: "/adminpanel",
                element: <AdminPanel />,
            },
            {
                path: "/PurchaseHistory",
                element: <PurchaseHistory />,
            },
            {
                path: "/PaymentHistory",
                element: <PaymentHistory />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
            {
                path: "/donate",
                element: <Donate />,
            },
            {
                path: "/Download",
                element: <Download />,
            },

            // {
            //     path: "/users",
            //     element: <Users />,
            // },
            {
                path: "/achievement",
                element: <Achievement />,
            },
            // {
            //     path: "/users/new",
            //     element: <UserForm key="userCreate" />,
            // },
            // {
            //     path: "/users/:id",
            //     element: <UserForm key="userUpdate" />,
            // },
            {
                path: "/site",
                element: <Site />,
            },
        ],
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            // {
            //     path: "/login",
            //     element: <Login />,
            // },
            // {
            //     path: "/signup",
            //     element: <Signup />,
            // },
            {
                path: "/site",
                element: <Site />,
            },
            // {
            //     path: "/unavailable",
            //     element: <Unavailable />,
            // },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/site" />,
    },
]);

export default router;
