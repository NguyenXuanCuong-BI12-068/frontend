import React, { useState, useEffect,useRef} from 'react';
import { useNavigate  } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from './Header';
import YouTube from 'react-youtube';
import userservice from '../services/userService';
import professorservice from '../services/professorService';
import styles from './css/CourseList.module.css';
import Sidebar from './Sidebar';

const extractVideoId = (url) => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
};

const Courselist = () => {
  const [youtubecourseList, setYoutubeCourseList] = useState([]);
  const [websiteCourseList, setWebsiteCourseList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState([]);
  const [loggedUser, setLoggedUser] = useState('');
  const [currRole, setCurrRole] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [view, setView] = useState('courseList');
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [enrolledStatus, setEnrolledStatus] = useState('notenrolled');
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [showEnrollMessage, setShowEnrollMessage] = useState(false);
  const navigate = useNavigate();
  const enrollSuccessRef = useRef(null);
  const enrollMessageRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const user = sessionStorage.getItem('loggedUser') || '';
    setLoggedUser(user);
  
    const role = sessionStorage.getItem('ROLE') || '';
    setCurrRole(role);
  
    professorservice.getYoutubeCourseList().then(data => setYoutubeCourseList(data));
    professorservice.getWebsiteCourseList().then(data => setWebsiteCourseList(data));

  }, []); 

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
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    console.log('Search term:', term);
  };

  const filterCourses = (courses) => {
    const filtered = courses.filter(course => 
      (course.coursename?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (course.instructorname?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (course.skilllevel?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (course.language?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
    console.log('Filtered courses:', filtered);
    return filtered;
  };

  const getCourseDetails = (coursename) => {
    setView('courseDetails');
    setIsDetailsVisible(true);
    professorservice.getCourseListByName(coursename).then(data => {
      setCourseList(data);
      setSelectedCourse(data[0]);
  
      userservice.getEnrollmentStatus(coursename, loggedUser, currRole).then(status => {
        setEnrollmentStatus(status);
        setEnrolledStatus(status[0]);
      });
  
      userservice.getWishlistStatus(coursename, loggedUser).then(status => {
        setWishlistStatus(prevState => ({
          ...prevState,
          [data[0].courseid]: status[0] === 'liked' ? 'wishlisted' : 'notwishlisted'
        }));
      });
    });
  };
  const backToCourseList = () => {
    setView('courseList');
    setIsDetailsVisible(false);
  };

  const enrollCourse = (course) => {
    const newEnrollment = {
      courseid: course.courseid,
      coursename: course.coursename,
      enrolledusertype: currRole,
      instructorname: course.instructorname,
      instructorinstitution: course.instructorinstitution,
      enrolledcount: course.enrolledcount,
      youtubeurl: course.youtubeurl,
      websiteurl: course.websiteurl,
      coursetype: course.coursetype,
      skilllevel: course.skilllevel,
      language: course.language,
      description: course.description,
    };

    userservice
      .enrollNewCourse(loggedUser, currRole, newEnrollment)
      .then(() => {
        setEnrolledStatus('enrolled'); // Update enrollment status
        localStorage.setItem(`enrollmentStatus_${course.courseid}`, 'enrolled');
        if (enrollSuccessRef.current) {
          enrollSuccessRef.current.style.display = 'block'; // Show success message
        }
        setTimeout(() => {
          if (enrollSuccessRef.current) {
            enrollSuccessRef.current.style.display = 'none'; // Hide success message after a timeout
          }
        }, 3000);
      })
      .catch((error) => {
        console.error("Enrollment Failed", error);
      });
  };

  const addToWishList = (course) => {
    const newWishlist = {
      courseid: course.courseid,
      coursename: course.coursename,
      likeduser: loggedUser,
      likedusertype: currRole,
      instructorname: course.instructorname,
      instructorinstitution: course.instructorinstitution,
      enrolledcount: course.enrolledcount,
      coursetype: course.coursetype,
      websiteurl: course.websiteurl,
      skilllevel: course.skilllevel,
      language: course.language,
      description: course.description,
    };
  
    userservice.addToWishlist(newWishlist)
    .then(() => {
      console.log('Added To Wishlist Successfully');
      setWishlistStatus(prevState => ({
        ...prevState,
        [course.courseid]: 'wishlisted'
      }));
    })
    .catch((error) => {
      console.error('Adding Process Failed', error);
    });
  };
  const visitCourse = (course) => {
    console.log("course type", course.coursetype);

    if (enrolledStatus !== 'enrolled') {
      // Show custom message instead of alert
      setShowEnrollMessage(true);

      // Hide the message after 3 seconds
      setTimeout(() => {
        setShowEnrollMessage(false);
      }, 3000);
      
      return;
    }

    if (course.coursetype === 'Youtube') {
      navigate(`/fullcourse/${course.coursename}`);
    } else if (course.coursetype === 'Website') {
      gotoURL(course.websiteurl);
    }
  };

  const gotoURL = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
    <Header />
    <Sidebar
            role={currRole}
            loggedUser={loggedUser}

    />
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
    </div>
      <div
        id={styles.youtubecard}
        className={isDetailsVisible ? styles.hidden : ''}
        
      >
        <div className={styles.headtext}>Courses with Youtube Videos</div>
        <Slider {...sliderSettings} key={searchTerm}>
          {filterCourses(youtubecourseList).map((data, index) => (
            <div key={index} className={styles.card} style={{ width: '25rem' }}>
              <YouTube 
                videoId={extractVideoId(data.youtubeurl)} 
                opts={{ height: '200', width: '335' }} 
              />
              <div
                className={styles.cardBody}
                style={{
                  margin: '0 10% 20% 0',
                  width: '300px',
                  backgroundColor: 'white',
                }}
              >
                <h4 className={`${styles.cardTitle} ${styles.textCenter}`} style={{ marginBottom: '4%' }}>
                  <b>{data.coursename}</b>
                </h4>
                <h6
                  className={styles.textCenter}
                  style={{
                    margin: '0 auto',
                    padding: '5px 10px',
                    backgroundColor: 'darkgoldenrod',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    width: '55%',
                    color: 'white',
                  }}
                >
                  {data.courseid}
                </h6>
                <div>
                  <b style={{ color: 'darkred', fontSize: 'large' }}>Instructor: </b>
                  <b>{data.instructorname}</b>
                </div>
                <div>
                  <b style={{ color: 'darkred', fontSize: 'large' }}>Learners: </b>
                  <b>{data.enrolledcount} enrolled previously</b>
                </div>
                <div>
                  <b style={{ color: 'darkred', fontSize: 'large' }}>Level: </b>
                  <b>{data.skilllevel}</b>
                </div>
                <div>
                  <b style={{ color: 'darkred', fontSize: 'large' }}>Language: </b>
                  <b>{data.language}</b>
                </div>
                <p className={styles.cardText}>
                  <b style={{ color: 'darkblue', fontSize: 'large' }}>{data.description}</b>
                </p>
                <button
                  onClick={() => getCourseDetails(data.coursename)}
                  style={{ margin: '0 auto', border: 'none' }}
                  className={styles.btnPrimary}
                >
                  More Info
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div id={styles.websitecard} className={isDetailsVisible ? styles.hidden : ''}>
        <div className={styles.headtext}>Courses with Website Content</div>
        <Slider {...sliderSettings} key={searchTerm}>
          {filterCourses(websiteCourseList).map((data, index) => (
            <div key={index} className={styles.card} style={{ width: '18rem' }}>
              <div
                className={styles.cardBody}
                style={{
                  margin: '2% 5% 10% 0',
                  width: '300px',
                }}
              >
                <h4 className={`${styles.cardTitle} ${styles.textCenter}`} style={{ marginBottom: '4%' }}>
                  <b>{data.coursename}</b>
                </h4>
                <h6
                  className={styles.textCenter}
                  style={{
                    margin: '0 auto',
                    padding: '5px 10px',
                    backgroundColor: 'darkgoldenrod',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    width: '55%',
                    color: 'white',
                  }}
                >
                  {data.courseid}
                </h6>
                <div>
                  <b style={{ color: 'darkred', fontSize: 'large' }}>Instructor: </b>
                  <b>{data.instructorname}</b>
                </div>
                <div>
                  <b style={{ color: 'darkred', fontSize: 'large' }}>Learners: </b>
                  <b>{data.enrolledcount} enrolled previously</b>
                </div>
                <div>
                  <b style={{ color: 'darkred', fontSize: 'large' }}>Level: </b>
                  <b>{data.skilllevel}</b>
                </div>
                <div>
                  <b style={{ color: 'darkred', fontSize: 'large' }}>Language: </b>
                  <b>{data.language}</b>
                </div>
                <p className={styles.cardText}>
                  <b style={{ color: 'darkblue', fontSize: 'large' }}>{data.description}</b>
                </p>
                <button
                  onClick={() => getCourseDetails(data.coursename)}
                  style={{ margin: '0 auto', border: 'none' }}
                  className={styles.btnPrimary}
                >
                  More Info
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {view === 'courseDetails' && selectedCourse && (
  <div id="courseDetails" style={{ margin: '5% 20%' }}>
    <div className={styles.headtext}>Course Details</div>
    <div
      id={styles.coursedetailscard}
      style={{ margin: '5% 20%' }}
    >
      {courseList.map((data, index) => (
        <div
          key={index}
          className={styles.cardBody}
          style={{
            border: '1px solid black',
            margin: '0% 5% 10% 25%',
            padding: '0 3%',
            width: '520px',
            borderRadius: '10px',
            backgroundColor: 'white',
          }}
        >
          <h4 className={`${styles.cardTitle} ${styles.textCenter}`} style={{ marginBottom: '4%' }}>
            <b className={styles.largeText}>{data.coursename}</b>
          </h4>
          <h6
            className={styles.textCenter}
            style={{
              margin: '0 26%',
              padding: '5px 10px',
              backgroundColor: 'darkgoldenrod',
              borderRadius: '5px',
              fontWeight: 'bold',
              width: '40%',
              color: 'white',
            }}
          >
            {data.courseid}
          </h6>
          <div>
            <b className={styles.largeText}>Instructor Name: </b>
            <b style={{ marginLeft: '14%' }}>{data.instructorname}</b>
          </div>
          <div>
            <b className={styles.largeText}>Instructor Institution: </b>
            <b style={{ marginLeft: '6%' }}>{data.instructorinstitution}</b>
          </div>
          <div>
            <b className={styles.largeText}>Enrolled Date: </b>
            <b style={{ marginLeft: '19%' }}>{data.enrolleddate}</b>
          </div>
          <div>
            <b className={styles.largeText}>Learners: </b>
            <b style={{ marginLeft: '30%' }}>{data.enrolledcount}</b>
          </div>
          <div>
            <b className={styles.largeText}>Course Type: </b>
            <b style={{ marginLeft: '36%' }}>{data.coursetype}</b>
          </div>
          <div>
            <b className={styles.largeText}>Level: </b>
            <b style={{ marginLeft: '28%' }}>{data.skilllevel}</b>
          </div>
          <div>
            <b className={styles.largeText}>Language: </b>
            <b>{data.language}</b>
          </div>
          <div>
            <b className={styles.largeText}>Description: </b>
            <b>{data.description}</b>
          </div>
        </div>
      ))}
    </div>
    {/* Buttons */}
    <button
      onClick={() => selectedCourse && enrollCourse(selectedCourse)}
      className={styles.btnPrimary}
      disabled={enrolledStatus === 'enrolled'}
    >
      {enrolledStatus === 'enrolled' ? 'Enrolled' : 'Enroll'}
    </button>

    <button
      onClick={() => selectedCourse && addToWishList(selectedCourse)}
      className={styles.btnPrimary}
      disabled={wishlistStatus[selectedCourse?.courseid] === 'wishlisted'}
    >
      {wishlistStatus[selectedCourse?.courseid] === 'wishlisted' ? 'Wishlisted' : 'Add to Wishlist'}
    </button>

    <button 
      onClick={() => selectedCourse && visitCourse(selectedCourse)} 
      className={styles.btnPrimary}
    >
      Visit Course
    </button>

    <button onClick={backToCourseList} className={styles.btnPrimary}>
      Back to Course List
    </button>


        {/* Enrollment Success Message */}
        <div
        ref={enrollSuccessRef}
        style={{
          display: 'none',
          backgroundColor: '#dff0d8',
          color: '#3c763d',
          padding: '10px',
          borderRadius: '5px',
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000,
        }}
      >
        Enrollment Successful!
      </div>
       {/* Enrollment Warning Message */}
       {showEnrollMessage && (
        <div
          ref={enrollMessageRef}
          style={{
            backgroundColor: '#f2dede',
            color: '#a94442',
            padding: '10px',
            borderRadius: '5px',
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 1000,
          }}
        >
          You have to enroll to visit the course.
        </div>
      )}
  </div>
)}
    </>
  );
};

export default Courselist;
