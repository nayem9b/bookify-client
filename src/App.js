import React from 'react';
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Components/Routes/Route";
import BookingModal from "./Components/BookingModal/BookingModal";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      {/* <BookingModal></BookingModal> */}
      <Toaster />
    </div>
  );
}

export default App;
