import React, { useState, useEffect } from 'react';
import styles from './css/ManageProfessorCourses.module.css';
import professorService from '../services/professorService';
import Sidebar from './Sidebar';
import Header from './Header';


const ManageProfessorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const [currRole, setCurrRole] = useState('');
  const [loggedUser, setLoggedUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem('loggedUser') || '';
    setLoggedUser(user);
    const role = sessionStorage.getItem('ROLE') || '';
    setCurrRole(role);
    fetchCourses(user);
  }, []);

  const fetchCourses = async (user) => {
    try {
      setIsLoading(true);
      const response = await professorService.listCoursesByProfessor(user);
      console.log('Fetched courses:', response);
      setCourses(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setUpdatedCourse({ ...course });
  };

  const handleInputChange = (e) => {
    setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await professorService.editCourse(loggedUser, editingCourse.coursename, updatedCourse);
      setEditingCourse(null);
      fetchCourses(loggedUser);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };
  

  return (
    <>
      <Header />
      <Sidebar role={currRole} loggedUser={loggedUser} />
      <div className={styles.container}>
        <h2 className={styles.title}>Manage Professor Courses</h2>
        {isLoading ? (
            <p>Loading courses...</p>
        ) : Array.isArray(courses) && courses.length > 0 ? (
            courses.map((courseInfo) => (
            <div key={courseInfo.course.id} className={styles.courseCard}>
                <h3 className={styles.courseHeader}>{courseInfo.course.coursename}</h3>
                <p>Course ID: {courseInfo.course.courseid}</p>
                <p>Instructor: {courseInfo.course.instructorname}</p>
                <p>Enrolled Students: {courseInfo.enrollments.length}</p>
                {courseInfo.enrollments.length > 0 && (
                <div>
                    <h4>Enrolled Students:</h4>
                    <ul>
                    {courseInfo.enrollments.map((enrollment) => (
                        <li key={enrollment.id}>{enrollment.enrolledusername}</li>
                    ))}
                    </ul>
                </div>
                )}
                <button onClick={() => handleEdit(courseInfo.course)} className={styles.editButton}>
                Edit Course
                </button>
                {editingCourse && editingCourse.id === courseInfo.course.id && (
                <form onSubmit={handleSubmit} className={styles.editForm}>
                    <input
                    type="text"
                    name="coursename"
                    value={updatedCourse.coursename}
                    onChange={handleInputChange}
                    className={styles.input}
                    />
                    <input
                    type="text"
                    name="description"
                    value={updatedCourse.description}
                    onChange={handleInputChange}
                    className={styles.input}
                    />
                    <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitButton}>
                        Update Course
                    </button>
                    <button type="button" onClick={() => setEditingCourse(null)} className={styles.closeButton}>
                        Close
                    </button>
                    </div>
                </form>
                )}
            </div>
            ))
        ) : (
            <p>No courses available.</p>
        )}
        </div>

    </>
  );
};

export default ManageProfessorCourses;
