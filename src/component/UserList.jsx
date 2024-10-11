import React, { useEffect, useState } from 'react';
import styles from './css/UserList.module.css';
import userservice from '../services/userService';
import Header from './Header';
import Sidebar from './Sidebar';
import Pagination from './Pagination';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const user = sessionStorage.getItem('loggedUser') || '{}';

  useEffect(() => {
    userservice.getUserList().then((data) => {
      setUsers(data);
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
        role='admin'
        loggedUser={user}
      />
      <div className={styles.panel} id="userList">
        <div className={styles.panelHeading}>
          <h2>User List</h2>
        </div>
        <div className={styles.panelBody}>
          <table className={`${styles.table} ${styles.tableBordered}`}>
            <thead>
              <tr>
                <th>Name</th>
                <th>User ID</th>
                <th>Email</th>
                <th>Profession</th>
                <th>Gender</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentItems(users).map((user) => (
                <tr key={user.userid}>
                  <td>{user.username}</td>
                  <td>{user.userid}</td>
                  <td>{user.email}</td>
                  <td>{user.profession}</td>
                  <td>{user.gender}</td>
                  <td>{user.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            items={users}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default UserList;
