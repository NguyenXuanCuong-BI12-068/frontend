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
import WelcomePage from './component/WelcomePage';
import Welcome from './component/WelcomePage/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registersuccess" element={<RegisterSuccess />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/professordashboard" element={<ProfessorDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/addProfessor" element={<AddProfessor />} />
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/addchapter" element={<AddChapter />} />
        <Route path="/courselist" element={<Courselist />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/mywishlist" element={<MyWishlist />} />
        <Route path="/editprofessorprofile" element={<ProfessorProfile />} />
        <Route path="/approveprofessor" element={<ApprovalStatus />} />
        <Route path="/edituserprofile" element={<UserProfile />} />
        <Route path="/professorlist" element={<ProfessorList />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/fullcourse/:coursename" element={<FullCourse />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
