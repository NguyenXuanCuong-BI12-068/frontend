import React from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className={styles.container}
      >
        <div className={styles.gridContainer}>
          {/* first section */}
          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>Smart and Dynamic Elearning</h1>
            <p className={styles.sectionText}>
              SDE is a platform dedicated to empowering aspiring developers.
              From beginner tutorials to advanced programming concepts, we
              provide a comprehensive learning experience designed to help you
              master coding skills, build projects, and launch your tech career.
            </p>
          </div>
          {/* second section */}
          <div className={styles.linksContainer}>
            <div className={styles.linkSection}>
              <h1 className={styles.sectionTitle}>Courses</h1>
              <ul className={styles.linkList}>
                <li className={styles.linkItem}>Web Development</li>
                <li className={styles.linkItem}>Software Development</li>
                <li className={styles.linkItem}>Apps Development</li>
                <li className={styles.linkItem}>E-learning</li>
              </ul>
            </div>
            <div className={styles.linkSection}>
              <h1 className={styles.sectionTitle}>Links</h1>
              <ul className={styles.linkList}>
                <li className={styles.linkItem}>Home</li>
                <li className={styles.linkItem}>Services</li>
                <li className={styles.linkItem}>About</li>
                <li className={styles.linkItem}>Contact</li>
              </ul>
            </div>
          </div>
          {/* third section */}
          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>Get In Touch</h1>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Enter your email"
                className={styles.input}
              />
              <button className={styles.button}>Go</button>
            </div>
            {/* social icons */}
            <div className={styles.socialIcons}>
              <a href="https://chat.whatsapp.com/FQSKgJ5f1eIAhlyF5sVym0" className={styles.socialLink}>
                <FaWhatsapp />
              </a>
              <a href="https://www.instagram.com/the.coding.journey/" className={styles.socialLink}>
                <FaInstagram />
              </a>
              <a href="https://thecodingjourney.com/" className={styles.socialLink}>
                <TbWorldWww />
              </a>
              <a href="https://www.youtube.com/@TheCodingJourney" className={styles.socialLink}>
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
