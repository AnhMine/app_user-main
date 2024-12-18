import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layuot/layout";
import Index from "./pages/Home/Index";
import Blog from "./pages/Blog/blog";
import Chitiet from "./pages/Home/detail";
import Login from "./pages/Home/login";
import SanPham from "./pages/Products/Products";
import DonHang from "./pages/Order/Order";
import ThanhToan from "./pages/ThanhToan/ThanhToan";
import Information from "./pages/Infomation/UserProfile";
import CartPro from "./pages/ShoppingCart/ShoppingCart";
import Cart from "./pages/Cart/Cart";
import DetalBlog from "./pages/Blog/detail-blog/DetalBlog";

import QrQr from "./pages/ShoppingCart/qr";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/detail-blog/:id",
        element: <DetalBlog />,
      },
      {
        path: "/detail/:id",
        element: <Chitiet />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sanpham",
        element: <SanPham />,
      },
      {
        path: "/donhang",
        element: <DonHang />,
      },
      {
        path: "/thanhtoan",
        element: <ThanhToan />,
      },
      {
        path: "/cart",
        element: <CartPro />,
      },
      {
        path: "/TrangCaNhan/:id", // Tham số động `id`
        element: <Information />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
      {
        path: "/QrQr",
        element: <QrQr />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
