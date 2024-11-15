import React, { useState, useEffect, useContext, useMemo } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import css from "./UpdateModal.module.css";
import ImageViewer from "../../ImageViewer/ImageViewer"; // Adjust path as necessary
import ThemeContext from "../../ThemeContext/ThemeContext";
import { createTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const defaulImage = "../../../../public/default-image.png";

const UpdateModal = ({
  visible,
  onClose,
  onUpdate,
  entity,
  currentData,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [defaultImage, setDefaultImage] = useState(defaulImage);
  const { t } = useTranslation();

  const { themeMode } = useContext(ThemeContext);

  useEffect(() => {
    if (currentData) {
      setName(currentData.name || "");
      setDescription(currentData.description || "");

      switch (entity) {
        case "category":
          setDefaultImage(defaulImage);
          setImage(currentData.image || defaulImage);
          break;
        case "subcategory":
          setDefaultImage(defaulImage);
          setImage(currentData.image || defaulImage);
          break;
        case "subsubcategory":
          setDefaultImage(defaulImage);
          setImage(currentData.image || defaulImage);
          break;
        default:
          setDefaultImage(defaulImage);
          setImage(currentData.image || defaulImage);
          break;
      }
    }
  }, [currentData, entity]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDeleteFile = () => {
    setImage(defaulImage);
  };

  const handleUpdateEntity = () => {
    const updatedEntity = {
      ...currentData,
      name,
      description,
      image: image instanceof File ? URL.createObjectURL(image) : image,
    };
    onUpdate(updatedEntity);
    onClose();
  };

  let entityNameLabel = "";
  switch (entity) {
    case "category":
      entityNameLabel = `${t("mix.categoryName")}`;
      break;
    case "subcategory":
      entityNameLabel = `${t("mix.subcategoryName")}`;
      break;
    case "subsubcategory":
      entityNameLabel = `${t("mix.subsubcategoryName")}`;
      break;
    default:
      break;
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Rodal
      customStyles={{
        backgroundColor: isDarkMode ? "rgb(58, 58, 58)" : "white",
        padding: "20px",
        width: "60%",
        top: "5%",
        bottom: "5%",
        height: "72vh",
        maxHeight: "90vh",
        maxWidth: "50rem",
        overflowY: "auto",
        color: isDarkMode ? "white" : "black",
      }}
      visible={visible}
      onClose={onClose}
    >
      <div className={css.container}>
        <div>
          <span className={css.label} style={{ color: isDarkMode ? "white" : "black" }}>
            {entityNameLabel}
          </span>
          <input
            type="text"
            className={css.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ color: isDarkMode ? "white" : "black", backgroundColor: isDarkMode ? "#333" : "#fff" }}
          />
        </div>
        <div>
          <span className={css.label} style={{ color: isDarkMode ? "white" : "black" }}>
            Image
          </span>
          <input
            type="file"
            className={css.fileInput}
            onChange={handleImageChange}
            style={{ color: isDarkMode ? "white" : "black", backgroundColor: isDarkMode ? "#333" : "#fff" }}
          />
          {image && (
            <div className={css.imageWrapper}>
              <ImageViewer image={image} />
              <button className={css.deleteButton} onClick={handleDeleteFile}>
                🗑️
              </button>
            </div>
          )}
        </div>
        <div>
          <span className={css.label} style={{ color: isDarkMode ? "white" : "black" }}>
            Description
          </span>
          <textarea
            className={`${css.input} ${css.textarea}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ color: isDarkMode ? "white" : "black", backgroundColor: isDarkMode ? "#333" : "#fff" }}
          />
        </div>
        <div className={css.buttonContainer}>
          <button className={css.saveButton} onClick={handleUpdateEntity}>
            Update
          </button>
        </div>
      </div>
    </Rodal>
  );
};

export default UpdateModal;
