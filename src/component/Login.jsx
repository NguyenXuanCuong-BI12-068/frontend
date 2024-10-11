import React, { useState } from 'react';
import { useNavigate ,NavLink} from 'react-router-dom';
import UserService from '../services/loginService';
import styles from './css/Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const adminLogin = (email, password) => {
    if (email === 'admin@gmail.com' && password === 'admin') {
      sessionStorage.setItem('loggedUser', email);
      sessionStorage.setItem('USER', 'admin');
      sessionStorage.setItem('ROLE', 'admin');
      sessionStorage.setItem('name', 'Admin');
      sessionStorage.setItem('gender', 'male');
      navigate('/admindashboard');
    } else {
      setMsg('Bad admin credentials!');
    }
  };

  const handleLogin = async (email, password, role) => {
    try {
      if (role === 'admin') {
        adminLogin(email, password);
      } else if (role === 'user') {
        const userData = await UserService.loginUser(email, password);
        if (userData) {
          sessionStorage.setItem('loggedUser', userData.email);
          sessionStorage.setItem('USER', 'user');
          sessionStorage.setItem('ROLE', 'user');
          sessionStorage.setItem('name', userData.name);
          sessionStorage.setItem('gender', userData.gender);
          navigate('/userdashboard');
        }
      } else if (role === 'professor') {
        const professorData = await UserService.loginProfessor(email, password);
        if (professorData) {
          sessionStorage.setItem('loggedUser', professorData.email);
          sessionStorage.setItem('USER', 'professor');
          sessionStorage.setItem('ROLE', 'professor');
          sessionStorage.setItem('name', professorData.name);
          sessionStorage.setItem('gender', professorData.gender);
          navigate('/professordashboard');
        }
      }
    } catch (error) {
      setMsg('Login failed. Please check your credentials.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, role } = formData;
    handleLogin(email, password, role);
  };


  return (
    <>
    
    <div className={styles.container}>
      <NavLink to="/" className={styles.backLink}>
        <span className={styles.arrow}></span>
        Back to Home
      </NavLink>

      <div className={styles.card}>
        <h4 className={styles.cardTitle}>Sign in</h4>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {msg && <p className={styles.errorMessage}>{msg}</p>}
          <div className={styles.inputGroup}>
            <input
              className={styles.inputField}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              className={styles.inputField}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <select
              className={styles.selectField}
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">Student</option>
              <option value="professor">Professor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className={styles.button} type="submit">SIGN IN</button>
        </form>
        <p className={styles.registerLink}>
          Don't have an account? <NavLink to="/register">Sign up</NavLink>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;
