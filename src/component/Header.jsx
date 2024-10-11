import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Header.module.css';

const Header = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [currRole, setCurrRole] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('loggedUser') || '{}';
    const role = sessionStorage.getItem('ROLE') || '{}';
    

    setLoggedUser(user.replace(/"/g, ''));
    setCurrRole(role.replace(/"/g, '') === 'user' ? 'student' : role.replace(/"/g, ''));

    if (role === "admin") {
      setTitle("Admin Dashboard");
    } else if (role === "professor") {
      setTitle("Professor Dashboard");
    } else if (role === "user") {
      setTitle("Student Dashboard");
    }
  }, []);

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const navigateHome = () => {
    if (currRole === "admin") {
      navigate('/admindashboard');
    } else if (currRole === "professor") {
      navigate('/professordashboard');
    } else if (currRole === "student") {
      navigate('/userdashboard');
    }
  };

  return (
    <div className={styles.sidebarLogo}>
      <button className={styles.logoutBtn} onClick={navigateHome}>
        <i className="fa fa-home"></i> Home
      </button>
      <b className={styles.sidebarText}>
        <i className="fa fa-user"></i>{loggedUser} ({currRole})
      </b>
      <button className={styles.logoutBtn} onClick={logout}>
        <i className="fa fa-sign-out"></i> Logout
      </button>
    </div>
  );
};

export default Header;
