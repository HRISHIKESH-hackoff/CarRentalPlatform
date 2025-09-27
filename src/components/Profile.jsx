import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');

  const { user, logout, getCurrentUser } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError('');
        
        // If getCurrentUser method exists in AuthContext, use it
        // Otherwise, use the user data from context
        if (getCurrentUser) {
          const profileData = await getCurrentUser();
          setUserProfile(profileData);
        } else {
          setUserProfile(user);
        }
      } catch (err) {
        setError('Failed to load profile information');
        console.error('Profile loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, [user, getCurrentUser]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setError('Failed to logout. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user && !userProfile) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <h2>Access Denied</h2>
          <p>Please log in to view your profile.</p>
          <a href="/login" className="login-link">Go to Login</a>
        </div>
      </div>
    );
  }

  const displayData = userProfile || user;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>User Profile</h1>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        <div className="profile-info">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {displayData?.name ? displayData.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <label>Full Name:</label>
              <span>{displayData?.name || 'Not provided'}</span>
            </div>

            <div className="detail-item">
              <label>Email:</label>
              <span>{displayData?.email || 'Not provided'}</span>
            </div>

            <div className="detail-item">
              <label>Member Since:</label>
              <span>
                {displayData?.createdAt 
                  ? new Date(displayData.createdAt).toLocaleDateString()
                  : 'Unknown'
                }
              </span>
            </div>

            <div className="detail-item">
              <label>Account Status:</label>
              <span className="status-active">Active</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-profile-button">
            Edit Profile
          </button>
          
          <button 
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
