import React from 'react';
import '../css/Dashboard.css';

const Dashboard = ({ userDetails }) => {
  console.log('Rendering Dashboard with userDetails:', userDetails); // Add console log

  return (
    <div className="dashboard-container">
      <h2>Welcome, {userDetails ? userDetails.firstname : 'User'}!</h2>
      {userDetails && (
        <div className="user-details">
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>First Name:</strong> {userDetails.firstname}</p>
          <p><strong>Last Name:</strong> {userDetails.lastname}</p>
          <p><strong>Username:</strong> {userDetails.username}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
