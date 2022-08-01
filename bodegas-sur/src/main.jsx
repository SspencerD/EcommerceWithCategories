import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriesScreen from "./Views/Categories/CategoriesScreen";
import SignInScreen from "./Views/Auth/SignInScreen";
import AuthContextProvider from "./Context/AuthContext";
import SignUpScreen from "./Views/Auth/SignUpScreen";
import ProtectedRoutes from "./Routes/protectedRoutes";
import ProductScreen from "./Views/Products/ProductScreen";
import CartContextProvider from "./Context/CartContext";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Router>
    <AuthContextProvider>
      <CartContextProvider>
        <Provider store={store}>
          <Routes>
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/register" element={<SignUpScreen />} />
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <App />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/categorias/:idCategory"
              element={
                <ProtectedRoutes>
                  <CategoriesScreen />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/products/:productId"
              element={
                <ProtectedRoutes>
                  <ProductScreen />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </Provider>
      </CartContextProvider>
    </AuthContextProvider>
  </Router>
);
