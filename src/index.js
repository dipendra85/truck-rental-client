import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./css/Wrapper.scss";
import Navbar from "./components/Navbar";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
// import "react-quill/dist/quill.snow.css";

// routes
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

import Brands from "./components/Admin/Brands";
import CreateBrand from "./components/Admin/Brands/Create";

import Posts from "./components/Vehicles/";
import CreatePosts from "./components/Vehicles/Create";

import Banners from "./components/Banners";
import CreateBanners from "./components/Banners/Create";

import Users from "./components/Admin/Users";
import CreateUsers from "./components/Admin/Users/Create";
import UpdatePassword from "./components/Admin/Users/UpdatePassword";

import Orders from "./components/Orders";
import FoodOrders from "./components/Cafe/FoodOrders";

import Resturants from "./components/Cafe/Resturants/index";
import CreateResturants from "./components/Cafe/Resturants/Create";

import Menu from "./components/Cafe/Menu/index";
import CreateMenu from "./components/Cafe/Menu/Create";

import Food from "./components/Cafe/Food/index";
import CreateFood from "./components/Cafe/Food/Create";

import FoodItems from "./components/Cafe/FoodItems/index";
import CreateFoodItem from "./components/Cafe/FoodItems/Create";

import DeliveryAddress from "./components/DeliveryAddress/index";
import CreateDeliveryAddress from "./components/DeliveryAddress/Create";

const RootComponent = () => {
  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="home">
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  // login
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <RootComponent />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },

  // posts
  {
    path: "/posts",
    element: <RootComponent />,
    children: [
      {
        path: "",
        element: <Posts />,
      },

      {
        path: "create",
        element: <CreatePosts />,
        children: [
          {
            path: ":id",
            element: <CreatePosts />,
          },
        ],
      },
    ],
  },

  // Brands
  {
    path: "/admin/brands",
    element: <RootComponent />,
    children: [
      {
        path: "",
        element: <Brands />,
      },
      {
        path: "create",
        element: <CreateBrand />,
        children: [
          {
            path: ":id",
            element: <CreateBrand />,
          },
        ],
      },
    ],
  },

  // banners
  {
    path: "/banners",
    element: <RootComponent />,
    children: [
      {
        path: "",
        element: <Banners />,
      },
      {
        path: "create",
        element: <CreateBanners />,
        children: [
          {
            path: ":id",
            element: <CreateBanners />,
          },
        ],
      },
    ],
  },

  // users
  {
    path: "/users",
    element: <RootComponent />,
    children: [
      {
        path: "",
        element: <Users />,
      },
      {
        path: "create",
        element: <CreateUsers />,
        children: [
          {
            path: ":id",
            element: <CreateUsers />,
          },
        ],
      },
      {
        path: "password/:id",
        element: <UpdatePassword />,
      },
    ],
  },

  // orders
  {
    path: "/orders",
    element: <RootComponent />,
    children: [
      {
        path: "",
        element: <Orders />,
      },
    ],
  },

  // food orders
  {
    path: "/foodOrders",
    element: <RootComponent />,
    children: [
      {
        path: "",
        element: <FoodOrders />,
      },
    ],
  },

  // resturants
  {
    path: "/resturants",
    element: <RootComponent />,
    children: [
      {
        path: "",
        element: <Resturants />,
      },

      {
        path: "create",
        element: <CreateResturants />,
        children: [
          {
            path: ":id",
            element: <CreateResturants />,
          },
        ],
      },
    ],
  },

  // foods
  {
    path: "/foods",
    element: <RootComponent />,
    children: [
      {
        path: ":menuId",
        element: <Food />,
      },
      {
        path: "create/:menuId",
        element: <CreateFood />,
        children: [
          {
            path: ":id",
            element: <CreateFood />,
          },
        ],
      },
    ],
  },

  // menus
  {
    path: "/menus",
    element: <RootComponent />,
    children: [
      {
        path: ":resturantId",
        element: <Menu />,
      },
      {
        path: "create/:resturantId",
        element: <CreateMenu />,
        children: [
          {
            path: ":id",
            element: <CreateMenu />,
          },
        ],
      },
    ],
  },

  // foodItems
  {
    path: "/foodItems",
    element: <RootComponent />,
    children: [
      {
        path: ":menuId/:foodId",
        element: <FoodItems />,
      },
      {
        path: "create/:menuId/:foodId",
        element: <CreateFoodItem />,
        children: [
          {
            path: ":id",
            element: <CreateFoodItem />,
          },
        ],
      },
    ],
  },

  {
    path: "/deliveryAddresses",
    element: <RootComponent />,
    children: [
      {
        path: "",
        element: <DeliveryAddress />,
      },
      {
        path: "create",
        element: <CreateDeliveryAddress />,
        children: [
          {
            path: ":id",
            element: <CreateDeliveryAddress />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
