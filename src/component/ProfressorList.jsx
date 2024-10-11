import React, { useEffect, useState } from 'react';
import professorservice from '../services/professorService';
import styles from './css/ProfressorList.module.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Pagination from './Pagination';

const ProfessorList = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [currRole, setCurrRole] = useState('');
  const [professorList, setProfessorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const user = sessionStorage.getItem('loggedUser') || '{}';
    setLoggedUser(user);

    const role = sessionStorage.getItem('ROLE') || '{}';
    setCurrRole(role);

    professorservice.getProfessorList().then((data) => {
      setProfessorList(data);
    });
  }, []);

  const getCurrentItems = (items) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  return (
    <>
      <Header />
      <Sidebar
        role={currRole}
        loggedUser={loggedUser}
      />
      <div className={styles.panel} id="professorList">
        <div className={styles.panelHeading}>
          <h2>Professor List</h2>
        </div>
        <div className={styles.panelBody}>
          <table className={`${styles.table} ${styles.tableBordered}`}>
            <thead>
              <tr>
                <th>Professor ID</th>
                <th>Name</th>
                <th>Degree</th>
                <th>Email</th>
                <th>Institution</th>
                <th>Department</th>
                <th>Experience</th>
                <th>Gender</th>
                <th>Mobile</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentItems(professorList).map((professor) => (
                <tr key={professor.professorid}>
                  <td>{professor.professorid}</td>
                  <td>{professor.professorname}</td>
                  <td>{professor.degreecompleted}</td>
                  <td>{professor.email}</td>
                  <td>{professor.institutionname}</td>
                  <td>{professor.department}</td>
                  <td>{professor.experience} years</td>
                  <td>{professor.gender}</td>
                  <td>{professor.mobile}</td>
                  <td>
                    {professor.status === 'accept' && <div className={styles.accepted}>Approved</div>}
                    {professor.status === 'reject' && <div className={styles.rejected}>Rejected</div>}
                    {professor.status === null && <div className={styles.pending}>Pending</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            items={professorList}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default ProfessorList;
