import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/DashboardCard.module.css';

const DashboardCard = ({icon, iconComponent, title, count, percentage }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        {iconComponent ? iconComponent : <i className={`fa ${icon}`}></i>}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.count}>{count}</p>
        {percentage && (
          <p className={`${styles.percentage} ${styles[percentage.color]}`}>
            <span>{percentage.amount}</span>
            {percentage.label}
          </p>
        )}
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  icon: PropTypes.string,
  iconComponent: PropTypes.element,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.string,
    amount: PropTypes.string,
    label: PropTypes.string,
  }),
};

export default DashboardCard;
