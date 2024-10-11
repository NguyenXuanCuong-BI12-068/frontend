import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./css/AddChapter.module.css";
import professorservice from '../services/professorService';
import Header from './Header';
import Sidebar from './Sidebar';

const AddChapter = () => {
  const [chapters, setChapters] = useState([{ name: '', url: '' }]);
  const [courseNames, setCourseNames] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [existingChapters, setExistingChapters] = useState([]);
  const [nextChapterIndex, setNextChapterIndex] = useState(1);
  const navigate = useNavigate();
  const loggedUser = sessionStorage.getItem('loggedUser') || '{}';

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await professorservice.getCourseNames();
      setCourseNames(courses);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchExistingChapters = async () => {
      if (selectedCourse) {
        const chaptersData = await professorservice.getChaptersByCourseName(selectedCourse);
        setExistingChapters(chaptersData[0]);
        determineNextChapterIndex(chaptersData[0]);
      } else {
        setExistingChapters([]);
        setNextChapterIndex(1);
      }
    };
    fetchExistingChapters();
  }, [selectedCourse]);

  const determineNextChapterIndex = (chaptersData) => {
    let nextIndex = 1;
    while (chaptersData[`chapter${nextIndex}id`]) {
      nextIndex++;
    }
    setNextChapterIndex(nextIndex);
  };

  const handleAddChapter = () => {
    setChapters([...chapters, { name: '', url: '' }]);
  };

  const handleRemoveChapter = (index) => {
    const newChapters = chapters.filter((_, i) => i !== index);
    setChapters(newChapters);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newChapters = [...chapters];
    newChapters[index][name] = value;
    setChapters(newChapters);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const chapterData = {
      coursename: selectedCourse,
    };
  
    chapters.forEach((chapter, index) => {
      const chapterIndex = nextChapterIndex + index; // Start from the next available index
      chapterData[`chapter${chapterIndex}name`] = chapter.name;
      chapterData[`chapter${chapterIndex}id`] = chapter.url;
    });
  
    try {
      await professorservice.addNewChapters(chapterData);
      console.log('Chapter added successfully!');
      navigate('/professordashboard');
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  return (
    <>
    <Header />
    <Sidebar
            role='professor'
            loggedUser={loggedUser}

    />
    <div className={styles.container}>
      <h2 className={styles.textual}><i className="fa fa-book"></i> New Chapters</h2>
      <small style={{ color: 'darkgreen', display: 'block', marginBottom: '15px', fontWeight: 'bold' }}>
        On adding new chapters, your course will appear more meaningful to learn
      </small>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="coursename">Course Name: <b className={styles.textDanger}>*</b></label>
          <select
            className={styles.formControl}
            id="sel1"
            name="coursename"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="" disabled>Select course name</option>
            {courseNames.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
          <small style={{ color: 'gray', display: 'block', marginTop: '5px', fontWeight: 'bold' }}>
            Please choose course name from the drop-down
          </small>
        </div>

        {chapters.map((chapter, index) => (
          <div key={index}>
            <div className={styles.formGroup}>
              <label htmlFor={`chapter${nextChapterIndex + index}name`}>Chapter-{nextChapterIndex + index} Name: <b className={styles.textDanger}>*</b></label>
              <input
                type="text"
                className={styles.formControl}
                placeholder={`Enter chapter-${nextChapterIndex + index} name`}
                name="name"
                value={chapter.name}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={`chapter${nextChapterIndex + index}id`}>Chapter-{nextChapterIndex + index} URL: <b className={styles.textDanger}>*</b></label>
              <input
                type="text"
                className={styles.formControl}
                placeholder={`Enter chapter-${nextChapterIndex + index} URL as ID`}
                name="url"
                value={chapter.url}
                onChange={(e) => handleChange(index, e)}
              />
              <small style={{ color: 'gray', display: 'block', marginTop: '5px', fontWeight: 'bold' }}>
                Please provide the Chapter-{nextChapterIndex + index} video ID as the URL here...
              </small>
            </div>
            {index > 0 && (
              <button
                type="button"
                className={`${styles.btn} ${styles.btnDanger}`}
                onClick={() => handleRemoveChapter(index)}
              >
                <i className="fa fa-trash"></i> Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className={`${styles.btn} ${styles.btnSuccess}`}
          onClick={handleAddChapter}
        >
          <i className="fa fa-plus"></i> Add
        </button>

        <div className="checkbox" style={{ marginTop: '5px' }}>
          <small style={{ fontWeight: '700', color: 'darkred' }}>
            <input type="checkbox" name="remember" required /> Whether these chapters have valid contents related to the course
          </small>
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnRegister}`} disabled={!selectedCourse || chapters.some(chapter => !chapter.name || !chapter.url)}>
          <i className="fa fa-plus"></i> Add Chapter
        </button>
      </form>
    </div>
    </>
  );
};

export default AddChapter;
