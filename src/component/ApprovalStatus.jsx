import React, { useState, useEffect } from 'react';
import professorservice from '../services/professorService';
import styles from './css/ApprovalStatus.module.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Pagination from './Pagination';
import LimitedSidebar from './LimitedSidebar';

const ApprovalStatus = () => {
  const [currRole, setCurrRole] = useState('');
  const [loggedUser, setLoggedUser] = useState('');
  const [approval, setApproval] = useState([]);
  const [professorList, setProfessorList] = useState([]);
  const [responses, setResponses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [professorStatus, setProfessorStatus] = useState('');
  const itemsPerPage = 10;
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const user = sessionStorage.getItem('loggedUser') || '';
    const role = sessionStorage.getItem('ROLE') || '';
    setLoggedUser(user);
    setCurrRole(role);
  
    professorservice.getProfessorList().then(setProfessorList);
    professorservice.getProfessorListByEmail(user).then(setApproval);
  }, []); 

  useEffect(() =>{
    const fetchProfessorStatus = async () => {
      try {
        const professorData = await professorservice.getProfessorListByEmail(loggedUser);
        console.log("Data", professorData)
        if (professorData.length > 0) {
          setProfessorStatus(professorData[0].status);
        }
      } catch (error) {
        console.error('Error fetching professor status:', error);
      }
    };
    fetchProfessorStatus();
  },[loggedUser])


  const getCurrentItems = (items) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const getFilteredProfessors = (professors) => {
    if (statusFilter === 'all') return professors;
    if (statusFilter === 'none') return professors.filter(prof => prof.status === null);
    return professors.filter(prof => prof.status === statusFilter);
  };

  const getCurrentItems2 = (items) => {
    const filteredItems = getFilteredProfessors(items);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  };
  

  const updateStatus = (email, action) => {
    const updateAction = action === 'accept'
      ? professorservice.updateStatus(email)
      : professorservice.rejectStatus(email);

    updateAction.then(() => {
      setProfessorList(prevList =>
        prevList.map(professor =>
          professor.email === email
            ? { ...professor, status: action }
            : professor
        )
      );
    });
  };

  if (professorStatus === null) {
    return (
      <>
        <Header />
        <div className={styles.dashboardContainer}>
          <LimitedSidebar />
          {currRole.toLowerCase() === 'professor' && (
          <div className={styles.panel} id="professorapproval">
            <div className={styles.panelHeading}>
              <h2>Your Approval Status</h2>
            </div>
            <div className={styles.panelBody}>
              <table className={`${styles.table} ${styles.tableBordered}`}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Degree</th>
                    <th>Experience</th>
                    <th>Institution</th>
                    <th>Department</th>
                    <th>Mobile</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approval.map((professor) => (
                    <tr key={professor.professorid}>
                      <td>{professor.professorname}</td>
                      <td>{professor.email}</td>
                      <td>{professor.degreecompleted}</td>
                      <td>{professor.experience} years</td>
                      <td>{professor.institutionname}</td>
                      <td>{professor.department}</td>
                      <td>{professor.mobile}</td>
                      <td>
                        {professor.status === 'accept' && (
                          <div className={styles.accepted}>Accepted</div>
                        )}
                        {(professor.status === null || professor.status === undefined || professor.status === 'pending') && (
                          <div className={styles.pending}>Pending</div>
                        )}
                        {professor.status === 'reject' && (
                          <div className={styles.rejected}>Rejected</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>
      </>
    );
  }else{

    return (
      <>
      <Header />
      <Sidebar 
        role={currRole} 
        loggedUser={loggedUser} 
      />
        {/* Professor Approval Section */}
        {currRole.toLowerCase() === 'professor' && (
          <div className={styles.panel} id="professorapproval">
            <div className={styles.panelHeading}>
              <h2>Your Approval Status</h2>
            </div>
            <div className={styles.panelBody}>
              <table className={`${styles.table} ${styles.tableBordered}`}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Degree</th>
                    <th>Experience</th>
                    <th>Institution</th>
                    <th>Department</th>
                    <th>Mobile</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approval.map((professor) => (
                    <tr key={professor.professorid}>
                      <td>{professor.professorname}</td>
                      <td>{professor.email}</td>
                      <td>{professor.degreecompleted}</td>
                      <td>{professor.experience} years</td>
                      <td>{professor.institutionname}</td>
                      <td>{professor.department}</td>
                      <td>{professor.mobile}</td>
                      <td>
                        {professor.status === 'accept' && (
                          <div className={styles.accepted}>Accepted</div>
                        )}
                        {(professor.status === null || professor.status === undefined || professor.status === 'pending') && (
                          <div className={styles.pending}>Pending</div>
                        )}
                        {professor.status === 'reject' && (
                          <div className={styles.rejected}>Rejected</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Admin Approval Section */}
        {currRole.toLowerCase() === 'admin' && (
          <div className={styles.panel} id="adminapproval">
            <div className={styles.panelHeading}>
              <h2>Approve Professor</h2>
            </div>
            <div className={styles.filterContainer}>
              <label htmlFor="statusFilter">Filter by Status: </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All</option>
                <option value="accept">Accepted</option>
                <option value="reject">Rejected</option>
                <option value="none">Not checked</option>
              </select>
            </div>
            <div className={styles.panelBody}>
              <table className={`${styles.table} ${styles.tableBordered}`}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Degree</th>
                    <th>Experience</th>
                    <th>Institution</th>
                    <th>Department</th>
                    <th>Mobile</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentItems2(professorList).map((professor) => (
                    <tr key={professor.professorid}>
                      <td>{professor.professorname}</td>
                      <td>{professor.email}</td>
                      <td>{professor.degreecompleted}</td>
                      <td>{professor.experience} years</td>
                      <td>{professor.institutionname}</td>
                      <td>{professor.department}</td>
                      <td>{professor.mobile}</td>
                      <td>
                        {currRole === 'admin' && professor.status === null && (
                          <>
                            <button
                              onClick={() => updateStatus(professor.email, 'accept')}
                              className={styles.accepted}
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => updateStatus(professor.email, 'reject')}
                              className={styles.rejected}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {currRole === 'admin' && professor.status === 'accept' && (
                          <div className={styles.accepted}>Accepted</div>
                        )}
                        {currRole === 'admin' && professor.status === 'reject' && (
                          <div className={styles.rejected}>Rejected</div>
                        )}
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
        )}
      </>
    );
  }
};

export default ApprovalStatus;