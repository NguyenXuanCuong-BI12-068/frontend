import React from "react";
import BannerPng from '../../../assets/images/welcome/education.png';
import { GrUserExpert } from "react-icons/gr";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { FadeUp } from "../Hero/Hero";
import { motion } from "framer-motion";
import styles from './Banner.module.css';

const Banner = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Banner Image */}
        <div className={styles.imageContainer}>
          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            src={BannerPng}
            alt=""
            className={styles.bannerImage}
          />
        </div>
        {/* Banner Text */}
        <div className={styles.textContainer}>
          <div className={styles.textContent}>
            <motion.h1
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={styles.title}
            >
              The World's Leading Online learning Platform
            </motion.h1>
            <div className={styles.featureList}>
              <motion.div
                variants={FadeUp(0.2)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className={styles.featureItem}
              >
                <FaBookReader className={styles.featureIcon} />
                <p className={styles.featureText}>User Friendly Learning Portal</p>
              </motion.div>
              <motion.div
                variants={FadeUp(0.4)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className={styles.featureItem}
              >
                <GrUserExpert className={styles.featureIcon} />
                <p className={styles.featureText}>Specific Learning Contents</p>
              </motion.div>
              <motion.div
                variants={FadeUp(0.6)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className={styles.featureItem}
              >
                <MdOutlineAccessTime className={styles.featureIcon} />
                <p className={styles.featureText}>Plug-In Play Embedded video lectures</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
