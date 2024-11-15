import React, { useContext } from "react";
import css from "./Dashboard.module.css";
import { cardsData, groupNumber } from "../../data";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import ThemeContext from "../../components/ThemeContext/ThemeContext";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className={`${css.container} ${themeMode === "dark" ? css.darkMode : css.lightMode}`}>
      <div className={`${css.dashboard}`}>
        <div className={`${css.dashboardHead} theme-container`}>
          <div className={css.head}>
            <div className={css.durationButton}>
              <select>
                <option value="1w">1 {t("durationOptions.week")}</option>
                <option value="1m">1 {t("durationOptions.month")}</option>
                <option value="1y">1 {t("durationOptions.year")}</option>
              </select>
            </div>
          </div>

          <div className={`${css.cards}`}>
            {cardsData.map((card, index) => (
              <div className={css.card} key={index}>
                <div className={css.cardHead}>
                  <span>{t(`cardTitles.${card.title}`)}</span>
                  <span className={card.change >= 0 ? css.positiveChange : css.negativeChange}>
                    {card.change >= 0 ? `+${card.change}` : `${card.change}`}
                  </span>
                </div>
                <div className={css.cardAmount}>
                  <span>$</span>
                  <span>{groupNumber(card.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <StatisticsDashboard />
      </div>

      {/* <Orders /> */}
    </div>
  );
};

export default Dashboard;
