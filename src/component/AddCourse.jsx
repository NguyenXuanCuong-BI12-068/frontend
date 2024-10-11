import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import professorservice from '../services/professorService';
import styles from './css/AddCourse.module.css';
import Header from './Header';
import Sidebar from './Sidebar';

const AddCourse = () => {
  const [course, setCourse] = useState({
    coursename: '',
    instructorname: '',
    youtubeurl: '',
    coursetype: '',
    language: '',
    enrolleddate: '',
    instructorinstitution: '',
    websiteurl: '',
    skilllevel: '',
    description: '',
  });
  
  const [professorName, setProfessorName] = useState('');
  const [msg, setMsg] = useState('');
  const [showLinks, setShowLinks] = useState({ website: false, youtube: false });
  const navigate = useNavigate();
  const loggedUser = sessionStorage.getItem('loggedUser') || '{}';

  useEffect(() => {
    const loggedUser = sessionStorage.getItem('loggedUser') || '{}';
    console.log("Logged User:", loggedUser);

    professorservice.getProfileDetails(loggedUser)
      .then(response => {
        const userName = response;
        const name = userName[0].professorname;
        console.log("Professor Name:", name);
        setProfessorName(name);
        setCourse(prevCourse => ({
          ...prevCourse,
          instructorname: name
        }));
      })
      .catch(error => {
        console.error("Error fetching professor details:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCourseTypeChange = (e) => {
    const { value } = e.target;
    setCourse((prev) => ({
      ...prev,
      coursetype: value,
      youtubeurl: '',
      websiteurl: '',
    }));
    setShowLinks({
      website: value === 'Website',
      youtube: value === 'Youtube',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const courseData = {
      ...course,
      websiteurl: showLinks.website ? course.websiteurl : '',
      youtubeurl: showLinks.youtube ? course.youtubeurl : '',
    };
  
    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (courseData.youtubeurl && !youtubeRegex.test(courseData.youtubeurl)) {
      setMsg("Please enter a valid YouTube URL");
      return;
    }
  
    // Validate Website URL
    const websiteRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (courseData.websiteurl && !websiteRegex.test(courseData.websiteurl)) {
      setMsg("Please enter a valid website URL");
      return;
    }
  
    try {
      await professorservice.addNewCourse(courseData);
      console.log('Course added successfully!');
  
      if (courseData.websiteurl) {
        navigate('/professordashboard');
      } else if (courseData.youtubeurl) {
        navigate('/addchapter');
      } else {
        navigate('/professordashboard');
      }
    } catch (error) {
      console.log('Process failed');
      console.error('Error:', error.response ? error.response.data : error.message);
      setMsg(`Course with ${course.coursename} already exists!`);
    }
  };

  return (
    <>

    <Header/>
    <Sidebar
            role="professor"
            loggedUser={loggedUser}

    />
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h3 className={styles.registerHeading}><i className="fa fa-sticky-note-o"></i> New Course</h3>
        <small className={styles.textdanger}><b>{msg}</b></small>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formColumn}>
              <div className={styles.formGroup}>
                <label>Course Name: <b style={{ color: 'red' }}>*</b></label>
                <input
                  type="text"
                  className={styles.formControl}
                  placeholder="Enter course name"
                  name="coursename"
                  value={course.coursename}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Instructor Name: <b style={{ color: 'red' }}>*</b></label>
                <input
                  type="text"
                  className={styles.formControl}
                  placeholder="Enter instructor name"
                  name="instructorname"
                  value={course.instructorname}
                  onChange={handleChange}
                  disabled
                  required
                />
              </div>
              {showLinks.youtube && (
                <div className={styles.formGroup}>
                  <label>Course Video: <b style={{ color: 'red' }}>*</b></label>
                  <input
                    type="url"
                    className={styles.formControl}
                    name="youtubeurl"
                    value={course.youtubeurl}
                    onChange={handleChange}
                    required
                  />
                  
                </div>
              )}
              <div className={styles.formGroup}>
                <label>Course Type: <b style={{ color: 'red' }}>*</b></label>
                <select
                  className={styles.formControl}
                  name="coursetype"
                  value={course.coursetype}
                  onChange={(e) => {
                    handleChange(e);
                    handleCourseTypeChange(e);
                  }}
                  required
                >
                  <option></option>
                  <option value="Website">Website</option>
                  <option value="Youtube">YouTube</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Course Language: <b style={{ color: 'red' }}>*</b></label>
                <select
                  className={styles.formControl}
                  name="language"
                  value={course.language}
                  onChange={handleChange}
                  required
                >
                  <option></option>
                  <option>English</option>
                </select>
              </div>
            </div>
            <div className={styles.formColumn}>
              <div className={styles.formGroup}>
                <label>Enrolled Date: <b style={{ color: 'red' }}>*</b></label>
                <input
                  type="date"
                  className={styles.formControl}
                  name="enrolleddate"
                  value={course.enrolleddate}
                  onChange={handleChange}
                  required
                />
                
              </div>
              <div className={styles.formGroup}>
                <label>Instructor Institution Name: <b style={{ color: 'red' }}>*</b></label>
                <input
                  type="text"
                  className={styles.formControl}
                  placeholder="Enter instructor institution name"
                  name="instructorinstitution"
                  value={course.instructorinstitution}
                  onChange={handleChange}
                  required
                />
              
              </div>
              {showLinks.website && (
                <div className={styles.formGroup}>
                  <label>Course Website URL: <b style={{ color: 'red' }}>*</b></label>
                  <input
                    type="url"
                    className={styles.formControl}
                    placeholder="Please mention website URL"
                    name="websiteurl"
                    value={course.websiteurl}
                    onChange={handleChange}
                    required
                  />
                  
                </div>
              )}
              <div className={styles.formGroup}>
                <label>Skill Level: <b style={{ color: 'red' }}>*</b></label>
                <select
                  className={styles.formControl}
                  name="skilllevel"
                  value={course.skilllevel}
                  onChange={handleChange}
                  required
                >
                  <option></option>
                  <option>Basic</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Course Description: <b style={{ color: 'red' }}>*</b></label>
                <textarea
                  rows="4"
                  className={styles.formControl}
                  placeholder="Enter course description here"
                  name="description"
                  value={course.description}
                  onChange={handleChange}
                  required
                />
                
              </div>
            </div>
          </div>
          <button type="submit" className={styles.btnRegister} disabled={!course.coursename || !course.instructorname || !course.enrolleddate || !course.instructorinstitution || !course.description}>
                  <i className="fa fa-plus"></i> Add Course
          </button>
        </form>
      </div>
    </div>
    </>
  );
};
export default AddCourse;
