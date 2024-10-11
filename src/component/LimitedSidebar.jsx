import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/SideBar.module.css';

const LimitedSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/professordashboard" className={styles.sidebarLink}>
            <i className="fa fa-user"></i>
            <span className={styles.linksName}>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/editprofessorprofile" className={styles.sidebarLink}>
            <i className="fa fa-user"></i>
            <span className={styles.linksName}>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/approveprofessor" className={styles.sidebarLink}>
            <i className="fa fa-check-circle"></i>
            <span className={styles.linksName}>Approval Status</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LimitedSidebar;