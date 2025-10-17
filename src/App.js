import React from 'react';
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import router from "./Components/Routes/Route";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div>
            <RouterProvider router={router} />
            <Toaster />
          </div>
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
}

export default App;
