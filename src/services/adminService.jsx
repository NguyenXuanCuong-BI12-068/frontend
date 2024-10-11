// adminService.js
import axios from 'axios';

const NAV_URL = "https://backend-v3ko.onrender.com"; 

export const adminService = {
  addProfessor: (professor) => {
    return axios.post(`${NAV_URL}/addProfessor`, professor);
  },

  addCourse: (course) => {
    return axios.post(`${NAV_URL}/addCourse`, course);
  },
  
  getTotalProfessors: () => {
    return axios.get(`${NAV_URL}/gettotalprofessors`);
  },

  getTotalUsers: () => {
    return axios.get(`${NAV_URL}/gettotalusers`);
  },

  getTotalCourses: () => {
    return axios.get(`${NAV_URL}/gettotalcourses`);
  },

  getTotalWishlist: () => {
    return axios.get(`${NAV_URL}/gettotalwishlist`);
  },

  getTotalEnrollments: () => {
    return axios.get(`${NAV_URL}/gettotalenrollments`);
  },

  getTotalEnrollmentCount: () => {
    return axios.get(`${NAV_URL}/gettotalenrollmentcount`);
  },

  getTotalChapters: () => {
    return axios.get(`${NAV_URL}/gettotalchapters`);
  }
};
export default adminService;