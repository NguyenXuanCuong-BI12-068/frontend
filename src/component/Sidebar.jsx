import React from 'react';
import { useNavigate, useLocation ,Link} from 'react-router-dom';
import styles from './css/Sidebar.module.css';

const Sidebar = ({ role, errorMessage  }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route
  

  const getSidebarContent = () => {
    const currentPath = location.pathname; // Current path of the route

    // Define menu items based on user role
    const menuItems = {
      user: [
        { path: '/userdashboard', label: 'DashBoard', icon: 'fa fa-edit' },
        { path: '/edituserprofile', label: 'Edit Profile', icon: 'fa fa-edit' },
        { path: '/courselist', label: 'Start learning', icon: 'fa fa-list' },
        { path: '/mycourses', label: 'My Courses', icon: 'fa fa-list' },
        { path: '/mywishlist', label: 'My Wishlist', icon: 'fa fa-list' },
      ],
      professor: [
        { path: '/professordashboard', label: 'DashBoard', icon: 'fa fa-edit' },
        { path: '/editprofessorprofile', label: 'Edit Profile', icon: 'fa fa-edit' },
        { path: '/approveprofessor', label: 'Approval Status', icon: 'fa fa-check-square' },
        { path: '/addCourse', label: 'Add Course', icon: 'fa fa-cart-plus' },
        { path: '/addchapter', label: 'Add Chapters', icon: 'fa fa-book' },
        { path: '/mycourses', label: 'My Courses', icon: 'fa fa-graduation-cap' },
        { path: '/mywishlist', label: 'My Wishlist', icon: 'fa fa-heart' },
        { path: '/courselist', label: 'Course List', icon: 'fa fa-list' },
      ],
      admin: [
        { path: '/admindashboard', label: 'DashBoard', icon: 'fa fa-plus' },
        { path: '/addProfessor', label: 'Add Professor', icon: 'fa fa-plus' },
        { path: '/approveprofessor', label: 'Approve Professor', icon: 'fa fa-check-square' },
        { path: '/courselist', label: 'Course List', icon: 'fa fa-list' },
        { path: '/mycourses', label: 'My Courses', icon: 'fa fa-graduation-cap' },
        { path: '/mywishlist', label: 'Wishlist', icon: 'fa fa-heart' },
        { path: '/professorlist', label: 'Professors', icon: 'fa fa-user-o' },
        { path: '/userlist', label: 'Users', icon: 'fa fa-user' },
      ],
    };

    // Map through menu items based on the role
    return menuItems[role]?.map((item) => (
      <li key={item.path} className={currentPath === item.path ? styles.active : ''}>
        <a onClick={() => navigate(item.path)}>
          <i className={item.icon}></i> <span className={styles.linksName}>{item.label}</span>
        </a>
      </li>
    ));
  };


    return (
      <>
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        <div className={styles.sidebar}>
          <div className={styles.logoDetails}>
            <i className='fa fa-bars'></i>
            <span className={styles.logoName}>
              {role === 'admin' ? 'Admin Dashboard' : role === 'professor' ? 'Professor Dashboard' : 'User Dashboard'}
            </span>
            <i className='fa' id={styles.btn}></i>
          </div>
          <ul className={styles.navList}>
            {getSidebarContent()}
          </ul>
        </div>
      </>
    );

};

export default Sidebar;
