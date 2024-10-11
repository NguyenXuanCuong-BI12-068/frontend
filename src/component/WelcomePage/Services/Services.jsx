import React from "react";
import { RiComputerLine } from "react-icons/ri";
import { CiMobile3 } from "react-icons/ci";
import { TbWorldWww } from "react-icons/tb";
import { IoMdHappy } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import styles from './Services.module.css';

const ServicesData = [
  { id: 1, title: "Web Development", link: "#", icon: <TbWorldWww />, delay: 0.2 },
  { id: 2, title: "Mobile development", link: "#", icon: <CiMobile3 />, delay: 0.3 },
  { id: 3, title: "Software development", link: "#", icon: <RiComputerLine />, delay: 0.4 },
  { id: 4, title: "Satisfied clients", link: "#", icon: <IoMdHappy />, delay: 0.5 },
  { id: 5, title: "SEO optimization", link: "#", icon: <IoPulseOutline />, delay: 0.6 },
  { id: 6, title: "24/7 support", link: "#", icon: <BiSupport />, delay: 0.7 },
];

const SlideLeft = (delay) => ({
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: delay, ease: "easeInOut" },
  },
});

const Services = () => {
  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <h1 className={styles.title}>Services we provide</h1>
        <div className={styles.grid}>
          {ServicesData.map((service) => (
            <motion.div
              key={service.id}
              variants={SlideLeft(service.delay)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className={styles.serviceItem}
            >
              <div className={styles.icon}>{service.icon}</div>
              <h1 className={styles.serviceTitle}>{service.title}</h1>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
