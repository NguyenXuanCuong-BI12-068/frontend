import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Avatar, Typography, Button, TextField } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './css/UserProfile.module.css';
import userservice from '../services/userService';
import avartar from '../assets/images/business-man.png';


const UserProfile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const loggedUser = sessionStorage.getItem('loggedUser') || '{}';

  useEffect(() => {
    getProfileDetails(loggedUser);
  }, []);

  const getProfileDetails = (loggedUser) => {
    userservice.getProfileDetails(loggedUser).then(data => {
      setUser(data[0]);
    });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const updateUserProfile = (event) => {
    event.preventDefault();
    userservice.updateUserProfile(loggedUser, user).then(() => {
      setIsEditing(false);
      getProfileDetails(loggedUser);
    }).catch((error) => {
      console.error('Error updating profile:', error);
    });
  };

  return (
    <>
      <Header />
      <Sidebar role="user" loggedUser={loggedUser} />
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.profileHeaderContent}>
            <Avatar className={styles.largeAvatar} src={avartar} />
            <Typography variant="h4">{user.username}</Typography>
            <Typography variant="subtitle1">{user.email}</Typography>
          </div>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6"><b>Profile Information</b></Typography>
                <Typography><b>Username:</b> {user.username}</Typography>
                <Typography><b>Email: </b>{user.email}</Typography>
                <Typography><b>Mobile:</b> {user.mobile}</Typography>
                <Typography><b>Address</b>: {user.address}</Typography>
                <Typography><b>Gender:</b> {user.gender}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6"><b>Edit Profile</b></Typography>
                {isEditing ? (
                  <form onSubmit={updateUserProfile}>
                    <TextField
                      fullWidth
                      label="Mobile"
                      value={user.mobile || ''}
                      onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="Address"
                      value={user.address || ''}
                      onChange={(e) => setUser({ ...user, address: e.target.value })}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="Gender"
                      value={user.gender || ''}
                      onChange={(e) => setUser({ ...user, gender: e.target.value })}
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
};

export default UserProfile;
