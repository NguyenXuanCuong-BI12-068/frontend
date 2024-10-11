import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './css/AdminDashboard.module.css';
import DashboardCard from './DashboardCard';
import studentsIcon from '../assets/images/graduated.png';
import professorsIcon from '../assets/images/professor.png';
import coursesIcon from '../assets/images/education-apps.png';
import learnersIcon from '../assets/images/self-learning.png';
import chaptersIcon from '../assets/images/chapter.png';
import favoriteIcon from '../assets/images/like.png';
import enrollmentIcon from '../assets/images/user.png';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend ,BarChart, Bar, XAxis, YAxis, CartesianGrid} from 'recharts';




const AdminDashboard = () => {
    const [loggedUser, setLoggedUser] = useState('');
    const [currRole, setCurrRole] = useState('');
    const [professors, setProfessors] = useState(0);
    const [users, setUsers] = useState(0);
    const [courses, setCourses] = useState(0);
    const [enrollment,setEnrollments] = useState(0);
    const [enrollmentCount, setEnrollmentCount] = useState(0);
    const [wishlist, setWishlist] = useState(0);
    const [chapters, setChapters] = useState(0);

    const navigate = useNavigate();


    useEffect(() => {
        const role = sessionStorage.getItem('ROLE') || '';
        const loggedUserData = sessionStorage.getItem('loggedUser') || '';

        setLoggedUser(loggedUserData);
        setCurrRole(role);

        // Fetch data from adminService
        const fetchData = async () => {
            try {
                const professorsResponse = await adminService.getTotalProfessors();
                const usersResponse = await adminService.getTotalUsers();
                const coursesResponse = await adminService.getTotalCourses();
                const enrollmentsResponse = await adminService.getTotalEnrollments();
                const enrollmentCountResponse = await adminService.getTotalEnrollmentCount();
                const wishlistResponse = await adminService.getTotalWishlist();
                const chaptersResponse = await adminService.getTotalChapters();
        
                // Access the actual numbers in the response
                setProfessors(professorsResponse.data[0] || 0); // Safely access the first element
                setUsers(usersResponse.data[0] || 0); // Access first element from users
                setCourses(coursesResponse.data[0] || 0);
                setEnrollments(enrollmentsResponse.data[0] || 0);
                setEnrollmentCount(enrollmentCountResponse.data[0] || 0);
                setWishlist(wishlistResponse.data[0] || 0);
                setChapters(chaptersResponse.data[0] || 0);
        
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);


    const StudentsIcon = () => (
        <img src={studentsIcon} alt="Students icon" title="Students icons" className={styles.customIcon} />
    );
    const ProfessorsIcon = () => (
        <img src={professorsIcon} alt="Professors icon" title="Professors icons" className={styles.customIcon} />
    );
    const CoursesIcon = () => (
        <img src={coursesIcon} alt="Courses icon" title="Courses icons" className={styles.customIcon} />
    );
    const LearnerIcon = () => (
        <img src={learnersIcon} alt="Learner icon" title="Learner icons" className={styles.customIcon} />
    );
    const EnrollIcon = () => (
        <img src={enrollmentIcon} alt="Enrollment icon" title="Enrollment icons" className={styles.customIcon} />
    );
    const ChapterIcon = () => (
        <img src={chaptersIcon} alt="Chapter icon" title="Chapter icons" className={styles.customIcon} />
    );
    const FavoriteIcon = () => (
        <img src={favoriteIcon} alt="Favorite icon" title="Favorite icons" className={styles.customIcon} />
    );

    const preparePieChartData = () => {
        return [
          { name: 'Students', value: users },
          { name: 'Professors', value: professors }
        ];
      };
      const COLORS = ['#0088FE', '#00C49F'];

      const prepareBarChartData = () => {
        const totalUsers = users + professors;
        return [
          { name: 'Accounts', Total: totalUsers, Students: users, Professors: professors }
        ];
      };
      
    return (
        <>
            <Header />
            <Sidebar role={currRole} />
       
            <div className={styles.dashboardContainer}>
                <div className={styles.dashboard}>
                    <h1 className={styles.welcome}>Welcome to Admin Dashboard</h1>

                    <div className={styles.cardContainer}>
                        <DashboardCard
                            iconComponent={<StudentsIcon />}
                            title="Students"
                            count={users}
                            percentage={{ color: "success", amount: "+5%", label: "than last month" }}
                        />
                        <DashboardCard
                            iconComponent={<ProfessorsIcon />}
                            title="Professors"
                            count={professors}
                            percentage={{ color: "success", amount: "+3%", label: "than last week" }}
                        />
                        <DashboardCard
                            iconComponent={<CoursesIcon />}
                            title="Courses"
                            count={courses}
                            percentage={{ color: "success", amount: "+2%", label: "than yesterday" }}
                        />
                        <DashboardCard
                            iconComponent={<LearnerIcon />}
                            title="Learners"
                            count={enrollmentCount}
                            percentage={{ color: "success", amount: "+4%", label: "than last month" }}
                        />
                        <DashboardCard
                            iconComponent={<EnrollIcon />}
                            title="Enrollments"
                            count={enrollment}
                            percentage={{ color: "error", amount: "-1%", label: "than last month" }}
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
                    <div className={styles.chartsContainer}>
                        <div className={styles.chartWrapper}>
                            <h2 className={styles.chartTitle}>User Distribution</h2>
                            <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                data={preparePieChartData()}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                >
                                {preparePieChartData().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className={styles.chartWrapper}>
                            <h2 className={styles.chartTitle}>User Account Distribution</h2>
                            <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={prepareBarChartData()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Total" fill="#8884d8" />
                                <Bar dataKey="Students" fill="#0088FE" />
                                <Bar dataKey="Professors" fill="#00C49F" />
                            </BarChart>
                            </ResponsiveContainer>
                        </div>
                        </div>
                </div>
            </div>
        </>
    );
};


export default AdminDashboard;
