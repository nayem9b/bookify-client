import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Root = () => {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar></Navbar>
      {/* Offset for the fixed navbar (h-16 / md:h-20). */}
      <div className="flex-1 pt-16 md:pt-20">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
