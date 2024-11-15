import React, { useState } from 'react';
import Modal from 'react-modal';
import css from './ImageViewer.module.css';
import { useTranslation } from "react-i18next";

Modal.setAppElement('#root'); // Adjust if your app root element has a different id

const ImageViewer = ({ image, largeImageStyle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { t } = useTranslation();

// Check if image is a Blob
const isBlob = image instanceof Blob;

// Generate image source URL based on the type of image prop
const imageURL = isBlob ? URL.createObjectURL(image) : image;

  return (
    <div className={css.imageViewer}>
      <div className={largeImageStyle ? css.profileImageLarge : css.profileImageSmall}>
        <img
          src={imageURL}
          className={largeImageStyle ? css.largeThumbnail : css.thumbnail}
          alt="thumbnail"
          onClick={handleOpenModal}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <img src={imageURL} className={css.largeImage} alt="large" />
        <button onClick={handleCloseModal} className={css.closeButton}>{t('close')}</button>
      </Modal>
    </div>
  );
};

export default ImageViewer;
