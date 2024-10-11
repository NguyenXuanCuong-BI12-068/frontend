import React from "react";
import BannerPng from "../../../assets/images/welcome/banner.png";
import { motion } from "framer-motion";
import styles from './Banner2.module.css';

const Banner2 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Banner Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className={styles.textContainer}
        >
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              Join Our Community to Start your Journey
            </h1>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae iusto minima ad ut id eos accusantium aut, aperiam quis
              incidunt!
            </p>
            <a
              href="#"
              className={styles.primaryBtn}
            >
              Join Now
            </a>
          </div>
        </motion.div>
        {/* Banner Image */}
        <div className={styles.imageContainer}>
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src={BannerPng}
            alt=""
            className={styles.bannerImage}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner2;
