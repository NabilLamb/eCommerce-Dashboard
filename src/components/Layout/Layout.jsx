// Layout.jsx
import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { BsSun, BsMoon } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import Sidebar from "../Sidebar/Sidebar";
import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import ThemeContext from "../../components/ThemeContext/ThemeContext";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import css from "./Layout.module.css";
import { categoriesData, subcategoriesData } from "../../data";
import { UserContext } from "../../components/UserContext/UserContext";
import { useTranslation } from "react-i18next";
// import i18n from "../../i18n";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Dashboard");
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { t, i18n } = useTranslation();

  const formatDate = (date) => {
    const day = date.format("d"); // Day of the week (0-6)
    const month = date.format("M") - 1; // Month (0-11)
    const dayOfMonth = date.format("Do");
    const year = date.format("YYYY");

    return `${t(`days.${day}`)}, ${dayOfMonth} ${t(`months.${month}`)} ${year}`;
  };

  useEffect(() => {
    const findPagesName = () => {
      switch (true) {
        case pathname === "/dashboard":
          setTitle(t("dashboard"));
          break;
        case pathname.startsWith("/products"):
          setTitle(t("products"));
          break;
        case pathname.startsWith("/categories"):
          setTitle(t("categories"));
          break;
        case pathname.startsWith("/manage-subcategories"):
          const categoryId = parseInt(pathname.split("/")[2], 10);
          const category = categoriesData.find((cat) => cat.id === categoryId);
          setTitle(
            `${category ? category.name : t("unknown")} ${t("subcategories")}`
          );
          break;
        case pathname.startsWith("/orders"):
          setTitle(t("orders"));
          break;
        case pathname.startsWith("/delivery-notes"):
          setTitle(t("deliveryNotes"));
          break;
        case pathname.startsWith("/users"):
          setTitle(t("users"));
          break;
        case pathname.startsWith("/calendar"):
          setTitle(t("calendar"));
          break;
        case pathname.startsWith("/board"):
          setTitle(t("trelloBoard"));
          break;
        case pathname.startsWith("/manage-subsubcategories"):
          const subcategoryId = parseInt(pathname.split("/")[2], 10);
          const subcategory = subcategoriesData.find(
            (subcat) => subcat.id === subcategoryId
          );
          const categoryIdForSubsubcategory = subcategory
            ? subcategory.categoryId
            : null;
          const categoryForSubsubcategory = categoriesData.find(
            (cat) => cat.id === categoryIdForSubsubcategory
          );
          setTitle(
            `${
              categoryForSubsubcategory
                ? categoryForSubsubcategory.name
                : t("unknown")
            } > ${subcategory ? subcategory.name : t("unknown")} ${t(
              "subSubCategories"
            )}`
          );
          break;
        case pathname.startsWith("/profile"):
          setTitle(t("profile"));
          break;
        default:
          setTitle(t("unknown"));
          break;
      }
    };

    findPagesName();
  }, [pathname, t]);

  useEffect(() => {
    if (!user) {
      navigate(pathname, { state: { from: pathname } });
    }
  }, [user, navigate, pathname]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    setDialogOpen(false);
    navigate("/");
    // Add your logout logic here (e.g., clear user data)
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className={`${css.container} ${
        themeMode === "dark" ? css.darkMode : css.lightMode
      }`}
    >
      <Sidebar />
      {pathname === "/" && <Navigate to="/signinsignup" />}
      <div className={css.dashboard}>
        <div className={css.header}>
          <span>{formatDate(moment())}</span>
          <div className={css.headerRight}>
            <div className={css.languageSwitch}>
              <button
                onClick={() => changeLanguage("en")}
                className={i18n.language === "en" ? css.active : ""}
              >
                <img
                  src="../../../public/usa-flag.png"
                  alt="USA"
                  className={css.flag}
                />
              </button>
              <button
                onClick={() => changeLanguage("fr")}
                className={i18n.language === "fr" ? css.active : ""}
              >
                <img
                  src="../../../public/france-flag.png"
                  alt="France"
                  className={css.flag}
                />
              </button>
            </div>
            <div className={css.themeToggle} onClick={toggleTheme}>
              {themeMode === "dark" ? (
                <BsSun size={24} />
              ) : (
                <BsMoon size={24} />
              )}
            </div>

            <div className={css.profile} onClick={handleProfileClick}>
              {user && <img src={`${user.imageUrl}`} alt="person image" />}
              <div className={css.details}>
                {user && (
                  <span>{`${user.name.firstName} ${user.name.lastName}`}</span>
                )}
                {user && <span>{`${user.email}`}</span>}
              </div>
            </div>

            <div className={css.logout} onClick={handleLogoutClick}>
              <FiLogOut size={24} />
            </div>
          </div>
        </div>
        <div className={css.pageTitle}>
          <h1>{title}</h1>
        </div>
        <div className={css.content}>
          <Outlet />
        </div>
      </div>
      <ConfirmationDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmLogout}
        itemType="logout"
      />
    </div>
  );
};

export default Layout;
