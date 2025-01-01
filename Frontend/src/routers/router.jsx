import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import Admin from "../components/Admin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdataBook from "../pages/dashboard/editbook/UpdataBook";
import AuthProvide from '../context/AuthContext'; 
import OrdersStatus from "../pages/dashboard/OrdersStatus";

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthProvide>
          <App />
        </AuthProvide>
      ),
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/orders",
            element: <PrivateRoute><OrderPage/></PrivateRoute>,
        },
        {
            path: "/about",
            element: <div>About</div>,
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
        {
            path: "/cart",
            element: <CartPage/>,
        },
        {
            path: "/checkout",
            element: <PrivateRoute><CheckoutPage/></PrivateRoute>,
        },
        {
            path: "/books/:id" ,
            element: <SingleBook/>,
        },
        {
            path: "/admin",
            element: <Admin/> 
        },
        {
            path: "/dashboard",
            element: (
                <AdminRoute>
                    <DashboardLayout />
                </AdminRoute>
            ),
            children: [
                {
                    index: true,
                    element: <Dashboard/>
                },
                {
                    path: "add-new-book",
                    element: <AddBook/>
                },
                {
                    path: "edit-book/:id",
                    element: <UpdataBook/>
                },
                {
                    path: "manage-books",
                    element: <ManageBooks/>
                },
                {
                    path: "orders-status",
                    element: <OrdersStatus/>
                }
            ]
        }
      ]
    }
]);

export default router;