import axios from 'axios';

// Create an Axios instance with base URL and headers
const api = axios.create({
    baseURL: "https://backend-2d8n.onrender.com",
    headers: {
        'Content-Type': 'application/json',
    },
});
class professorservice {

    
    // Fetch the list of all professors
    static getProfessorList = async () => {
        try {
            const response = await api.get("/professorlist");
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    // Fetch the list of YouTube courses
    static getYoutubeCourseList = async () => {
        try {
            const response = await api.get("/youtubecourselist");
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    // Fetch the list of website courses
    static getWebsiteCourseList = async () => {
        try {
            const response = await api.get("/websitecourselist");
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    // Fetch a course list by course name
    static getCourseListByName = async (coursename) => {
        try {
            const response = await api.get(`/courselistbyname/${coursename}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    static getChaptersByCourseName = async (coursename) => {
        try {
            const response = await api.get(`/getchapters/${coursename}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    // Fetch professor list by email
    static getProfessorListByEmail = async (email) => {
        try {
            const response = await api.get(`/professorlistbyemail/${email}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    // Add a new professor
    static addNewProfessor = async (professor) => {
        try {
            const response = await api.post("/addProfessor", professor);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
    
    // Add a new course
    static addNewCourse = async (course) => {
        try {
            const response = await api.post("/addCourse", course);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
    
    // Add a new chapter
    static addNewChapters = async (chapter) => {
        try {
            const response = await api.post("/addnewchapter", chapter);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
    
    // Update professor status to accepted by email
    static updateStatus = async (email) => {
        try {
            const response = await api.get(`/acceptstatus/${email}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    // Update professor status to rejected by email
    static rejectStatus = async (email) => {
        try {
            const response = await api.get(`/rejectstatus/${email}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    // Fetch professor profile details by email
    static getProfileDetails = async (email) => {
        try {
            const response = await api.get(`/professorprofileDetails/${email}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    // Update professor profile
    static updateProfessorProfile = async (email, professor) => {
        try {
            const response = await api.put(`/updateprofessor/${email}`, professor);
            return response.data;
        } catch (error) {
            console.error('Update failed:', error);
            throw error;
        }
    };
    
    // Fetch total number of professors
    static getTotalProfessors = async () => {
        try {
            const response = await api.get("/gettotalprofessors");
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    // Fetch total number of chapters
    static getTotalChapters = async () => {
        try {
            const response = await api.get("/gettotalchapters");
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    // Fetch total number of courses
    static getTotalCourses = async () => {
        try {
            const response = await api.get("/gettotalcourses");
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    // Fetch total number of wishlisted courses
    static getTotalWishlist = async () => {
        try {
            const response = await api.get("/gettotalwishlist");
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    
    // Fetch course names
    static getCourseNames = async () => {
        try {
            const response = await api.get("/getcoursenames");
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    static listCoursesByProfessor = async (email) => {
        try {
            const response = await api.get(`/listCourse/${email}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    static editCourse = async (email, coursename, updatedCourse) => {
        try {
          const response = await api.put(`/editCourse/${email}/${coursename}`, 
            updatedCourse,
            { headers: { 'Content-Type': 'application/json' } }
          );
          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      };
      
    static getCoursesUploadedToday = async () => {
        try {
            const response = await api.get("/courses/uploaded-today");
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
}
export default professorservice;