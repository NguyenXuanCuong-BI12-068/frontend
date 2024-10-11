import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import Sidebar from './Sidebar';
import styles from './css/UserDashboard.module.css';
import Header from './Header';
import DashboardCard from './DashboardCard';
import coursesIcon from '../assets/images/education-apps.png';
import learnersIcon from '../assets/images/self-learning.png';
import chaptersIcon from '../assets/images/chapter.png';
import favoriteIcon from '../assets/images/like.png';
import ImageUrl from '../assets/images/Our-courese.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import userservice from '../services/userService';

const UserDashboard = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [currRole, setCurrRole] = useState('');
  const [courses, setCourses] = useState(0); 
  const [enrollmentCount, setEnrollmentCount] = useState(0); 
  const [wishlist, setWishlist] = useState(0); 
  const [chapters, setChapters] = useState(0); 
  const [myEnrollments, setMyEnrollments] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedUser(sessionStorage.getItem('loggedUser') || '');
    setCurrRole(sessionStorage.getItem('ROLE') || '');

    const fetchData = async () => {
      try {
        const coursesResponse = await adminService.getTotalCourses();
        const enrollmentsResponse = await adminService.getTotalEnrollments();
        const wishlistResponse = await adminService.getTotalWishlist();
        const chaptersResponse = await adminService.getTotalChapters();
  
        console.log('Courses Response:', coursesResponse);
        console.log('Enrollments Response:', enrollmentsResponse);
        console.log('Wishlist Response:', wishlistResponse);
        console.log('Chapters Response:', chaptersResponse);
  
        setCourses(coursesResponse.data[0] || 0); 
        setEnrollmentCount(enrollmentsResponse.data[0] || 0); 
        setWishlist(wishlistResponse.data[0] || 0); 
        setChapters(chaptersResponse.data[0] || 0); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    const fetchEnrollments = async () => {
      const enrollments = await userservice.getEnrollmentsByEmail(loggedUser, currRole);
      setMyEnrollments(enrollments);
    };
    fetchData();
    fetchEnrollments();
  }, [loggedUser, currRole,refreshTrigger]);
  


  const refreshEnrollments = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshEnrollments();
    }, 500);
  
    return () => clearInterval(intervalId);
  }, []);

  const CoursesIcon = () => (
    <img
      src={coursesIcon}
      alt="Courses icon"
      title="Courses icons"
      className={styles.customIcon}
    />
  );
  const LearnerIcon = () => (
    <img
      src={learnersIcon}
      alt="Learner icon"
      title="Learner icons"
      className={styles.customIcon}
    />
  );
  const ChapterIcon = () => (
    <img
      src={chaptersIcon}
      alt="Chapter icon"
      title="Chapter icons"
      className={styles.customIcon}
    />
  );
  const FavoriteIcon = () => (
    <img
      src={favoriteIcon}
      alt="Favorite icon"
      title="Favorite icons"
      className={styles.customIcon}
    />
  );

  const visitCourse = (courseName) => {
    navigate(`/fullcourse/${courseName}`);
  };

  const slidesToShow = myEnrollments.length >= 3 ? 3 : myEnrollments.length;

  const sliderSettings = {
    dots: myEnrollments.length >= 3,
    infinite: myEnrollments.length >= 3,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: myEnrollments.length >= 3,
    autoplaySpeed: 2000,
    arrows: myEnrollments.length >= 3,
    draggable: myEnrollments.length >= 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(slidesToShow, 2),
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
      <div className={styles.dashboardContainer}>
        <Sidebar role={currRole} />
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <h1>Welcome to Student Dashboard 👋</h1>
          </div>
          <div className={styles.cardContainer}>
            <DashboardCard
              iconComponent={<CoursesIcon />}
              title="Courses"
              count={courses}
              percentage={{ color: "success", amount: "+5%", label: "than last month" }}
            />
            <DashboardCard
              iconComponent={<LearnerIcon />}
              title="Learners"
              count={enrollmentCount}
              percentage={{ color: "success", amount: "+3%", label: "than last week" }}
            />
            <DashboardCard
              iconComponent={<ChapterIcon />}
              title="Chapters"
              count={chapters}
              percentage={{ color: "success", amount: "+1%", label: "than yesterday" }}
            />
            <DashboardCard
              iconComponent={<FavoriteIcon />}
              title="Favourites"
              count={wishlist}
              percentage={{ color: "error", amount: "-2%", label: "than yesterday" }}
            />
          </div>
          <div className={styles.headingText}>
            <b><i className="fa fa-graduation-cap"></i> Your Courses</b>
          </div>
          <div className={styles.courseCardContainer}>
            {myEnrollments.length > 0 && (
              myEnrollments.length <= 2 ? (
                <div className={styles.staticCourses}>
                  {myEnrollments.map(data => (
                    <div className={styles.card} key={data.courseid}>
                      <img src={ImageUrl} className={styles.courseImage} />
                      <hr />
                      <div className={styles.cardBody}>
                        <h4 className={styles.cardTitle}>{data.coursename}</h4>
                        <h6 className={styles.courseId}>{data.courseid}</h6>
                        <p><b>{data.description}</b></p>
                        <button onClick={() => visitCourse(data.coursename)} className={styles.visitButton}>
                          Visit Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Slider {...sliderSettings} afterChange={refreshEnrollments}>
                  {myEnrollments.map(data => (
                    <div className={styles.card} key={data.courseid}>
                      <img src={ImageUrl} className={styles.courseImage} />
                      <hr />
                      <div className={styles.cardBody}>
                        <h4 className={styles.cardTitle}>{data.coursename}</h4>
                        <h6 className={styles.courseId}>{data.courseid}</h6>
                        <p><b>{data.description}</b></p>
                        <button onClick={() => visitCourse(data.coursename)} className={styles.visitButton}>
                          Visit Course
                        </button>
                      </div>
                    </div>
                  ))}
                </Slider>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};export default UserDashboard;
