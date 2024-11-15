import React from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import styles from "./WorldMap.module.css";
import countryCodes from "../../store/countryCodes.js";

const WorldMap = ({ geoData }) => {
  const normalizeCountryName = (country) => {
    return country.replace(/\s+/g, "_");
  };

  const getRegionColors = (data) => {
    const colors = {};
    Object.keys(data).forEach((country) => {
      const normalizedCountry = normalizeCountryName(country);
      const countryCode = countryCodes[normalizedCountry];
      if (countryCode) {
        const numberOfPurchases = data[country].numberOfPurchases;
        let color = "#e4e4e4"; // Default color

        if (numberOfPurchases <= 500) {
          color = "#FFFF00"; // Color for 0 - 500 (yellow)
        } else if (numberOfPurchases <= 1000) {
          color = "#FFA500"; // Color for 501 - 1000 (orange)
        } else if (numberOfPurchases <= 2000) {
          color = "#008000"; // Color for 1001 - 2000 (green)
        } else if (numberOfPurchases <= 3000) {
          color = "#FF0000"; // Color for 2001 - 3000 (red)
        } else {
          color = "#0000FF"; // Color for 3001+ (blue)
        }

        colors[countryCode] = color;
      }
    });
    return colors;
  };

  const regionColors = getRegionColors(geoData);

  return (
    <div className={styles.worldMapContainer}>
      <VectorMap
        map={worldMill}
        backgroundColor="black"
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
        containerClassName="map"
        zoomOnScroll={true}
        zoomButtons={true}
        zoomMax={10}
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 1,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 1,
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
          },
          selected: {
            fill: "#2938bc",
          },
          selectedHover: {
            fill: "#2938bc",
          },
        }}
        series={{
          regions: [
            {
              values: regionColors,
              attribute: "fill",
            },
          ],
        }}
      />
      <div className={styles.key}>
        <div
          className={styles.colorIndicator}
          style={{ backgroundColor: "#FFFF00" }}
        ></div>
        <span>0 - 500</span>
        <div
          className={styles.colorIndicator}
          style={{ backgroundColor: "#FFA500" }}
        ></div>
        <span>501 - 1000</span>
        <div
          className={styles.colorIndicator}
          style={{ backgroundColor: "#008000" }}
        ></div>
        <span>1001 - 2000</span>
        <div
          className={styles.colorIndicator}
          style={{ backgroundColor: "#FF0000" }}
        ></div>
        <span>2001 - 3000</span>
        <div
          className={styles.colorIndicator}
          style={{ backgroundColor: "#0000FF" }}
        ></div>
        <span>3001+</span>
      </div>
    </div>
  );
};

export default WorldMap;
