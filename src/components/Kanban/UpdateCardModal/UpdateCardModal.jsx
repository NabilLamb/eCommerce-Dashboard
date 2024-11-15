import React, { useContext, useState } from 'react';
import css from './UpdateCardModal.module.css';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import ThemeContext from "../../../components/ThemeContext/ThemeContext";

const UpdateCardModal = ({ visible, onClose, card, handleCardUpdate }) => {
  const { themeMode } = useContext(ThemeContext); // Use the theme context

  const customStyle = {
    backgroundColor: themeMode === 'dark' ? 'rgb(58, 58, 58)' : 'white',
    padding: '20px',
    width: '50%',
    top: '-3rem',
    height: 'fit-content',
    maxWidth: '40rem',
  };

  const [title, setTitle] = useState(card ? card.title : '');
  const [detail, setDetail] = useState(card ? card.description : '');

  const handleUpdate = () => {
    handleCardUpdate(card.id, title, detail);
    setTitle('');
    setDetail('');
    onClose();
  };

  return (
    <Rodal customStyles={customStyle} visible={visible} onClose={onClose}>
      <div className={`${css.container} ${themeMode === 'dark' ? css.darkMode : css.lightMode}`}>
        <div>
          <span className={css.label}>Card Title</span>
          <input
            type="text"
            className={css.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <span className={css.label}>Detail</span>
          <textarea
            className={css.input}
            rows={10}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          ></textarea>
        </div>
        <button
            disabled={title === "" && detail === ""}
            className={css.saveButton}
            onClick={handleUpdate}
        >
            Update
        </button>
      </div>
    </Rodal>
  );
};

export default UpdateCardModal;
