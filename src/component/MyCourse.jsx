import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import userservice from '../services/userService';
import styles from './css/Mycourse.module.css';
import Header from './Header';
import Sidebar from './Sidebar';

const MyCourses = () => {
    const [myEnrollments, setMyEnrollments] = useState([]);
    const [loggedUser, setLoggedUser] = useState('');
    const [currRole, setCurrRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem('loggedUser') || '{}';
        const role = sessionStorage.getItem('ROLE') || '{}';
        setLoggedUser(user);
        setCurrRole(role);

        const fetchEnrollments = async () => {
            const enrollments = await userservice.getEnrollmentsByEmail(user, role);
            setMyEnrollments(enrollments);
        };

        fetchEnrollments();
    }, []);

    const visitCourse = (courseName) => {
        navigate(`/fullcourse/${courseName}`);
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
                <b><i className="fa fa-graduation-cap"></i> My Learning</b>
            </div>
            <div className={styles.courseCardContainer}>
                <Slider {...sliderSettings}>
                    {myEnrollments.map(data => (
                        <div className={styles.card} key={data.courseid}>
                            <div className={styles.cardBody}>
                                <h4 className={styles.cardTitle}>{data.coursename}</h4>
                                <h6 className={styles.courseId}>{data.courseid}</h6>
                                <div><b>Date: </b><span>{data.enrolleddate}</span></div>
                                <div><b>Your ID: </b><span className={styles.userId}>{data.enrolleduserid}</span></div>
                                <div><b>Instructor: </b><span>{data.instructorname}</span></div>
                                <div><b>Learners: </b><span>{data.enrolledcount} enrolled previously</span></div>
                                <div><b>Type: </b><span>{data.coursetype}</span></div>
                                <div><b>Level: </b><span>{data.skilllevel}</span></div>
                                <div><b>Language: </b><span>{data.language}</span></div>
                                <p><b>{data.description}</b></p>
                                <button onClick={() => visitCourse(data.coursename)} className={styles.visitButton}>
                                    Visit Course
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

export default MyCourses;
