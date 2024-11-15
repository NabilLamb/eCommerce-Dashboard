import React, { useState, useEffect, useContext, useMemo } from 'react'; 
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import css from './UpdateProfile.module.css';
import { FaEye, FaEyeSlash, FaCamera } from 'react-icons/fa';
import ThemeContext from '../ThemeContext/ThemeContext';
import { createTheme } from '@mui/material/styles';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import { useTranslation } from 'react-i18next';

const defaultProfileImage = '../../public/default-image-profile.jpg';

const UpdateProfile = ({ visible, onClose, onUpdate, currentData }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [defaultImage, setDefaultImage] = useState(defaultProfileImage);

  const { themeMode } = useContext(ThemeContext); 
  const { t } = useTranslation();

  useEffect(() => {
    if (currentData) {
      setFirstName(currentData.name.firstName || '');
      setLastName(currentData.name.lastName || '');
      setContactNumber(currentData.contactNumber || '');
      setEmail(currentData.email || '');
      setPassword(currentData.password || '');
      setAddress(currentData.address || '');
      setCity(currentData.city || '');
      setCountry(currentData.country || '');
      setDefaultImage(defaultProfileImage);
      setImage(currentData.imageUrl || defaultProfileImage);
    }
  }, [currentData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleUpdateProfile = () => {
    const updatedProfile = {
      ...currentData,
      name: {
        firstName,
        lastName,
      },
      contactNumber,
      email,
      address,
      city,
      country,
      password,
      imageUrl: image,
    };
    onUpdate(updatedProfile);
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Rodal
      customStyles={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: isDarkMode ? 'rgb(58, 58, 58)' : 'white',
        color: isDarkMode ? 'white' : 'black',
        width: '50%',
        height: '60vh',
      }}
      className={css.customRodal}
      visible={visible}
      onClose={onClose}
    >
      <div className={css.profileImageContainer}>
        <ImageViewer image={image} largeImageStyle /> 
        <input
          type="file"
          accept="image/*"
          className={css.fileInput}
          onChange={handleImageChange}
          id="profile-image-input"
        />
        <label htmlFor="profile-image-input" className={css.cameraButton}>
          {/* <FaCamera /> {t('updateProfile.camera')} */}
          <FaCamera />
        </label>
      </div>

      <div className={css.formContainer}>
        <div className={css.formColumn}>
          <div className={css.formRow}>
            <label className={css.label}>{t('updateProfile.firstName')}</label>
            <input
              type="text"
              className={css.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={css.formRow}>
            <label className={css.label}>{t('updateProfile.contactNumber')}</label>
            <input
              type="text"
              className={css.input}
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <div className={css.formRow}>
            <label className={css.label}>{t('updateProfile.address')}</label>
            <input
              type="text"
              className={css.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className={`${css.formRow} ${css.passwordContainer}`}>
            <label className={css.label}>{t('updateProfile.password')}</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className={css.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={css.togglePasswordButton}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className={css.formColumn}>
          <div className={css.formRow}>
            <label className={css.label}>{t('updateProfile.lastName')}</label>
            <input
              type="text"
              className={css.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={css.formRow}>
            <label className={css.label}>{t('updateProfile.email')}</label>
            <input
              type="text"
              className={css.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={css.formRow}>
            <label className={css.label}>{t('updateProfile.city')}</label>
            <input
              type="text"
              className={css.input}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className={css.formRow}>
            <label className={css.label}>{t('updateProfile.country')}</label>
            <input
              type="text"
              className={css.input}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button className={css.saveButton} onClick={handleUpdateProfile}>
        {t('updateProfile.save')}
      </button>
    </Rodal>
  );
};

export default UpdateProfile;
