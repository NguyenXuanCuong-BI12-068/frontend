import React from "react";
import Navbar from "../Navbar/Navbar";
import { IoIosArrowRoundForward } from "react-icons/io";
import Blob from "../../../assets/images/welcome/blob.svg";
import HeroPng from "../../../assets/images/lms-bg.png";
import { motion } from "framer-motion";
import styles from './Hero.module.css';

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Navbar />
      <div className={styles.container}>
        {/* Brand Info */}
        <div className={styles.brandInfo}>
          <div className={styles.textContent}>
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className={styles.title}
            >
              Let's Start to find your best {" "}
              <span className={styles.highlight}>Courses</span> for your study
            </motion.h1>
            <motion.div
              variants={FadeUp(0.8)}
              initial="initial"
              animate="animate"
              className={styles.buttonWrapper}
            >
              <button className={styles.primaryBtn}>
                Get Started
                <IoIosArrowRoundForward className={styles.arrowIcon} />
              </button>
            </motion.div>
          </div>
        </div>
        {/* Hero Image */}
        <div className={styles.imageWrapper}>
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src={HeroPng}
            alt=""
            className={styles.heroImage}
          />
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            src={Blob}
            alt=""
            className={styles.blobImage}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
