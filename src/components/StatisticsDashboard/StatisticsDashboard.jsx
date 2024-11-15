import React, { useContext } from "react";
import { groupNumber } from "../../data";
import StatisticsChart from "../StatisticsChart/StatisticsChart";
import css from "./StatisticsDashboard.module.css";
import { BsArrowUpShort } from "react-icons/bs";
import ThemeContext from "../ThemeContext/ThemeContext"; 
import { useTranslation } from "react-i18next";

const Statistics = () => {
  const { t } = useTranslation();
  const { themeMode } = useContext(ThemeContext); 
  return (
    <div className={`${css.container} theme-container`}>
      <span className={css.title}>{t("statistics.topProductTitle")}</span>
      <div className={`${css.cards} grey-container`}>
        <div className={css.cardGroup}>
          <div className={css.arrowIcon}>
            <BsArrowUpShort />
          </div>
          <div className={css.card}>
            <span>{t("statistics.productName")}</span>
          </div>
        </div>
        <div className={css.cardGroup}>
          <div className={css.card}>
            <span>{t("statistics.items")}</span>
            <span>{groupNumber(876)}</span>
          </div>
        </div>
        <div className={css.cardGroup}>
          <div className={css.card}>
            <span>{t("statistics.profit")}</span>
            <span>$ {groupNumber(370000)}</span>
          </div>
        </div>
        <div className={css.cardGroup}>
          <div className={css.card}>
            <span>{t("statistics.dailyAverage")}</span>
            <span>$ {groupNumber(2000)}</span>
          </div>
        </div>
      </div>
      <StatisticsChart />
    </div>
  );
};

export default Statistics;
