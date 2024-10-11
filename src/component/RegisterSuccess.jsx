import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/RegisterSuccess.module.css';

const RegisterSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 7000);

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img 
                    src="assets/img/success.gif" 
                    alt="Success" 
                    width="200" 
                    height="200" 
                />
                <h1>Registered Successfully !!!</h1>
                <h3>You will be redirected to the Login page in a few seconds</h3>
            </div>
        </div>
    );
};

export default RegisterSuccess;
