import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AddAProduct from "../AddAProduct/AddAProduct";
import AllBuyers from "../AllBuyers/AllBuyers";
import AllSeller from "../AllSeller/AllSeller";
import Blogs from "../Blogs/Blogs";
import BookCategory from "../BookCategory/BookCategory";
import BookCategory2 from "../BookCategory/BookCategory2";
import BookCategory3 from "../BookCategory/BookCategory3";
import DashboardLayout from "../DashBoard/DashboardLayout";
import ErrorPage from "../Error/ErrorPage";
import Home from "../Home/Home";
import MyOrders from "../MyOrders.js/MyOrders";
import MyProducts from "../MyProducts/MyProducts";
import Payment from "../Payment/Payment";
import Root from "../Root/Root";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import SimplePage from "../SimplePage/SimplePage";
import PerCategoryPage from "../Trial/PerCategoryPage/PerCategoryPage";
import Wishlist from "../Wishlist/Wishlist";
import CategoriesPage from "../CategoriesPage/CategoriesPage";
import BooksPage from "../BooksPage/BooksPage";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";
import BookDetailsPage from "../BookDetailsPage/BookDetailsPage";
import Profile from "../Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/category/:id",
        element: <PerCategoryPage></PerCategoryPage>,
        loader: ({ params }) =>
          fetch(
            `https://bookify-serverside.onrender.com/category/${params.id}`
          ),
      },
      {
        path: "/books/:id",
        element: <BookDetailsPage />,
        loader: ({ params }) =>
          fetch(
            `https://bookify-serverside.onrender.com/api/books/${params.id}`
          ),
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/categories",
        element: <CategoriesPage></CategoriesPage>,
      },
      {
        path: "/books",
        element: <BooksPage></BooksPage>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <SimplePage></SimplePage>,
      },
      {
        path: "/dashboard/allusers",
        element: <SimplePage></SimplePage>,
      },
      {
        path: "/dashboard/myorders",
        element: (
          <BuyerRoute>
            <MyOrders></MyOrders>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/allbuyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allsellers",
        element: (
          <AdminRoute>
            <AllSeller></AllSeller>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <BuyerRoute>
            <Wishlist></Wishlist>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/addaproduct",
        element: (
          <SellerRoute>
            <AddAProduct></AddAProduct>
          </SellerRoute>
        ),
      },
    ],
  },
]);

export default router;
