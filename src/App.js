import React from 'react';
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import router from "./Components/Routes/Route";
import BookingModal from "./Components/BookingModal/BookingModal";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <div>
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </Provider>
  );
}

export default App;
