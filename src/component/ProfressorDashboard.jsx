import React, { useEffect, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import professorservice from '../services/professorService';
import userservice from '../services/userService';
import adminService from '../services/adminService'
import Sidebar from './Sidebar';
import styles from './css/ProfessorDashboard.module.css';
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
import LimitedDashboard from './LimitedDashboard';
import LimitedSidebar from './LimitedSidebar';

const ProfessorDashboard = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [currRole, setCurrRole] = useState('');
  const [courses, setCourses] = useState(0);
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [wishlist, setWishlist] = useState(0);
  const [chapters, setChapters] = useState(0);
  const [myCourses, setMyCourses] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [professorStatus, setProfessorStatus] = useState('');
  const [newReleaseCourses, setNewReleaseCourses] = useState([]);
  

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

        setCourses(coursesResponse.data[0] || 0);
        setEnrollmentCount(enrollmentsResponse.data[0] || 0);
        setWishlist(wishlistResponse.data[0] || 0);
        setChapters(chaptersResponse.data[0] || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchNewReleaseCourses = async () => {
      try {
        const response = await professorservice.getCoursesUploadedToday();
        console.log("New release courses:", response);
        setNewReleaseCourses(response);
      } catch (error) {
        console.error('Error fetching new release courses:', error);
      }
    };
    

    const fetchCourses = async () => {
      try {
        const courses = await userservice.getEnrollmentsByEmail(loggedUser, currRole);
        setMyCourses(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setMyCourses([]);
      }
    };

    const fetchProfessorStatus = async () => {
      try {
        const professorData = await professorservice.getProfessorListByEmail(loggedUser);
        console.log("Data", professorData)
        if (professorData.length > 0) {
          setProfessorStatus(professorData[0].status);
        }
      } catch (error) {
        console.error('Error fetching professor status:', error);
      }
    };

    fetchData();
    if (loggedUser && currRole) {
      fetchCourses();
    }
    fetchProfessorStatus();
    fetchNewReleaseCourses();
  }, [loggedUser, currRole, refreshTrigger]);

  const refreshCourses = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    if (professorStatus === 'reject') {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [professorStatus, navigate]);

  const CoursesIcon = () => (
    <img src={coursesIcon} alt="Courses icon" title="Courses icons" className={styles.customIcon} />
  );
  const LearnerIcon = () => (
    <img src={learnersIcon} alt="Learner icon" title="Learner icons" className={styles.customIcon} />
  );
  const ChapterIcon = () => (
    <img src={chaptersIcon} alt="Chapter icon" title="Chapter icons" className={styles.customIcon} />
  );
  const FavoriteIcon = () => (
    <img src={favoriteIcon} alt="Favorite icon" title="Favorite icons" className={styles.customIcon} />
  );

  const visitCourse = (courseName) => {
    navigate(`/fullcourse/${courseName}`);
  };

  const slidesToShow = myCourses.length >= 3 ? 3 : myCourses.length;

  const sliderSettings = {
    dots: myCourses.length >= 3,
    infinite: myCourses.length >= 3,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: myCourses.length >= 3,
    autoplaySpeed: 2000,
    arrows: myCourses.length >= 3,
    draggable: myCourses.length >= 3,
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


  if (professorStatus === 'reject') {
    return (
      <>
        <div className={styles.rejectedOverlay}>
          <div className={styles.rejectedMessage}>
            You do not have permission to access this website.
            <br />
            Redirecting to login page in 3 seconds...
          </div>
        </div>
        <div className={styles.blurredDashboard}>
        </div>
      </>
    );
  }
  else if (professorStatus === null) {
    return (
      <>
        <Header />
        <div className={styles.dashboardContainer}>
          <LimitedSidebar />
          <LimitedDashboard />
        </div>
      </>
    );
  }
  else{

  return (
    <>
      <Header />
      <div className={styles.dashboardContainer}>
        <Sidebar role={currRole} />
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <h1>Welcome to Professor Dashboard 👋</h1>
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
            <b><i className="fa fa-book"></i> Your Courses</b>
          </div>
          <div className={styles.courseCardContainer}>
            {myCourses.length > 0 && (
              myCourses.length <= 2 ? (
                <div className={styles.staticCourses}>
                  {myCourses.map(data => (
                    <div className={styles.card} key={data.courseid}>
                      <img src={ImageUrl} className={styles.courseImage} alt="Course" />
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
              ) : myCourses.length === 3 ? (
                <div className={styles.staticCourses}>
                  {myCourses.map(data => (
                    <div className={styles.card} key={data.courseid}>
                      <img src={ImageUrl} className={styles.courseImage} alt="Course" />
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
                <Slider {...sliderSettings} afterChange={refreshCourses}>
                  {myCourses.map(data => (
                    <div className={styles.card} key={data.courseid}>
                      <img src={ImageUrl} className={styles.courseImage} alt="Course" />
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
          <div className={styles.headingText}>
              <b><i className="fa fa-star"></i> New Release Courses Today</b>
            </div>
            <div className={styles.courseCardContainer}>
              {newReleaseCourses && newReleaseCourses.length > 0 && (
                newReleaseCourses.length <= 2 ? (
                  <div className={styles.staticCourses}>
                    {newReleaseCourses.map(data => (
                      <div className={styles.card} key={data.courseid}>
                        <img src={ImageUrl} className={styles.courseImage} alt="Course" />
                        <hr />
                        <div className={styles.cardBody}>
                          <h4 className={styles.cardTitle}>{data.coursename}</h4>
                          <h6 className={styles.courseId}>{data.courseid}</h6>
                          <p><b>{data.description}</b></p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : newReleaseCourses.length === 3 ? (
                  <div className={styles.staticCourses}>
                    {newReleaseCourses.map(data => (
                      <div className={styles.card} key={data.courseid}>
                        <img src={ImageUrl} className={styles.courseImage} alt="Course" />
                        <hr />
                        <div className={styles.cardBody}>
                          <h4 className={styles.cardTitle}>{data.coursename}</h4>
                          <h6 className={styles.courseId}>{data.courseid}</h6>
                          <p><b>{data.description}</b></p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Slider {...sliderSettings} afterChange={refreshCourses}>
                    {newReleaseCourses.map(data => (
                      <div className={styles.card} key={data.courseid}>
                        <img src={ImageUrl} className={styles.courseImage} alt="Course" />
                        <hr />
                        <div className={styles.cardBody}>
                          <h4 className={styles.cardTitle}>{data.coursename}</h4>
                          <h6 className={styles.courseId}>{data.courseid}</h6>
                          <p><b>{data.description}</b></p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                )
              )}
              {(!newReleaseCourses || newReleaseCourses.length === 0) && (
                <p>No new courses released today.</p>
              )}
            </div>


        </div>
      </div>
    </>
  );
  }

};

export default ProfessorDashboard;
