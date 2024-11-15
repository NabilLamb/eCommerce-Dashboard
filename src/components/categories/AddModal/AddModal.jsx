import React, { useState, useEffect, useContext } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import css from './AddModal.module.css';
import ThemeContext from '../../ThemeContext/ThemeContext'; // Adjust path as necessary
import { useTranslation } from "react-i18next";

const AddModal = ({ visible, onClose, onAdd, type }) => {
  const { themeMode } = useContext(ThemeContext);

  const customStyle = {
    backgroundColor: themeMode === 'dark' ? 'rgb(58, 58, 58)' : 'white',
    padding: '20px',
    width: '60%',
    top: '10%',
    height: 'fit-content',
    maxWidth: '50rem',
    color: themeMode === 'dark' ? 'white' : 'black',
  };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const { t } = useTranslation();

  const isFormValid = name.trim() !== '' && description.trim() !== '' && image !== null;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddEntity = () => {
    const newEntity = {
      id: Date.now(),
      name,
      description,
      image: URL.createObjectURL(image),
    };
    onAdd(newEntity);
    onClose();
  };

  useEffect(() => {
    if (visible) {
      setName('');
      setDescription('');
      setImage(null);
    }
  }, [visible]);

  let entityNameLabel = '';
  let addMessage = '';

  switch (type) {
    case 'category':
      entityNameLabel = `${t("mix.categoryName")}`;
      addMessage =
        `${t("mix.addsubcategoriesMsg")}`;
      break;
    case 'subcategory':
      entityNameLabel = `${t("mix.subcategoryName")}`;
      addMessage =
      `${t("mix.addsubsubcategoriesMsg")}`;
      break;
    case 'subsubcategory':
      entityNameLabel = `${t("mix.subsubcategoryName")}`;
      addMessage = `${t("mix.addsubsubcategoriesMsg")}`;
      break;
    default:
      entityNameLabel = 'Entity Name';
      break;
  }

  return (
    <Rodal customStyles={customStyle} visible={visible} onClose={onClose}>
      <div className={css.container}>
        <div>
          <span className={`${css.label} ${themeMode === 'light' ? css.lightLabel : ''}`}>{entityNameLabel}</span>
          <input
            type="text"
            className={`${css.input} ${themeMode === 'dark' ? css.darkInput : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ backgroundColor: themeMode === 'dark' ? '#333' : '#fff', color: themeMode === 'dark' ? 'white' : 'black' }}
          />
        </div>
        <div>
          <span className={`${css.label} ${themeMode === 'light' ? css.lightLabel : ''}`}>Image</span>
          <input
            type="file"
            className={`${css.fileInput} ${themeMode === 'dark' ? css.darkInput : ''}`}
            onChange={handleImageChange}
            style={{ backgroundColor: themeMode === 'dark' ? '#333' : '#fff', color: themeMode === 'dark' ? 'white' : 'black' }}
          />
          {image && <button onClick={() => setImage(null)}>Delete</button>}
        </div>
        <div>
          <span className={`${css.label} ${themeMode === 'light' ? css.lightLabel : ''}`}>Description</span>
          <textarea
            className={`${css.input} ${css.textarea} ${themeMode === 'dark' ? css.darkInput : ''}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ backgroundColor: themeMode === 'dark' ? '#333' : '#fff', color: themeMode === 'dark' ? 'white' : 'black' }}
          />
        </div>
        {addMessage && (
          <div className={css.addMessage}>
            <span>{addMessage}</span>
          </div>
        )}
        <button
          disabled={!isFormValid}
          className={`${css.saveButton} ${isFormValid ? '' : css.disabledButton}`}
          onClick={handleAddEntity}
          style={{ backgroundColor: isFormValid ? (themeMode === 'dark' ? '#333' : 'orange') : 'gray', cursor: isFormValid ? 'pointer' : 'not-allowed' }}
        >
          {t("add")}
        </button>
      </div>
    </Rodal>
  );
};

export default AddModal;
