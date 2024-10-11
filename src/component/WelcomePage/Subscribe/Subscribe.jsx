import React from "react";
import { FaBell } from "react-icons/fa";
import BgImage from "../../../assets/images/welcome/bg.png";
import { motion } from "framer-motion";
import styles from './Subscribe.module.css';

const Subscribe = () => {
  return (
    <section className={styles.subscribe}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={styles.bgContainer}
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={styles.contentWrapper}
        >
          <div className={styles.content}>
            <h1 className={styles.title}>
              450K+ Students are learning from us
            </h1>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae iusto minima
            </p>
            <a href="" className={styles.subscribeBtn}>
              Study Now
              <FaBell className={styles.bellIcon} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Subscribe;
