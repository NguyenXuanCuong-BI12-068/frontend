import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService'; 
import { Professor } from './models/Professor';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './css/AddProfessor.module.css';

const AddProfessor = () => {
    const [professor, setProfessor] = useState(new Professor());
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const user = sessionStorage.getItem('loggedUser') || '{}';
    const role = sessionStorage.getItem('ROLE') || '{}';
    const addProfessor = async () => {
        try {
            const response = await adminService.addProfessor(professor);
            console.log("Professor added Successfully !!!", response);
            navigate('/admindashboard');
        } catch (error) {
            console.error("Process Failed", error);
            setMsg(`Professor with ${professor.email} already exists !!!`);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfessor(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
        <Header />
            <Sidebar
            role={role}
            loggedUser={user}

            />
        <div className={styles.container}>
            <div className={styles.register}>
                <h3 className={styles.heading}><i className="fa fa-user-o"></i> Add New Professor</h3>
                <small className="text-danger"><b>{msg}</b></small>
                <form onSubmit={e => { e.preventDefault(); addProfessor(); }}>
                    <div className={styles.formGroup}>
                        <label>Professor Name : <b style={{ color: 'red' }}>*</b></label>
                        <input type="text" className={styles.formControl} name="professorname" placeholder="enter professor name" required onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Professor email : <b style={{ color: 'red' }}>*</b></label>
                        <input type="email" className={styles.formControl} name="email" placeholder="enter email address" required onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Professor Gender : <b style={{ color: 'red' }}>*</b></label>
                        <input type="text" className={styles.formControl} name="gender" placeholder="please mention gender" required onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Mobile Number : <b style={{ color: 'red' }}>*</b></label>
                        <input type="tel" className={styles.formControl} name="mobile" placeholder="enter mobile number" required onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password : <b style={{ color: 'red' }}>*</b></label>
                        <input type="password" className={styles.formControl} name="password" placeholder="enter password" required onChange={handleChange} />
                        <small style={{ color: 'navy', fontSize: '10px', fontWeight: 'bold' }}>Please use the temporary password as "123"</small>
                        <small style={{ color: 'gray', fontSize: '10px', fontWeight: 'bold' }}>Later Professor can Login and edit his/her password</small>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Working Institution Name : <b style={{ color: 'red' }}>*</b></label>
                        <input type="text" className={styles.formControl} name="institutionname" placeholder="enter institution name" required onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Working Department : <b style={{ color: 'red' }}>*</b></label>
                        <input type="text" className={styles.formControl} name="department" placeholder="enter department" required onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Years of Experience : <b style={{ color: 'red' }}>*</b></label>
                        <input type="number" className={styles.formControl} name="experience" placeholder="enter years of experience" required onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Completed Degrees : <b style={{ color: 'red' }}>*</b></label>
                        <input type="text" className={styles.formControl} name="degreecompleted" placeholder="completed degrees (separated by , )" required onChange={handleChange} />
                        <br /><small style={{ color: 'gray' }}>Eg: M.E PhD, M.E MPhil, B.E, Dr, etc...</small>
                    </div>
                    <div className={styles.checkbox}>
                        <small style={{ color: 'gray' }}>
                            <input type="checkbox" required /> Is he/she a certified professor <b style={{ color: 'red' }}>(low experienced professors can't give standard content to learners)</b>
                        </small>
                    </div>
                    <button type="submit" className="btnRegister"><i className="fa fa-plus"></i> Add Professor</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default AddProfessor;
