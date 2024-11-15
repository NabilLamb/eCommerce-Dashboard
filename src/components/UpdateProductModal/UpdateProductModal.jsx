import React, { useState, useEffect, useContext } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import css from "./UpdateProductModal.module.css";
import ImageViewer from "../ImageViewer/ImageViewer";
import ThemeContext from "../ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  categoriesData,
  subcategoriesData,
  subsubcategoriesData,
} from "../../data";

const defaultImage = "../../../public/default-image.png";

const UpdateProductModal = ({
  visible,
  onClose,
  handleProductUpdate,
  product,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subSubcategory, setSubSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [mainImage, setMainImage] = useState(defaultImage);
  const [coverImage, setCoverImage] = useState(defaultImage);
  const [images, setImages] = useState([defaultImage]);
  const [description, setDescription] = useState("");

  const { themeMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setStock(parseInt(product.stock, 10));
      setPrice(parseFloat(product.price));
      setDiscount(parseInt(product.discount, 10));
      setMainImage(product.mainImage || defaultImage);
      setCoverImage(product.coverImage || defaultImage);
      setImages(product.images.length > 0 ? product.images : [defaultImage]);
      setDescription(product.description || "");

      const categoryData = categoriesData.find(
        (cat) => cat.id === product.categoryId
      );
      const subcategoryData = subcategoriesData.find(
        (subcat) => subcat.id === product.subcategoryId
      );
      const subSubcategoryData = subsubcategoriesData.find(
        (subsubcat) => subsubcat.id === product.subSubcategoryId
      );

      setCategory(categoryData ? categoryData.id : "");
      setSubcategory(subcategoryData ? subcategoryData.id : "");
      setSubSubcategory(subSubcategoryData ? subSubcategoryData.id : "");
    }
  }, [product]);

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages((prevImages) =>
      prevImages[0] === defaultImage ? newImages : [...prevImages, ...newImages]
    );
  };

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleDeleteFile = (fileType, index) => {
    if (fileType === "mainImage") {
      setMainImage(defaultImage);
    } else if (fileType === "coverImage") {
      setCoverImage(defaultImage);
    } else if (fileType === "image") {
      setImages((prevImages) => {
        const updatedImages = prevImages.filter((_, i) => i !== index);
        return updatedImages.length > 0 ? updatedImages : [defaultImage];
      });
    }
  };

  const handleUpdateProduct = () => {
    const isFormValid =
      name.trim() !== "" &&
      category !== "" &&
      price !== 0 &&
      mainImage !== defaultImage;

    if (isFormValid) {
      const updatedProduct = {
        ...product,
        name,
        categoryId: category,
        subcategoryId: subcategory,
        subSubcategoryId: subSubcategory,
        brand,
        stock,
        price,
        discount,
        mainImage:
          mainImage instanceof File
            ? URL.createObjectURL(mainImage)
            : mainImage,
        coverImage:
          coverImage instanceof File
            ? URL.createObjectURL(coverImage)
            : coverImage,
        images: images.map((image) =>
          image instanceof File ? URL.createObjectURL(image) : image
        ),
        description,
      };
      handleProductUpdate(updatedProduct);
      onClose(); // Close the modal after updating
    } else {
      console.log("Form is not valid. Please fill in all required fields.");
    }
  };

return (
  <Rodal
    customStyles={{
      backgroundColor: themeMode === "dark" ? "rgb(58, 58, 58)" : "white",
      padding: "20px",
      width: "60%",
      top: "5%",
      bottom: "5%",
      height: "auto",
      maxHeight: "90vh",
      maxWidth: "50rem",
      overflowY: "auto",
    }}
    visible={visible}
    onClose={onClose}
  >
    <div
      className={`${css.container} ${
        themeMode === "dark" ? css.dark : css.light
      }`}
    >
      {/* Form fields here */}
      <div>
        <span className={css.label}>
          {t("statistics.productName")} <span className={css.req}>*</span>
        </span>
        <input
          type="text"
          className={css.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <span className={css.label}>
          {t("mix.categoryName")} <span className={css.req}>*</span>
        </span>
        <select
          className={`${css.select} ${
            themeMode === "dark" ? css.dark : css.light
          }`}
          value={category}
          onChange={(e) => {
            const selectedCategory = e.target.value;
            setCategory(selectedCategory);
            setSubcategory("");
            setSubSubcategory("");
          }}
        >
          <option value="">{t("mix.SelectCategory")}</option>
          {categoriesData.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span className={css.label}>{t("mix.subcategoryName")}</span>
        <select
          className={`${css.select} ${
            themeMode === "dark" ? css.dark : css.light
          }`}
          value={subcategory}
          onChange={(e) => {
            const selectedSubcategory = e.target.value;
            setSubcategory(selectedSubcategory);
            setSubSubcategory("");
          }}
          disabled={!category}
        >
          <option value="">{t("mix.SelectSubCategory")}</option>
          {subcategoriesData
            .filter((subcat) => subcat.categoryId === parseInt(category, 10))
            .map((subcat) => (
              <option key={subcat.id} value={subcat.id}>
                {subcat.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <span className={css.label}>{t("mix.subsubcategoryName")}</span>
        <select
          className={`${css.select} ${
            themeMode === "dark" ? css.dark : css.light
          }`}
          value={subSubcategory}
          onChange={(e) => setSubSubcategory(e.target.value)}
          disabled={!subcategory}
        >
          <option value="">{t("mix.SelectSubSubCategory")}</option>
          {subsubcategoriesData
            .filter(
              (subsubcat) =>
                subsubcat.subcategoryId === parseInt(subcategory, 10)
            )
            .map((subsubcat) => (
              <option key={subsubcat.id} value={subsubcat.id}>
                {subsubcat.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <span className={css.label}>{t("tableHeader.brand")}</span>
        <input
          type="text"
          className={css.input}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>
      <div>
        <span className={css.label}>Stock</span>
        <input
          type="number"
          className={css.input}
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <span className={css.label}>
          {t("tableHeader.Price")} <span className={css.req}>*</span>
        </span>
        <input
          type="number"
          className={css.input}
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <span className={css.label}>{t("tableHeader.discount")}</span>
        <input
          type="number"
          className={css.input}
          value={discount}
          onChange={(e) => setDiscount(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <span className={css.label}>
          {t("mix.MainImage")} <span className={css.req}>*</span>
        </span>
        <input
          type="file"
          className={css.fileInput}
          onChange={handleMainImageChange}
        />
        {mainImage && (
          <div className={css.imageWrapper}>
            <ImageViewer image={mainImage} />
            <button
              className={css.deleteButton}
              onClick={() => handleDeleteFile("mainImage")}
            >
              🗑️
            </button>
          </div>
        )}
      </div>
      <div>
        <span className={css.label}>{t("mix.CoverImage")}</span>
        <input
          type="file"
          className={css.fileInput}
          onChange={handleCoverImageChange}
        />
        {coverImage && (
          <div className={css.imageWrapper}>
            <ImageViewer image={coverImage} />
            <button
              className={css.deleteButton}
              onClick={() => handleDeleteFile("coverImage")}
            >
              🗑️
            </button>
          </div>
        )}
      </div>
      <div>
        <span className={css.label}>{t("mix.AdditionalImages")}</span>
        <input
          type="file"
          className={css.fileInput}
          multiple
          onChange={handleImageChange}
        />
        <div className={css.imageGallery}>
          {images.map((image, index) => (
            <div key={index} className={css.imageWrapper}>
              <ImageViewer image={image} />
              <button
                className={css.deleteButton}
                onClick={() => handleDeleteFile("image", index)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <span className={css.label}>Description</span>
        <textarea
          className={css.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div></div>
      <div className={css.buttonContainer}>
        <button className={css.updateButton} onClick={handleUpdateProduct}>
          Update
        </button>
      </div>
    </div>
  </Rodal>
);

};

export default UpdateProductModal;
