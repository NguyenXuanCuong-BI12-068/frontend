import styles from './css/Sidebar.module.css';

const LimitedDashboard = () => (
    <div className={styles.limitedDashboard}>
      <h2>Welcome to the Professor Dashboard</h2>
      <p>Your application is currently under review.</p>
      <p>Please wait for admin approval to access full features.</p>
    </div>
  );

export default LimitedDashboard;