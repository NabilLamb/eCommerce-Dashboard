import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Calendar from "./pages/Calendar/Calendar";
import Dashboard from "./pages/Dashboard/Dashboard";
import BoardPage from "./pages/Board/Board";
import DataGrid from "./pages/DataGrid/DataGrid";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import ManageSubcategories from "./components/categories/ManageSubcategories/ManageSubcategories";
import ManageSubSubcategories from "./components/categories/ManageSubSubcategories/ManageSubSubcategories";
import Orders from "./pages/Orders/Orders";
import DeliveryNotes from "./pages/deliveryNotes/deliveryNotes"
import Profile from "./pages/profile/profile";
import SignInSignUp from "./pages/SignInSignUp/SignInSignUp"; 
import { UserProvider } from "./components/UserContext/UserContext";
import { LanguageProvider } from "./components/LanguageContext/LanguageContext"; 
const App = () => {
  return (
    <UserProvider>
      <LanguageProvider>
      <div id="dashboard">
        <BrowserRouter>
          <Routes>
            {/* Route for SignInSignUp without Layout */}
            <Route path="/" element={<SignInSignUp />} />

            {/* Routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="board" element={<BoardPage />} />
              <Route path="users" element={<DataGrid />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route
                path="manage-subcategories/:categoryId"
                element={<ManageSubcategories />}
              />
              <Route
                path="manage-subsubcategories/:subcategoryId"
                element={<ManageSubSubcategories />}
              />
              <Route path="orders" element={<Orders />} />
              <Route path="delivery-notes" element={<DeliveryNotes />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      </LanguageProvider>
    </UserProvider>
  );
};

export default App;
