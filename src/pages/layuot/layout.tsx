import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Home/header";
import Footer from "../Home/footer";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho Toast

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Layout;
