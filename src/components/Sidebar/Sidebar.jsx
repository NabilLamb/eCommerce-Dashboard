// src/components/Sidebar/Sidebar.jsx
import React, { useEffect, useState, useContext } from "react";
import css from "./Sidebar.module.css";
import { MdSpaceDashboard, MdCategory, MdEventNote } from "react-icons/md";
import { AiFillCalendar } from "react-icons/ai";
import {
  FaTasks,
  FaBoxOpen,
  FaUsers,
  FaArrowLeft,
  FaArrowRight,
  FaTruck,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import ThemeContext from "../ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const { themeMode } = useContext(ThemeContext);

  useEffect(() => {
    const path = location.pathname.split("/")[1]; // Get the first part of the path
    setActiveItem(path || "dashboard"); // Default to "dashboard" if the path is empty

    // Check if the path contains "manage-subcategories" or "manage-subsubcategories"
    if (path === "manage-subcategories" || path === "manage-subsubcategories") {
      setActiveItem("categories"); // Set "Categories" as active
    }
  }, [location]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className={`${css.container} ${collapsed ? css.collapsed : ""} ${
        themeMode === "dark" ? css.themeDark : css.themeLight
      }`}
    >
      
      <div
        className={css.toggle}
        onClick={toggleSidebar}
        data-tooltip={collapsed ? t("open") : t("close")}
      >
        {collapsed ? <FaArrowRight size={20} /> : <FaArrowLeft size={20} />}
      </div>
      <img src="/logo.png" alt="logo" className={css.logo} />
      <div className={css.menu}>
        <NavLink
          to="/dashboard"
          className={`${css.item} ${
            activeItem === "dashboard" ? css.active : ""
          }`}
          title={t("dashboard")}
          onClick={() => handleItemClick("dashboard")}
        >
          <MdSpaceDashboard size={30} className={css.icon} />
          <span className={css.label}>{t("dashboard")}</span>
        </NavLink>
        <NavLink
          to="/products"
          className={`${css.item} ${
            activeItem === "products" ? css.active : ""
          }`}
          title={t("products")}
          onClick={() => handleItemClick("products")}
        >
          <FaBoxOpen size={30} className={css.icon} />
          <span className={css.label}>{t("products")}</span>
        </NavLink>
        <NavLink
          to="/categories"
          className={`${css.item} ${
            activeItem === "categories" ? css.active : ""
          }`}
          title={t("categories")}
          onClick={() => handleItemClick("categories")}
        >
          <MdCategory size={30} className={css.icon} />
          <span className={css.label}>{t("categories")}</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={`${css.item} ${activeItem === "orders" ? css.active : ""}`}
          title={t("orders")}
          onClick={() => handleItemClick("orders")}
        >
          <FaTruck size={30} className={css.icon} />
          <span className={css.label}>{t("orders")}</span>
        </NavLink>

        <NavLink
          to="/delivery-notes"
          className={`${css.item} ${
            activeItem === "delivery-notes" ? css.active : ""
          }`}
          title={t("deliveryNotes")} 
          onClick={() => handleItemClick("delivery-notes")}
        >
          <MdEventNote size={30} className={css.icon} />
          <span className={css.label}>{t("deliveryNotes")}</span> 
        </NavLink>

        <NavLink
          to="/users"
          className={`${css.item} ${activeItem === "users" ? css.active : ""}`}
          title={t("users")}
          onClick={() => handleItemClick("users")}
        >
          <FaUsers size={30} className={css.icon} />
          <span className={css.label}>{t("users")}</span>
        </NavLink>
        <NavLink
          to="/calendar"
          className={`${css.item} ${
            activeItem === "calendar" ? css.active : ""
          }`}
          title={t("calendar")}
          onClick={() => handleItemClick("calendar")}
        >
          <AiFillCalendar size={30} className={css.icon} />
          <span className={css.label}>{t("calendar")}</span>
        </NavLink>
        <NavLink
          to="/board"
          className={`${css.item} ${activeItem === "board" ? css.active : ""}`}
          title={t("trelloBoard")} 
          onClick={() => handleItemClick("board")}
        >
          <FaTasks size={30} className={css.icon} />
          <span className={css.label}>{t("trelloBoard")}</span> 
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;