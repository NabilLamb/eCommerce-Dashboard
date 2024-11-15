import React from 'react';
import styles from './FeedbackStatistics.module.css';
import { useTranslation } from "react-i18next";

const FeedbackStatistics = ({ feedbackData, themeMode }) => {
  const { t } = useTranslation();

  return (
    <div
      className={styles.mapContainer}
      style={{
        '--background-color': themeMode === 'dark' ? '#272727' : '#ffffff',
        '--header-background-color': themeMode === 'dark' ? '#000000' : '#ffffff',
        '--header-text-color': themeMode === 'dark' ? '#f5f5f5' : '#000000',
        '--row-background-color': themeMode === 'dark' ? '#f9f9f9' : '#f3f3f3',
        '--text-color': themeMode === 'dark' ? '#ffffff' : '#000000',
      }}
    >
      <table className={styles.feedbackTable}>
        <thead>
          <tr>
            <th>{t('comment')}</th>
            <th>{t('mix.Rating')}</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((feedback, index) => (
            <tr key={index} className={styles.feedbackItem}>
              <td className={styles.comment}>{feedback.comment}</td>
              <td className={styles.rating}>{'★'.repeat(feedback.rating)}
                <span className={styles.ratingNumber}>{feedback.rating}/5</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackStatistics;
