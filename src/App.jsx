import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/Login';    
import Register from './component/Register';
import RegisterSuccess from './component/RegisterSuccess';
import UserDashboard from './component/UserDashboard';
import ProfessorDashboard from './component/ProfressorDashboard';
import AdminDashboard from './component/AdminDashboard';
import AddProfessor from './component/AddProfressor';
import AddCourse from './component/AddCourse';
import AddChapter from './component/AddChapter';
import Courselist from './component/CourseList';
import MyCourses from './component/MyCourse';
import MyWishlist from './component/MyWishlist';
import ProfessorProfile from './component/professorprofile';
import ApprovalStatus from './component/ApprovalStatus';
import UserProfile from './component/UserProfile';
import ProfessorList from './component/ProfressorList';
import UserList from './component/UserList';
import FullCourse from './component/FullCourse';
import Welcome from './component/WelcomePage/Welcome';
import ProtectedRoute from './ProtectedRoute';
import ManageProfessorCourses from './component/ManageProfessorCourses';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registersuccess" element={<RegisterSuccess />} />
        
        <Route path="/userdashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/professordashboard" element={<ProtectedRoute><ProfessorDashboard /></ProtectedRoute>} />
        <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/addProfessor" element={<ProtectedRoute><AddProfessor /></ProtectedRoute>} />
        <Route path="/addCourse" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
        <Route path="/addchapter" element={<ProtectedRoute><AddChapter /></ProtectedRoute>} />
        <Route path="/courselist" element={<ProtectedRoute><Courselist /></ProtectedRoute>} />
        <Route path="/mycourses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
        <Route path="/mywishlist" element={<ProtectedRoute><MyWishlist /></ProtectedRoute>} />
        <Route path="/editprofessorprofile" element={<ProtectedRoute><ProfessorProfile /></ProtectedRoute>} />
        <Route path="/approveprofessor" element={<ProtectedRoute><ApprovalStatus /></ProtectedRoute>} />
        <Route path="/edituserprofile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/professorlist" element={<ProtectedRoute><ProfessorList /></ProtectedRoute>} />
        <Route path="/userlist" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
        <Route path="/manageprofessorcourses" element={<ProtectedRoute><ManageProfessorCourses /></ProtectedRoute>} />
        <Route path="/fullcourse/:coursename" element={<ProtectedRoute><FullCourse /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
