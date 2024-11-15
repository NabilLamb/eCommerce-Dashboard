import React, { useState, useEffect, useContext } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import css from "./AddProductModal.module.css";
import {
  categoriesData,
  subcategoriesData,
  subsubcategoriesData,
} from "../../data";
import ThemeContext from "../ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";
const AddProductModal = ({ visible, onClose, handleProductAdd }) => {
  const { themeMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  const containerClass =
    themeMode === "dark" ? css.darkContainer : css.lightContainer;
  const inputClass = themeMode === "dark" ? css.darkInput : css.lightInput;
  const selectOptionClass =
    themeMode === "dark" ? css.darkSelectOption : css.lightOption;
  const textareaClass =
    themeMode === "dark" ? css.darkTextarea : css.lightTextarea;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subSubcategory, setSubSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [disableExcel, setDisableExcel] = useState(false);

  const isFormValid = name && category && price && mainImage;

  useEffect(() => {
    if (
      !name &&
      !category &&
      !subcategory &&
      !subSubcategory &&
      !brand &&
      !stock &&
      !price &&
      !discount &&
      !images.length &&
      !mainImage &&
      !coverImage
    ) {
      setDisableExcel(false);
    } else {
      setDisableExcel(true);
    }
  }, [
    name,
    category,
    subcategory,
    subSubcategory,
    brand,
    stock,
    price,
    discount,
    images,
    mainImage,
    coverImage,
  ]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleExcelFileChange = (e) => {
    setExcelFile(e.target.files[0]);
    setDisableExcel(true);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setDisableExcel(true);
  };

  const handleDeleteFile = (fileType) => {
    switch (fileType) {
      case "mainImage":
        setMainImage(null);
        break;
      case "coverImage":
        setCoverImage(null);
        break;
      case "excelFile":
        setExcelFile(null);
        setDisableExcel(false);
        break;
      default:
        break;
    }
  };

  const handleAddProduct = () => {
    const imageFiles = [...images].map((file) => URL.createObjectURL(file));
    const newProduct = {
      name,
      category,
      subcategory,
      subSubcategory,
      brand,
      stock,
      price,
      discount,
      description,
      mainImage: mainImage ? URL.createObjectURL(mainImage) : null,
      coverImage: coverImage ? URL.createObjectURL(coverImage) : null,
      images: imageFiles,
      excelFile,
    };

    handleProductAdd(newProduct);

    setName("");
    setCategory("");
    setSubcategory("");
    setSubSubcategory("");
    setBrand("");
    setStock("");
    setPrice("");
    setDiscount("");
    setDescription("");
    setImages([]);
    setMainImage(null);
    setCoverImage(null);
    setExcelFile(null);
    setDisableExcel(false);
  };

  const customStyle = {
    padding: "20px",
    borderRadius: "10px",
    width: "70%",
    height: "90vh",
    backgroundColor: themeMode === "dark" ? "#333" : "#fff",
    color: themeMode === "dark" ? "#fff" : "#000",
  };

  const translate = {
    ProductName: t("statistics.productName"),
    CategoryName: t("mix.categoryName"),
    SelectCategory: t("mix.SelectCategory"),
    SubcategoryName: t("mix.subcategoryName"),
    SelectSubcategory: t("mix.SelectSubCategory"),
    SubSubcategoryName: t("mix.subsubcategoryName"),
    SelectSubSubcategory: t("mix.SelectSubSubCategory"),
    Brand: t("tableHeader.brand"),
    Stock: t("tableHeader.stock"),
    Price: t("tableHeader.Price"),
    Discount: t("tableHeader.discount"),
    MainImage: t("mix.MainImage"),
    CoverImage: t("mix.CoverImage"),
    AdditionalImages: t("mix.AdditionalImages"),
    Description: t("tableHeader.description"),
  };


  return (
    <Rodal customStyles={customStyle} visible={visible} onClose={onClose}>
      <div className={`${css.container} ${containerClass}`}>
        <div className={css.gridItem}>
          <span className={css.label}>
            {translate.ProductName} <span className={css.req}>*</span>
          </span>
          <input
            type="text"
            className={`${css.input} ${inputClass}`}
            value={name}
            onChange={handleInputChange(setName)}
            disabled={!!excelFile}
            required
          />
        </div>
        <div className={css.gridItem}>
          <span className={css.label}>
            {translate.CategoryName} <span className={css.req}>*</span>
          </span>
          <select
            className={`${css.select} ${inputClass}`}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory("");
              setSubSubcategory("");
            }}
            disabled={!!excelFile}
            required
          >
            <option value="">{translate.SelectCategory}</option>
            {categoriesData.map((cat) => (
              <option key={cat.id} value={cat.id} className={selectOptionClass}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className={css.gridItem}>
          <span className={css.label}>{translate.SubcategoryName}</span>
          <select
            className={`${css.select} ${inputClass}`}
            value={subcategory}
            onChange={(e) => {
              setSubcategory(e.target.value);
              setSubSubcategory("");
            }}
            disabled={!category || !!excelFile}
          >
            <option value="">{translate.SelectSubcategory}</option>
            {subcategoriesData
              .filter((subcat) => subcat.categoryId === parseInt(category))
              .map((subcat) => (
                <option
                  key={subcat.id}
                  value={subcat.id}
                  className={selectOptionClass}
                >
                  {subcat.name}
                </option>
              ))}
          </select>
        </div>
        <div className={css.gridItem}>
          <span className={css.label}>{translate.SubSubcategoryName}</span>
          <select
            className={`${css.select} ${inputClass}`}
            value={subSubcategory}
            onChange={(e) => setSubSubcategory(e.target.value)}
            disabled={!subcategory || !!excelFile}
          >
            <option value="">{translate.SelectSubSubcategory}</option>
            {subsubcategoriesData
              .filter(
                (subsubcat) => subsubcat.subcategoryId === parseInt(subcategory)
              )
              .map((subsubcat) => (
                <option
                  key={subsubcat.id}
                  value={subsubcat.id}
                  className={selectOptionClass}
                >
                  {subsubcat.name}
                </option>
              ))}
          </select>
        </div>
        <div className={css.gridItem}>
          <span className={css.label}>{translate.Brand}</span>
          <input
            type="text"
            className={`${css.input} ${inputClass}`}
            value={brand}
            onChange={handleInputChange(setBrand)}
            disabled={!!excelFile}
          />
        </div>
        <div className={css.gridItem}>
          <span className={css.label}>Stock</span>
          <input
            type="number"
            className={`${css.input} ${inputClass}`}
            value={stock}
            onChange={handleInputChange(setStock)}
            disabled={!!excelFile}
          />
        </div>
        <div className={css.gridItem}>
          <span className={css.label}>
            {translate.Price} <span className={css.req}>*</span>
          </span>
          <input
            type="number"
            className={`${css.input} ${inputClass}`}
            value={price}
            onChange={handleInputChange(setPrice)}
            disabled={!!excelFile}
            required
          />
        </div>
        <div className={css.gridItem}>
          <span className={css.label}>{translate.Discount}</span>
          <input
            type="number"
            className={`${css.input} ${inputClass}`}
            value={discount}
            onChange={handleInputChange(setDiscount)}
            disabled={!!excelFile}
          />
        </div>
        <div className={css.gridItem}>
          <span className={css.label}>
            {translate.MainImage} <span className={css.req}>*</span>
          </span>
          <input
            type="file"
            className={`${css.fileInput} ${inputClass}`}
            onChange={handleMainImageChange}
            disabled={!!excelFile}
            required
          />
          {mainImage && (
            <button onClick={() => handleDeleteFile("mainImage")}>
              {t("delete")}
            </button>
          )}
        </div>
        <div className={css.gridItem}>
          <span className={css.label}>{translate.CoverImage}</span>
          <input
            type="file"
            className={`${css.fileInput} ${inputClass}`}
            onChange={handleCoverImageChange}
            disabled={!!excelFile}
          />
          {coverImage && (
            <button onClick={() => handleDeleteFile("coverImage")}>
              {t("delete")}
            </button>
          )}
        </div>
        <div className={css.gridItem}>
          <span className={css.label}>{translate.AdditionalImages}</span>
          <input
            type="file"
            className={`${css.fileInput} ${inputClass}`}
            multiple
            onChange={handleImageChange}
            disabled={!!excelFile}
          />
          {images.length > 0 && (
            <button onClick={() => setImages([])}>{t("delete")}</button>
          )}
        </div>
        {/* <div className={css.gridItem}>
          <span className={css.label}>Import from Excel</span>
          <input
            type="file"
            className={`${css.fileInput} ${inputClass}`}
            onChange={handleExcelFileChange}
            disabled={disableExcel}
          />
          {excelFile && (
            <button onClick={() => handleDeleteFile("excelFile")}>
              Delete
            </button>
          )}
        </div> */}
        <div></div>
        <div className={`${css.gridItem}`}>
          <span className={css.label}>Description</span>
          <textarea
            className={`${css.textarea} ${inputClass}`}
            value={description}
            onChange={handleInputChange(setDescription)}
            disabled={!!excelFile}
            rows={6}
            style={{ width: "100%", height: "20rem" }}
          />
        </div>

        {/* Add Product Button */}
        <button
          className={`${css.addButton} ${
            isFormValid ? css.addButtonActive : css.addButtonDisabled
          }`}
          onClick={handleAddProduct}
          disabled={!isFormValid}
        >
          {t("add")}
        </button>
      </div>
    </Rodal>
  );
};

export default AddProductModal;
