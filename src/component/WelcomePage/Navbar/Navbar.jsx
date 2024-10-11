import React from "react";
import {NavLink} from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import styles from './Navbar.module.css';

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Services", link: "#" },
  { id: 3, title: "About Us", link: "#" },
  { id: 4, title: "Our Team", link: "#" },
  { id: 5, title: "Contact Us", link: "#" },
];

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.container}
      >
        {/* Logo section */}
        <div className={styles.logo}>
          <h1>Smart and Dynamic Elearning</h1>
        </div>
        {/* Menu section */}
        <div className={styles.menuDesktop}>
          <ul className={styles.menuList}>
            {NavbarMenu.map((menu) => (
              <li key={menu.id} className={styles.menuItem}>
                <a href={menu.path} className={styles.menuLink}>
                  <div className={styles.menuDot}></div>
                  {menu.title}
                </a>
              </li>
            ))}
            <NavLink to="/login">
            <button className={styles.signInBtn}>Sign In</button>
            </NavLink>
          </ul>
        </div>
        {/* Mobile Hamburger menu section */}
        <div className={styles.menuMobile}>
          <IoMdMenu className={styles.hamburgerIcon} />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
