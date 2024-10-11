import axios from 'axios';

class UserService {
    static BASE_URL = "http://localhost:8080";

    // User login method
    static loginUser(email, password) {
        return axios
            .post(`${UserService.BASE_URL}/loginuser`, { email, password })
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error logging in user:', error);
                throw error;
            });
    }

    // Professor login method
    static loginProfessor(email, password) {
        return axios
            .post(`${UserService.BASE_URL}/loginprofessor`, { email, password })
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error logging in professor:', error);
                throw error;
            });
    }

    static registerUser = (userData) => {
        return fetch(`${UserService.BASE_URL}/registeruser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        }).then(response => response.json());
      };
      
      static registerProfessor = (professor) => {
        return fetch(`${UserService.BASE_URL}/registerprofessor`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(professor)
        }).then(response => response.json());
      };


    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        window.dispatchEvent(new Event('storage'));
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    static isUser() {
        const role = localStorage.getItem('role');
        return role === 'USER';
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();
    }
}

export default UserService;
