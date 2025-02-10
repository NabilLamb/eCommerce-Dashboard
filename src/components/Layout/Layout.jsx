import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { BsSun, BsMoon } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import ThemeContext from "../../components/ThemeContext/ThemeContext";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import css from "./Layout.module.css";
import { categoriesData, subcategoriesData } from "../../data";
import { UserContext } from "../../components/UserContext/UserContext";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Dashboard");
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Load user data from localStorage if available
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const formatDate = (date) => {
    const dayOfMonth = date.format("Do");
    const year = date.format("YYYY");
    return `${t(`days.${date.format("d")}`)}, ${dayOfMonth} ${t(`months.${date.format("M") - 1}`)} ${year}`;
  };

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
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/signinsignup");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`${css.container} ${themeMode === "dark" ? css.darkMode : css.lightMode}`}>
      <Sidebar />
      <div className={css.dashboard}>
        <div className={css.header}>
          <span>{formatDate(moment())}</span>
          <div className={css.headerRight}>
            <div className={css.languageSwitch}>
              <button onClick={() => changeLanguage("en")} className={i18n.language === "en" ? css.active : ""}>
                <img src="../../../public/usa-flag.png" alt="USA" className={css.flag} />
              </button>
              <button onClick={() => changeLanguage("fr")} className={i18n.language === "fr" ? css.active : ""}>
                <img src="../../../public/france-flag.png" alt="France" className={css.flag} />
              </button>
            </div>
            <div className={css.themeToggle} onClick={toggleTheme}>
              {themeMode === "dark" ? <BsSun size={24} /> : <BsMoon size={24} />}
            </div>

            {user ? (
              <div className={css.profile} onClick={handleProfileClick}>
                <img src={user.imageUrl || "/default-image-profile.jpg"} alt={user.name?.firstName || "User"} className={css.profileImage} />
                <div className={css.details}>
                  <span className={css.profileName}>{`${user.name?.firstName || "User"} ${user.name?.lastName || ""}`}</span>
                  <span className={css.profileEmail}>{user.email}</span>
                </div>
              </div>
            ) : (
              <button className={css.loginButton} onClick={() => navigate("/signinsignup")}>
                Connexion
              </button>
            )}

            {user && (
              <div className={css.logout} onClick={handleLogoutClick}>
                <FiLogOut size={24} />
              </div>
            )}
          </div>
        </div>
        <div className={css.pageTitle}>
          <h1>{title}</h1>
        </div>
        <div className={css.content}>
          <Outlet />
        </div>
      </div>
      <ConfirmationDialog open={isDialogOpen} onClose={handleDialogClose} onConfirm={handleConfirmLogout} itemType="logout" />
    </div>
  );
};

export default Layout;
