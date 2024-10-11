import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import UserService from "../services/loginService";
import styles from "./css/Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    gender: "",
    profession: "",
    password: "",
    email: "",
    mobile: "",
    address: "",
  });

  const [professor, setProfessor] = useState({
    professorname: "",
    email: "",
    gender: "",
    mobile: "",
    password: "",
    institutionname: "",
    department: "",
    experience: "",
    degreecompleted: "",
  });

  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState("user");

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleProfessorChange = (e) => {
    setProfessor({ ...professor, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await UserService.registerUser(user);
      sessionStorage.setItem("username", user.username);
      sessionStorage.setItem("gender", user.gender);
      navigate("/registersuccess");
    } catch (error) {
      setMsg(`User with ${user.email} already exists!`);
    }
  };

  const registerProfessor = async (e) => {
    e.preventDefault();
    try {
      await UserService.registerProfessor(professor);
      sessionStorage.setItem("professorname", professor.professorname);
      sessionStorage.setItem("gender", professor.gender);
      navigate("/registersuccess");
    } catch (error) {
      setMsg(`Professor with ${professor.email} already exists!`);
    }
  };

  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.backLink}>
        <span className={styles.arrow}></span>
        Back to Home
      </NavLink>
      <div className={styles.card}>
        <h4 className={styles.cardTitle}>Sign up</h4>
        <ul className={styles.nav} role="tablist">
          <li className={styles.navItem}>
            <button
              className={activeTab === "user" ? styles.active : ""}
              onClick={() => setActiveTab("user")}
            >
              User
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={activeTab === "professor" ? styles.active : ""}
              onClick={() => setActiveTab("professor")}
            >
              Professor
            </button>
          </li>
        </ul>
        <div className={styles.tabContent}>
          {activeTab === "user" && (
            <div className={styles.tabPane}>
              <small className={styles.errorMessage}>{msg}</small>
              <form onSubmit={registerUser}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="User Name"
                    name="username"
                    value={user.username}
                    onChange={handleUserChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    value={user.gender}
                    onChange={handleUserChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Profession"
                    name="profession"
                    value={user.profession}
                    onChange={handleUserChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={handleUserChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    onChange={handleUserChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Mobile"
                    name="mobile"
                    value={user.mobile}
                    onChange={handleUserChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={user.address}
                    onChange={handleUserChange}
                    required
                  />
                </div>
                <button type="submit" className={styles.button}>
                  SIGN UP
                </button>
              </form>
            </div>
          )}
          {activeTab === "professor" && (
            <div className={styles.tabPane}>
              <small className={styles.errorMessage}>{msg}</small>
              <form onSubmit={registerProfessor}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Professor Name"
                    name="professorname"
                    value={professor.professorname}
                    onChange={handleProfessorChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={professor.email}
                    onChange={handleProfessorChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    value={professor.gender}
                    onChange={handleProfessorChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Mobile"
                    name="mobile"
                    value={professor.mobile}
                    onChange={handleProfessorChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={professor.password}
                    onChange={handleProfessorChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Institution Name"
                    name="institutionname"
                    value={professor.institutionname}
                    onChange={handleProfessorChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Department"
                    name="department"
                    value={professor.department}
                    onChange={handleProfessorChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Experience"
                    name="experience"
                    value={professor.experience}
                    onChange={handleProfessorChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Degree Completed"
                    name="degreecompleted"
                    value={professor.degreecompleted}
                    onChange={handleProfessorChange}
                    required
                  />
                </div>
                <button type="submit" className={styles.button}>
                  SIGN UP
                </button>
              </form>
            </div>
          )}
        </div>
        <p className={styles.loginLink}>
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
