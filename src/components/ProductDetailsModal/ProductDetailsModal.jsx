import React, { useState, useEffect, useContext } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import styles from "./ProductDetailsModal.module.css";
import ImageViewer from "../ImageViewer/ImageViewer";
import ProductGraph from "../ProductGraph/ProductGraph";
import GenderStatistics from "../ProductGraph/GenderStatistics";
import AgeStatistics from "../ProductGraph/AgeStatistics";
import WorldMap from "../WorldMap/WorldMap";
import CountryStatisticsProduct from "../CountryStatistics/CountryStatisticsProduct";
import FeedbackStatistics from "../FeedbackStatistics/FeedbackStatistics";
import {
  categoriesData,
  subcategoriesData,
  subsubcategoriesData,
} from "../../data";
import ThemeContext from "../ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";

const ProductDetailsModal = ({ visible, onClose, product }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isCustomerStatsOpen, setIsCustomerStatsOpen] = useState(false);
  const [isGeographicalStatsOpen, setIsGeographicalStatsOpen] = useState(false);
  const [description, setDescription] = useState(product.description || "");
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subSubcategoryName, setSubSubcategoryName] = useState("");
  const { t } = useTranslation();

  const { themeMode } = useContext(ThemeContext);
  const textColor = themeMode === "dark" ? "white" : "black"; // Define textColor based on theme mode
  const backgroundColor = themeMode === "dark" ? "rgb(58, 58, 58)" : "white"; // Define backgroundColor based on theme mode

  useEffect(() => {
    const foundCategory = categoriesData.find(
      (cat) => cat.id === product.categoryId
    );
    const foundSubcategory = subcategoriesData.find(
      (subcat) => subcat.id === product.subcategoryId
    );
    const foundSubSubcategory = subsubcategoriesData.find(
      (subsubcat) => subsubcat.id === product.subSubcategoryId
    );

    if (foundCategory) {
      setCategoryName(foundCategory.name);
    }
    if (foundSubcategory) {
      setSubcategoryName(foundSubcategory.name);
    }
    if (foundSubSubcategory) {
      setSubSubcategoryName(foundSubSubcategory.name);
    }
  }, [product]);

  const toggleInfo = () => setIsInfoOpen(!isInfoOpen);
  const toggleStats = () => setIsStatsOpen(!isStatsOpen);
  const toggleCustomerStats = () =>
    setIsCustomerStatsOpen(!isCustomerStatsOpen);
  const toggleGeographicalStats = () =>
    setIsGeographicalStatsOpen(!isGeographicalStatsOpen);

  const customStyle = {
    backgroundColor: backgroundColor, // Set background color based on theme mode
    color: textColor,
    padding: "20px",
    width: "80%",
    height: "80vh",
    top: "10vh",
    maxWidth: "none",
    maxHeight: "none",
    overflowY: "auto",
  };

  const renderStars = (rate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starClass = styles.emptyStar;
      let fillPercentage = 0;

      if (rate >= i) {
        starClass = styles.filledStar;
        fillPercentage = 100;
      } else if (rate > i - 1) {
        starClass = styles.partialStar;
        fillPercentage = (rate - (i - 1)) * 100;
      }

      stars.push(
        <span
          key={i}
          className={starClass}
          style={
            starClass === styles.partialStar
              ? { "--fill-percentage": `${fillPercentage}%` }
              : {}
          }
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (!product) {
    return null;
  }

  const translate = {
    ProductName: t("statistics.productName"),
    Price: t("tableHeader.Price"),
    CategoryName: t("mix.categoryName"),
    SubcategoryName: t("mix.subcategoryName"),
    SubSubcategoryName: t("mix.subsubcategoryName"),
    Brand: t("tableHeader.brand"),
    Discount: t("tableHeader.discount"),
    CreatedAt: t("tableHeader.createdAt"),
    LastUpdate: t("tableHeader.lastUpdate"),
    MainImage: t("mix.MainImage"),
    CoverImage: t("mix.CoverImage"),
    AdditionalImages: t("mix.AdditionalImages"),
    GeneralStatistics: t("mix.GeneralStatistics"),
  };

  return (
    <Rodal customStyles={customStyle} visible={visible} onClose={onClose}>
      <div
        className={styles.modalContainer}
        style={{ color: textColor, backgroundColor: backgroundColor }}
      >
        <div className={styles.header} onClick={toggleInfo}>
          {isInfoOpen ? "˅ Informations" : "> Informations"}
        </div>
        {isInfoOpen && (
          <div className={`${styles.section} ${styles.expand}`}>
            <div className={styles.infoGrid}>
              <InfoRow label="ID" value={product.id} />
              <InfoRow label={translate.ProductName} value={product.name} />
              <InfoRow label={translate.Price} value={`$${product.price}`} />
              <InfoRow label={translate.CategoryName} value={categoryName} />
              <InfoRow label={translate.SubcategoryName} value={subcategoryName} />
              <InfoRow label={translate.SubSubcategoryName} value={subSubcategoryName} />
              <InfoRow label={translate.Brand} value={product.brand} />
              <InfoRow label={translate.Discount} value={`${product.discount}%`} />
              <InfoRow label="Stock" value={product.stock} />
              <InfoRow
                label={translate.CreatedAt}
                value={new Date(product.createdAt).toLocaleDateString()}
              />
              <InfoRow
                label={translate.LastUpdate}
                value={new Date(product.updatedAt).toLocaleDateString()}
              />
              <InfoRow
                label={translate.MainImage}
                value={<ImageViewer image={product.mainImage} />}
              />
              <InfoRow
                label={translate.CoverImage}
                value={<ImageViewer image={product.coverImage} />}
              />
              <InfoRow
                label={translate.AdditionalImages}
                value={product.images.map((image, index) => (
                  <ImageViewer key={index} image={image} />
                ))}
              />
              <InfoRow label="Description" value={description} />
            </div>
          </div>
        )}

        <div className={styles.header} onClick={toggleStats}>
          {isStatsOpen ? `˅ ${translate.GeneralStatistics}` : `> ${translate.GeneralStatistics}`}
        </div>
        {isStatsOpen && (
          <div className={`${styles.section} ${styles.expand}`}>
            <div className={styles.statsGrid}>
              <StatsRow label={t('mix.TotalSold')} value={product.totalSold} />
              <StatsRow
                label={t("mix.TotalRevenue")}
                value={`$${product.totalRevenue}`}
              />
              <StatsRow
                label={t('mix.Rating')}
                value={
                  <div className={styles.statsStars}>
                    {renderStars(product.rate)}
                  </div>
                }
              />
              <div className={styles.graphContainer}>
                <ProductGraph product={product} />
              </div>
            </div>
          </div>
        )}

        <div className={styles.header} onClick={toggleCustomerStats}>
          {isCustomerStatsOpen
            ? `˅ ${t("mix.CustomerStatistics")}`
            : `> ${t("mix.CustomerStatistics")}`}
        </div>
        {isCustomerStatsOpen && (
          <div className={`${styles.section} ${styles.expand}`}>
            <div className={styles.mapContainer}>
              <h3>{t('mix.AgeStatistics')}</h3>
              <AgeStatistics ageData={product.customerSegments.age} />
            </div>
            <div className={styles.mapContainer}>
              <h3>{t('mix.GenderStatistics')}</h3>
              <GenderStatistics genderData={product.customerSegments.gender} />
            </div>
            <div
              className={`${styles.mapContainer} ${
                themeMode === "dark" ? styles.darkTable : styles.lightTable
              }`}
            >
              <h3>{t('mix.FeedbackStatistics')}</h3>
              <FeedbackStatistics
                feedbackData={product.customerFeedback}
                themeMode={themeMode}
              />
            </div>
          </div>
        )}

        <div className={styles.header} onClick={toggleGeographicalStats}>
          {isGeographicalStatsOpen
            ? `˅ ${t("mix.GeographicalStatistics")}`
            : `> ${t("mix.GeographicalStatistics")}`}
        </div>
        {isGeographicalStatsOpen && (
          <div className={`${styles.section} ${styles.expand}`}>
            <div className={styles.mapContainer}>
              <h3>{t("mix.ProfitDynamics")}</h3>
              <CountryStatisticsProduct
                geoData={product.Geo}
                price={product.price}
              />
            </div>
            <div className={styles.mapContainer}>
              <h3>{t("mix.GeoPurchase")}</h3>
              <WorldMap geoData={product.Geo} />
            </div>
          </div>
        )}
      </div>
    </Rodal>
  );
};

const InfoRow = ({ label, value }) => (
  <div className={styles.infoRow}>
    <div className={styles.infoLabel}>{label}:</div>
    <div className={styles.infoValue}>{value}</div>
  </div>
);

const StatsRow = ({ label, value }) => (
  <div className={styles.statsRow}>
    <div className={styles.statsLabel}>{label}:</div>
    <div className={styles.statsValue}>{value}</div>
  </div>
);

export default ProductDetailsModal;
