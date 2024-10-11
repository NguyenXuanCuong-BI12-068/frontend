import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Avatar, Typography, Button, TextField } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './css/ProfessorProfile.module.css';
import professorservice from '../services/professorService';
import avartar from '../assets/images/business-man.png';
import LimitedSidebar from './LimitedSidebar';

const ProfessorProfile = () => {
  const [professor, setProfessor] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const loggedUser = sessionStorage.getItem('loggedUser') || '{}';
  const [professorStatus, setProfessorStatus] = useState('');
  

  useEffect(() => {
    getProfileDetails(loggedUser);
    
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

  const getProfileDetails = (loggedUser) => {
    professorservice.getProfileDetails(loggedUser).then(data => {
      setProfessor(data[0]);
    });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const updateProfessorProfile = (event) => {
    event.preventDefault();
    professorservice.updateProfessorProfile(loggedUser, professor).then(() => {
      setIsEditing(false);
      getProfileDetails(loggedUser);
    }).catch((error) => {
      console.error('Error updating profile:', error);
    });
  };
  if (professorStatus === null) {
    return (
      <>
        <Header />
        <div className={styles.dashboardContainer}>
          <LimitedSidebar />
          <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <div className={styles.profileHeaderContent}>
              <Avatar className={styles.largeAvatar} src={avartar} />
              <Typography variant="h4">{professor.professorname}</Typography>
              <Typography variant="subtitle1">{professor.email}</Typography>
            </div>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6"><b>Profile Information</b></Typography>
                  <Typography><b>Professor Name:</b> {professor.professorname}</Typography>
                  <Typography><b>Email:</b> {professor.email}</Typography>
                  <Typography><b>Mobile:</b> {professor.mobile}</Typography>
                  <Typography><b>Institution Name:</b> {professor.institutionname}</Typography>
                  <Typography><b>Department:</b> {professor.department}</Typography>
                  <Typography><b>Experience:</b> {professor.experience} years</Typography>
                  <Typography><b>Degree Completed:</b> {professor.degreecompleted}</Typography>
                  <Typography><b>Gender:</b> {professor.gender}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6"><b>Edit Profile</b></Typography>
                  {isEditing ? (
                    <form onSubmit={updateProfessorProfile}>
                      <TextField
                        fullWidth
                        label="Mobile"
                        value={professor.mobile || ''}
                        onChange={(e) => setProfessor({ ...professor, mobile: e.target.value })}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Institution Name"
                        value={professor.institutionname || ''}
                        onChange={(e) => setProfessor({ ...professor, institutionname: e.target.value })}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Department"
                        value={professor.department || ''}
                        onChange={(e) => setProfessor({ ...professor, department: e.target.value })}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Experience"
                        value={professor.experience || ''}
                        onChange={(e) => setProfessor({ ...professor, experience: e.target.value })}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Degree Completed"
                        value={professor.degreecompleted || ''}
                        onChange={(e) => setProfessor({ ...professor, degreecompleted: e.target.value })}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Gender"
                        value={professor.gender || ''}
                        onChange={(e) => setProfessor({ ...professor, gender: e.target.value })}
                        margin="normal"
                      />
                      <Button type="submit" color="primary" variant="contained">
                        Save Changes
                      </Button>
                      <Button onClick={handleCancelEdit} color="secondary" variant="contained">
                        Cancel
                      </Button>
                    </form>
                  ) : (
                    <Button onClick={handleEditProfile} color="primary" variant="contained">
                      Edit Profile
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
        </div>
      </>
    );
  }else{

    return (
      <>
        <Header />
        <Sidebar role="professor" loggedUser={loggedUser} />
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <div className={styles.profileHeaderContent}>
              <Avatar className={styles.largeAvatar} src={avartar} />
              <Typography variant="h4">{professor.professorname}</Typography>
              <Typography variant="subtitle1">{professor.email}</Typography>
            </div>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6"><b>Profile Information</b></Typography>
                  <Typography><b>Professor Name:</b> {professor.professorname}</Typography>
                  <Typography><b>Email:</b> {professor.email}</Typography>
                  <Typography><b>Mobile:</b> {professor.mobile}</Typography>
                  <Typography><b>Institution Name:</b> {professor.institutionname}</Typography>
                  <Typography><b>Department:</b> {professor.department}</Typography>
                  <Typography><b>Experience:</b> {professor.experience} years</Typography>
                  <Typography><b>Degree Completed:</b> {professor.degreecompleted}</Typography>
                  <Typography><b>Gender:</b> {professor.gender}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6"><b>Edit Profile</b></Typography>
                  {isEditing ? (
                    <form onSubmit={updateProfessorProfile}>
                      <TextField
                        fullWidth
                        label="Mobile"
                        value={professor.mobile || ''}
                        onChange={(e) => setProfessor({ ...professor, mobile: e.target.value })}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Institution Name"
                        value={professor.institutionname || ''}
                        onChange={(e) => setProfessor({ ...professor, institutionname: e.target.value })}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Department"
                        value={professor.department || ''}
                        onChange={(e) => setProfessor({ ...professor, department: e.target.value })}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Experience"
                        value={professor.experience || ''}
                        onChange={(e) => setProfessor({ ...professor, experience: e.target.value })}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Degree Completed"
                        value={professor.degreecompleted || ''}
                        onChange={(e) => setProfessor({ ...professor, degreecompleted: e.target.value })}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Gender"
                        value={professor.gender || ''}
                        onChange={(e) => setProfessor({ ...professor, gender: e.target.value })}
                        margin="normal"
                      />
                      <Button type="submit" color="primary" variant="contained">
                        Save Changes
                      </Button>
                      <Button onClick={handleCancelEdit} color="secondary" variant="contained">
                        Cancel
                      </Button>
                    </form>
                  ) : (
                    <Button onClick={handleEditProfile} color="primary" variant="contained">
                      Edit Profile
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
};

export default ProfessorProfile;
