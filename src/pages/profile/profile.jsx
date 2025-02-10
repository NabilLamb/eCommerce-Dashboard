import React, { useContext, useState, useEffect } from 'react';
import { adminActions } from '../../data/index';
import { FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
import UpdateProfile from '../../components/UpdateProfile/UpdateProfile';
import ThemeContext from '../../components/ThemeContext/ThemeContext';
import { UserContext } from '../../components/UserContext/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./profile.css";

const Profile = () => {
  const { t } = useTranslation();
  const defaultImage = "../../../public/default-image-profile.jpg";
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { themeMode } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext); 
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!user) {
      navigate('/profile', { state: { from: location.pathname } });
    }
  }, [user, navigate, location.pathname]);

  const userActions = adminActions.filter(action => action.userId === user?.id);

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUser(updatedProfile);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className={`profile-container ${themeMode === "dark" ? "themeDarkContainer" : "themeLightContainer"}`}>
      <div className={`left-section ${themeMode === "dark" ? "themeDarkLeftSection" : "themeLightLeftSection"}`}>
        <div className="personal-info">
          <h3>{t("profileAdmin.personalInfo")}</h3>
          <div className="update-button">
            <button className='update' onClick={openUpdateModal}><FaEdit /> {t("profileAdmin.update")}</button>
          </div>
          <div className="profile-header">
            <img src={user?.imageUrl || defaultImage} alt={t("profileAdmin.defaultImage")} className="profile-picture" />
            <div className="profile-details">
              <h2>{`${user?.name.firstName} ${user?.name.lastName}`}</h2>
              <p>{`${user?.role}`}</p>
            </div>
          </div>
          <p><strong>{t("profileAdmin.phoneNo")}</strong> {`${user?.contactNumber}`}</p>
          <p><strong>{t("profileAdmin.email")}</strong> {`${user?.email}`}</p>
          <p>
            <strong>{t("profileAdmin.password")}</strong> {showPassword ? `${user?.password}` : "********"}{' '}
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </p>
          <p><strong>{t("profileAdmin.address")}</strong> {`${user?.address}`}</p>
          <p><strong>{t("profileAdmin.city")}</strong> {`${user?.city}`}</p>
          <p><strong>{t("profileAdmin.country")}</strong> {`${user?.country}`}</p>
        </div>
        <div className="activity-info">
          <h3>{t("profileAdmin.activityInfo")}</h3>
          <p><strong>{t("profileAdmin.lastLogin")}</strong> 2024-07-03 14:30:00</p>
          <p><strong>{t("profileAdmin.accountStatus")}</strong> Active</p>
        </div>
      </div>
      <div className={`right-section ${themeMode === "dark" ? "themeDarkRightSection" : "themeLightRightSection"}`}>
        <div className="actions-info">
          <h3>{t("profileAdmin.actionsInfo")}</h3>
          <div className="actions-scroll">
            <table>
              <thead>
                <tr>
                  <th>{t("profileAdmin.date")}</th>
                  <th>{t("profileAdmin.type")}</th>
                  <th>{t("profileAdmin.action")}</th>
                </tr>
              </thead>
              <tbody>
                {userActions.map((action) => (
                  <tr key={action.id}>
                    <td>{action.date}</td>
                    <td>{action.type}</td>
                    <td>{action.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UpdateProfile
        visible={isUpdateModalOpen}
        onClose={closeUpdateModal}
        onUpdate={handleUpdateProfile}
        currentData={user}
      />
    </div>
  );
};

export default Profile;
