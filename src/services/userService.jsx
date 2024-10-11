import axios from 'axios';

// Create an Axios instance with base URL and headers
const api = axios.create({
    baseURL: "https://backend-2d8n.onrender.com",
    headers: {
        'Content-Type': 'application/json',
    },
});
class userservice {
    
    
    // Fetch the list of all users
    static getUserList = async () => {
        try {
            const response = await api.get("/userlist");
            return response.data;
        } catch (error) {
            console.error('Error fetching user list:', error);
            return [];
        }
    };
    
    // Enroll in a new course
    static enrollNewCourse = async (email, role, enrollment) => {
        try {
            const response = await api.post(`/enrollnewcourse/${email}/${role}`, enrollment);
            return response.data;
        } catch (error) {
            console.error('Error enrolling in course:', error);
            throw error;
        }
    };
    
    // Check enrollment status for a course
    static getEnrollmentStatus = async (coursename, email, role) => {
        try {
            const response = await api.get(`/getenrollmentstatus/${coursename}/${email}/${role}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching enrollment status:', error);
            throw error;
        }
    };
    
    // Add a new course to the wishlist
    static addToWishlist = async (wishlist) => {
        try {
            const response = await api.post('/addtowishlist', wishlist);
            return response.data;
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            throw error;
        }
    };
    
    // Check wishlist status for a course
    static getWishlistStatus = async (coursename, email) => {
        try {
            const response = await api.get(`/getwishliststatus/${coursename}/${email}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching wishlist status:', error);
            throw error;
        }
    };
    
    // Get all wishlists
    static getAllWishlist = async () => {
        try {
            const response = await api.get('/getallwishlist');
            return response.data;
        } catch (error) {
            console.error('Error fetching all wishlists:', error);
            return [];
        }
    };
    
    // Get wishlist by email
    static getWishlistByEmail = async (email) => {
        try {
            const response = await api.get(`/getwishlistbyemail/${email}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching wishlist by email:', error);
            return [];
        }
    };
    
    // Get enrollments by email
    static getEnrollmentsByEmail = async (email, role) => {
        try {
            const response = await api.get(`/getenrollmentbyemail/${email}/${role}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching enrollments by email:', error);
            return [];
        }
    };
    
    // Get chapter list by course name
    static getChapterListByCourseName = async (coursename) => {
        try {
            const response = await api.get(`/getchapterlistbycoursename/${coursename}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching chapter list by course name:', error);
            return [];
        }
    };
    
    // Get user profile details by email
    static getProfileDetails = async (email) => {
        try {
            const response = await api.get(`/userprofileDetails/${email}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile details:', error);
            return [];
        }
    };
    
    // Update user profile
    static updateUserProfile = async (email, user) => {
        try {
            const response = await api.put(`/updateuser/${email}`, user);
            return response.data;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    };
    
    // Get total number of users
    static getTotalUsers = async () => {
        try {
            const response = await api.get('/gettotalusers');
            return response.data;
        } catch (error) {
            console.error('Error fetching total number of users:', error);
            return [];
        }
    };
    
    // Get total enrollment count
    static getTotalEnrollmentCount = async () => {
        try {
            const response = await api.get('/gettotalenrollmentcount');
            return response.data;
        } catch (error) {
            console.error('Error fetching total enrollment count:', error);
            return [];
        }
    };
    
    // Get total number of enrollments
    static getTotalEnrollments = async () => {
        try {
            const response = await api.get('/gettotalenrollments');
            return response.data;
        } catch (error) {
            console.error('Error fetching total number of enrollments:', error);
            return [];
        }
    };
}
export default userservice;