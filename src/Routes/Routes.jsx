import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/Auth/SignUp";
import SignIn from "../Pages/Auth/SignIn";
import Dashboard from "../Layout/Dashboard";
import BookParcel from "../Pages/Dashboard/User/BookParcel/BookParcel";
import MyParcels from "../Pages/Dashboard/User/MyParcels/MyParcels";
import UpdateParcel from "../Pages/Dashboard/User/UpdateParcel/UpdateParcel";
import AdminStats from "../Pages/Dashboard/Admin/AdminStats/AdminStats";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import AllParcels from "../Pages/Dashboard/Admin/AllParcels/AllParcels";
import AllDeliveryMan from "../Pages/Dashboard/Admin/AllDeliveryMan/AllDeliveryMan";
import AdminRoute from "./AdminRoute";
import MyDelivery from "../Pages/Dashboard/DeliveryMan/MyDelivery";
import PrivateRoute from "./PrivateRoute";
import DeliveryMenRoute from "./DeliveryMenRoute";
import Payment from "../Pages/Payments/Payment";
import PaymentSuccess from "../Pages/Payments/PaymentSuccess";
import MyReviews from "../Pages/Dashboard/DeliveryMan/MyReviews";
import MyProfile from "../Pages/Shared/MyProfile/MyProfile";
import UpdateProfile from "../Pages/Auth/UpdateProfile";
import UserRoute from "./UserRoute";
import ErrorPage from "../Pages/Shared/ErrorPage/ErrorPage";
import Blog from "../Pages/ContactUs/Blog";
import Support from "../Pages/Support/Support";





export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'blog',
                element: <Blog></Blog>
            },
           
            {
                path: 'support',
                element: <Support></Support>
            }

        ]
    },
    {
        path: '/signUp',
        element: <SignUp></SignUp>
    },
    {
        path: '/signIn',
        element: <SignIn></SignIn>
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // role admin
            {
                index: true,
                element: <PrivateRoute><AdminStats></AdminStats></PrivateRoute>
            },
            {
                path: 'all-parcels',
                element: <AdminRoute><AllParcels></AllParcels></AdminRoute>
            },
            {
                path: 'all-delivery-men',
                element: <AdminRoute><AllDeliveryMan></AllDeliveryMan></AdminRoute>
            },
            {
                path: 'all-users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            // role  User
            {
                path: 'book-parcel',
                element: <UserRoute><BookParcel></BookParcel></UserRoute>
            },
          
            {
                path: 'update-parcel/:id',
                element: <PrivateRoute><UpdateParcel /></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_API_LINK}/parcels/update/${params.id}`)
              },

            {
                path: 'my-parcels',
                element: <UserRoute><MyParcels></MyParcels></UserRoute>
            },
            
            {
                path: 'payment/:id',
                element: <PrivateRoute><Payment /></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_API_LINK}/payment/${params.id}`)
              },
            {
                path: 'payment-success',
                element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>
            },
            // for DeliveryMen
            {
                path: 'my-delivery-list',
                element: <DeliveryMenRoute><MyDelivery></MyDelivery></DeliveryMenRoute>
            },
            {
                path: 'my-reviews',
                element: <DeliveryMenRoute><MyReviews></MyReviews></DeliveryMenRoute>
            },
            // for all
            {
                path: 'my-profile',
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: 'edit-profile',
                element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
            }
        ]
    }
])