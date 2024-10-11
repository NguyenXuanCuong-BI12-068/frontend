import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import userservice from '../services/userService';
import styles from './css/MyWishlist.module.css';
import Header from './Header';
import Sidebar from './Sidebar';

const MyWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loggedUser, setLoggedUser] = useState('');
  const [currRole, setCurrRole] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('loggedUser') || '{}';
    const role = sessionStorage.getItem('ROLE') || '{}';
    const parsedUser = user.replace(/"/g, '');
    const parsedRole = role.replace(/"/g, '');

    setLoggedUser(parsedUser);
    setCurrRole(parsedRole);

    const fetchEnrolledCourses = async () => {
      if (parsedUser && parsedRole) {
        const enrollments = await userservice.getEnrollmentsByEmail(parsedUser, parsedRole);
        setEnrolledCourses(enrollments.map(enrollment => enrollment.courseid));
      }
    };
    const fetchWishlist = async () => {
      let response;
      if (parsedUser && parsedRole) {
        console.log("Fetching wishlist for:", parsedUser);
        if (parsedRole === 'admin') {
          response = await userservice.getAllWishlist();
        } else {
          response = await userservice.getWishlistByEmail(parsedUser);
        }
        if (response) {
          setWishlist(response);
        }
      }
    };

    if (parsedUser) {
      fetchWishlist();
      fetchEnrolledCourses();
    }
  }, []);
  const isEnrolled = (courseId) => enrolledCourses.includes(courseId);

  const visitCourse = (coursename) => {
    navigate(`/fullcourse/${coursename}`);
  };

  const openURL = (url) => {
    window.open(url, "_blank");
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <Header />
      <div>
        <Sidebar
          role={currRole}
          loggedUser={loggedUser}
        />
        <div className={styles.headingText}>
          <b><i className="fa fa-heart" style={{ color: 'darkred' }}></i> My Wishlist</b>
        </div>
        <div className={styles.courseCardContainer}>
          <Slider {...sliderSettings}>
            {wishlist.map((course) => (
              <div key={course.courseid} className={styles.card}>
                <div className={styles.cardBody}>
                  <h4 className={styles.cardTitle}>{course.coursename}</h4>
                  <h6 className={styles.courseId}>{course.courseid}</h6>
                  <div><b>Instructor: </b><span>{course.instructorname}</span></div>
                  <div><b>Learners: </b><span>{course.enrolledcount} enrolled already</span></div>
                  <div><b>Type: </b><span>{course.coursetype} Tutorials</span></div>
                  <div><b>Level: </b><span>{course.skilllevel}</span></div>
                  <div><b>Language: </b><span>{course.language}</span></div>
                  <button
                    onClick={() => course.coursetype === 'Youtube' ? visitCourse(course.coursename) : openURL(course.websiteurl)}
                    className={`${styles.visitButton} ${!isEnrolled(course.courseid) ? styles.disabledButton : ''}`}
                    disabled={!isEnrolled(course.courseid)}
                  >
                    {isEnrolled(course.courseid) ? 'Visit Course' : 'Not Enrolled'}
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default MyWishlist;
