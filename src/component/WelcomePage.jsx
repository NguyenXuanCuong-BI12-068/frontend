import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import Footer from './Footer';
import styles from './css/WelcomePage.module.css';
import lmsBgImage from '../assets/images/lms-bg.png';
import adminImage from '../assets/images/admin.png';
import professorImage from '../assets/images/femaleprofessor.png';
import userImage from '../assets/images/male.png';

const WelcomePage = () => {
  const [activeText, setActiveText] = useState(null);
  const navigate = useNavigate();

  const toggleText = (textNumber) => {
    setActiveText(activeText === textNumber ? null : textNumber);
  };

  return (
    <>
      <div className={styles.nav}>
      <label></label>
      <div className={styles.switchs}>
        <Link to="/" className={`${styles.log} ${styles.bold}`}>
          <i className="fa fa-home"></i> Home
        </Link>
        <a href="#services" className={`${styles.log} ${styles.bold}`}>
          <i className="fa fa-cog"></i> Services
        </a>
        <Link to="/login" className={`${styles.log} ${styles.bold}`}>
          <i className="fa fa-sign-in"></i> LOGIN
        </Link>
        <Link to="/register" className={`${styles.create_acc} ${styles.bold}`}>
          <i className="fa fa-user-plus"></i> CREATE ACCOUNT
        </Link>
      </div>
    </div>
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.text}>
            <h1>ELearning Management System</h1>
            <h4>Developed by - Gowthamraj K</h4>
          </div>
          <img className={styles.floating} src={lmsBgImage} alt="LMS Background" />
        </div>
      </div>

      <marquee className={styles.marquee} direction="left">
        🔔 Stay Home !!! Stay Safe !!! Lets Fight together against COVID-19. This Elearning Management system is designed by Gowthamraj K. If Already our Customer, please Login to see your Current Learning Status 😀
      </marquee>

      <section id="about" className={styles.about}>
        <div className={styles.aboutContainer}>
          <div className={styles.subtext} onClick={() => toggleText(1)}>
            <span className={styles.counter}>01</span> User Friendly Learning Portal
            <i className={`fa fa-caret-down ${activeText === 1 ? styles.active : ''}`}></i>
          </div>
          {activeText === 1 && (
            <div className={styles.innertext}>
              This Portal facilitates you for an <b>user-friendly</b> experience with all the learning contents and resources to improve your skills. You can also <b>download the course related materials</b> from our portal which can make your learning process much easier
            </div>
          )}
        </div>
        <div className={styles.aboutContainer}>
          <div className={styles.subtext} onClick={() => toggleText(2)}>
            <span className={styles.counter}>02</span> Three Different Modes
            <i className={`fa fa-caret-down ${activeText === 2 ? styles.active : ''}`}></i>
          </div>
          {activeText === 2 && (
            <div className={styles.innertext}>
              This elearning Portal has three different modes of working as <b>ADMIN, PROFESSOR & USER.</b> Each of them can access to their respective features and perform their task accordingly. (by default, the ADMIN will be <b>GowthamRaj K </b><b>(portal creator)</b>
            </div>
          )}
        </div>
        <div className={styles.aboutContainer}>
          <div className={styles.subtext} onClick={() => toggleText(3)}>
            <span className={styles.counter}>03</span> Specific Learning Contents
            <i className={`fa fa-caret-down ${activeText === 3 ? styles.active : ''}`}></i>
          </div>
          {activeText === 3 && (
            <div className={styles.innertext}>
              Separate Learning contents have been included for both <b>video based lectures</b> and <b>website based lectures.</b> The <b>ADMIN</b> or <b>PROFESSOR</b> can specify the course type while adding a new course
            </div>
          )}
        </div>
        <div className={styles.aboutContainer}>
          <div className={styles.subtext} onClick={() => toggleText(4)}>
            <span className={styles.counter}>04</span> Plug-In Play Embedded video lectures
            <i className={`fa fa-caret-down ${activeText === 4 ? styles.active : ''}`}></i>
          </div>
          {activeText === 4 && (
            <div className={styles.innertext}>
              <b>Video based lectures</b> are also divided into <b>chapters</b> as per the instructors and users are facilitated to learn as an embedded video lecture in our <b>custom video player.</b> You can also <b>take notes, download resources, ask queries and give feedback about the course.</b>
            </div>
          )}
        </div>
        <img className={styles.automation} src={userImage} alt="Portal" width="470" height="470" />
      </section>

      <main id="main">
        <section id="services" className={styles.services}>
          <div className={styles.container}>
            <div className={styles.sectionTitle}>
              <h2>User friendly portal for Learning</h2>
            </div>
            <div className={styles.midBody2}>
              <div className={styles.details}>
                <div className={styles.detail} onClick={() => navigate('/login')}>
                  <h2>Admin</h2>
                  <div className={styles.circle}>
                    <img src={adminImage} alt="Admin" width="130" height="130" />
                  </div>
                </div>
                <div className={styles.detail} onClick={() => navigate('/login')}>
                  <h2>Professor</h2>
                  <div className={styles.circle}>
                    <img src={professorImage} alt="Professor" width="130" height="130" />
                  </div>
                </div>
                <div className={styles.detail} onClick={() => navigate('/login')}>
                  <h2>User</h2>
                  <div className={styles.circle}>
                    <img src={userImage} alt="User" width="130" height="130" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default WelcomePage;
